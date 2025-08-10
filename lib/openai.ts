import OpenAI from "openai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompt";

// Create a new OpenAI client using the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSummaryFromOpenAI(pdfText: string) {
  try {
    // Call the OpenAI Chat Completions API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Or "gpt-4o" for faster & cheaper responses
      messages: [
        {
          role: "system",
          content: SUMMARY_SYSTEM_PROMPT // Define your system prompt for summarization
        },
        {
          role: "user",
          content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting. Here is the document text:\n\n${pdfText}`
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    // Return the generated summary text
    return completion.choices[0].message.content;
  } catch (error: any) {
    // Handle rate limit errors
    if (error?.status === 429) {
      throw new Error("RATE_LIMIT_EXCEEDED");
    }
    throw error;
  }
}
