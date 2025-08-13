'use server';

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { auth } from '@clerk/nextjs/server';
import { getDbConnection } from "@/lib/db";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { revalidatePath } from "next/cache";

interface PdfSummaryType {
    userId?: string;
    fileUrl: string;
    summary: string;
    title: string;
    fileName: string;
}

// Fixed typo: genertePdfText -> generatePdfText
export async function generatePdfText({
    fileUrl,
    fileName,
}: {
    fileUrl: string;
    fileName: string;
}) {
    if (!fileUrl) {
        return {
            success: false,
            message: 'File upload failed',
            data: null,
        };
    }

    try {
        const pdfText = await fetchAndExtractPdfText(fileUrl);
        
        if (!pdfText) {
            return {
                success: false,
                message: 'Failed to extract text from PDF',
                data: null,
            };
        }

        return {
            success: true,
            message: 'PDF text extracted successfully',
            data: {
                text: pdfText,
                fileName,
            }
        };

    } catch (error) {
        console.error("Error extracting PDF text:", error);
        return {
            success: false,
            message: 'Error extracting PDF text',
            data: null,
        };
    }
}

export async function generatePdfSummary({
    fileUrl,
    fileName
}: {
    fileUrl: string;
    fileName: string;
}) {
    // Simplified validation - only check once
    if (!fileUrl || fileUrl.trim().length === 0) {
        return {
            success: false,
            message: 'File URL is missing or invalid',
            data: null,
        };
    }

    if (!fileName || fileName.trim().length === 0) {
        return {
            success: false,
            message: 'File name is missing',
            data: null,
        };
    }

    try {
        const pdfText = await fetchAndExtractPdfText(fileUrl);
        
        if (!pdfText || pdfText.trim().length === 0) {
            return {
                success: false,
                message: 'Could not extract text from PDF',
                data: null,
            };
        }

        console.log("Extracted PDF Text:", pdfText);

        let summary: string | null = null;
        
        try {
            summary = await generateSummaryFromGemini(pdfText);
            console.log({ summary });
        } catch (geminiError) {
            console.log("Error generating summary with Gemini:", geminiError);

            // Fallback to OpenAI if Gemini fails
            try {
                summary = await generateSummaryFromOpenAI(pdfText);
                console.log("Fallback to OpenAI successful");
            } catch (openaiError) {
                console.error("Both AI providers failed", { geminiError, openaiError });
                return {
                    success: false,
                    message: 'Failed to generate summary with available AI providers',
                    data: null,
                };
            }
        }

        if (!summary || summary.trim().length === 0) {
            return {
                success: false,
                message: 'Generated summary is empty',
                data: null,
            };
        }

        const formattedFileName = formatFileNameAsTitle(fileName);

        return {
            success: true,
            message: 'Summary generated successfully',
            data: {
                title: formattedFileName,
                summary,
            }
        };

    } catch (error) {
        console.error("Error processing PDF:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Error processing PDF',
            data: null,
        };
    }
}

export async function savePdfSummary({
    userId,
    fileUrl,
    summary,
    title,
    fileName,
}: PdfSummaryType) {
    if (!userId) {
        throw new Error('User ID is required');
    }
    
    if (!fileUrl || !summary || !title || !fileName) {
        throw new Error('Missing required fields');
    }

    try {
        const sql = await getDbConnection();
        const [savedSummary] = await sql`INSERT INTO pdf_summaries (
            user_id,
            original_file_url,
            summary_text,
            title,
            file_name
        ) VALUES (
            ${userId},
            ${fileUrl},
            ${summary},
            ${title},
            ${fileName}
        ) RETURNING id, summary_text`;
        
        if (!savedSummary) {
            throw new Error('Failed to save PDF summary to database');
        }
        
        return savedSummary;
    } catch (error) {
        console.error("Error saving PDF summary:", error);
        throw error;
    }
}

export async function storePdfSummaryAction({
    fileUrl,
    summary,
    title,
    fileName,
}: Omit<PdfSummaryType, 'userId'>) {
    try {
        const { userId } = await auth();
        
        if (!userId) {
            return {
                success: false,
                message: 'User not authenticated',
                data: null,
            };
        }

        // Validate required fields
        if (!fileUrl || !summary || !title || !fileName) {
            return {
                success: false,
                message: 'Missing required fields',
                data: null,
            };
        }

        const savedSummary = await savePdfSummary({
            userId,
            fileUrl,
            summary,
            title,
            fileName,
        });

        if (!savedSummary || !savedSummary.id) {
            return {
                success: false,
                message: 'Failed to save PDF summary, please try again',
                data: null,
            };
        }

        // Revalidate our cache
        revalidatePath(`/summaries/${savedSummary.id}`);
        revalidatePath('/summaries'); // Also revalidate the list page

        return {
            success: true,
            message: 'PDF summary saved successfully',
            data: {
                id: savedSummary.id,
            }
        };

    } catch (error) {
        console.error("Error in storePdfSummaryAction:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Error saving PDF summary',
            data: null,
        };
    }
}