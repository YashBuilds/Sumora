'use server';

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { generateSummaryFromGemini } from "@/lib/geminiai";

export async function generatedPdfSummary(uploadResponse: {
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

        return {
            success: true,
            message: 'Summary generated successfully',
            data: {
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