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

export async function genertePdfText({
    fileUrl,
    fileName,
}:{
    fileUrl: string,
    fileName: string,
}) {
    if (!fileUrl) {
        return {
            success: false,
            message: 'File upload failed',
            data: null,
        }
    }
}

export async function generatePdfSummary(uploadResponse: {
    serverData: {
        userId: string;
        file: {
            url: string;
            name: string;
        }
    }
}[]) {
    if (!uploadResponse || uploadResponse.length === 0) {
        return {
            success: false,
            message: 'File upload failed',
            data: null,
        }
    }

    const {
        serverData: {
            userId,
            file: { url: pdfUrl, name: fileName },
        },
    } = uploadResponse[0];

    if (!pdfUrl) {
        return {
            success: false,
            message: 'File URL is missing',
            data: null,
        }
    }

    try {
        const pdfText = await fetchAndExtractPdfText(pdfUrl);
        console.log("Extracted PDF Text:", pdfText);

        let summary;
        try {
            summary = await generateSummaryFromGemini(pdfText);
            console.log({ summary });
        } catch (error) {
            console.log("Error generating summary:", error);

            // Fallback to OpenAI if Gemini fails
            try {
                summary = await generateSummaryFromOpenAI(pdfText);
            } catch (openaiError) {
                console.error("Both AI providers failed", openaiError);
                throw new Error('Failed to generate summary with available AI providers');
            }
        }

        if (!summary) {
            return {
                success: false,
                message: 'Failed to generate summary',
                data: null,
            }
        }

        const formattedFileName = formatFileNameAsTitle(fileName);

        return {
            success: true,
            message: 'Summary generated successfully',
            data: {
                title: formattedFileName,
                summary,
            }
        }

    } catch (error) {
        console.error("Error processing PDF:", error);
        return {
            success: false,
            message: 'Error processing PDF',
            data: null,
        }
    }
}

export async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  // SQL inserting PDF summary
  try {
    const sql = await getDbConnection();
    const [savedSummary]= await sql`INSERT INTO pdf_summaries (
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
}: PdfSummaryType) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return {
                success: false,
                message: 'User not found',
            };
        }

        const savedSummary = await savePdfSummary({
            userId,
            fileUrl,
            summary,
            title,
            fileName,
        });

        if (!savedSummary) {
            return {
                success: false,
                message: 'Failed to save PDF summary, please try again',
            };
        }

        // Revalidate our cache
        revalidatePath(`/summaries/${savedSummary.id}`);

        return {
            success: true,
            message: 'PDF summary saved successfully',
            data: {
                id: savedSummary.id,
            }
        };

    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Error saving PDF summary',
        };
    }
}