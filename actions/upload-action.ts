'use server';

import { fetchAndExtractPdfText } from "@/lib/langchain";

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
        
        // You probably want to return the extracted text or process it further
        return {
            success: true,
            message: 'PDF processed successfully',
            data: {
                text: pdfText,
                fileName,
                userId
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