import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompt";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export const generateSummaryFromGemini = async (pdfText: string) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // Changed from Pro to Flash for higher rate limits
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

    // Combine system prompt and user content
    const prompt = `${SUMMARY_SYSTEM_PROMPT}

Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:

${pdfText}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    if (!response.text()) {
      throw new Error("Empty response text from Gemini API");
    }

    return response.text();
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};