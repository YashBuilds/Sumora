'use server';

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";

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
            summary = await generateSummaryFromOpenAI(pdfText);
            console.log({ summary });
        } catch (error) {
           console.log("Error generating summary:", error); 

           //call gemini code in case of an error
        }

        if (!summary) {
            return {
                success: false,
                message: 'Failed to generate summary',
                data: null,
            }
        }

        return{
            success: true,
            message: 'Summary generated successfully',
            data: {
                summary,
           }
        }
        
        // You probably want to return the extracted text or process it further
        // return {
        //     success: true,
        //     message: 'PDF processed successfully',
        //     data: {
        //         text: pdfText,
        //         fileName,
        //         userId
        //     }
        // }
        
    } catch (error) {
        console.error("Error processing PDF:", error);
        return {
            success: false,
            message: 'Error processing PDF',
            data: null,
        }
    }
}