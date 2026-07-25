import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// async function run() {
//   try {
//     const interaction = await ai.interactions.create({
//       model: "gemini-3.6-flash",
//       input: "Explain how AI works in a few words",
//     });
//     console.log(interaction.output_text);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }
// run();

async function generateFullPrompt(userInput) {
    try {
        const response = await ai.interactions.create({
            model: "gemini-2.5-flash",
            input: `Based on the following user input: "${userInput}", generate:
1. Title
2. Content
3. Tags (array)
4. Category

Return ONLY JSON.`,
        });

        const text = response.output_text;

        // ✅ FIX
        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const parsed = JSON.parse(cleaned);

        return parsed;

    } catch (error) {
        console.error("Error generating full prompt:", error);
        throw new Error("Failed to generate full prompt");
    }
}
async function generateTags(promptContent) {
  try {
    const response = await ai.interactions.create({
      model: "gemini-2.5-flash",
      input: `Generate relevant tags for the following prompt content: "${promptContent}". Please provide a list of tags that are concise, descriptive, and relevant to the content.`,
      generation_config: {
        thinking_level: "high",
        temperature: 0.7,
      },
      system_instruction:
        "Your name is PromptVault. You are a helpful assistant that generates relevant tags for prompt content.",
    });
    return response.output_text.split(",").map((tag) => tag.trim());
  } catch (error) {
    console.error("Error generating tags:", error);
    throw new Error("Failed to generate tags");
  }
}
async function improveContent(promptContent) {
  try {
    const response = await ai.interactions.create({
      model: "gemini-2.5-flash",
      input: `Improve the following prompt and also suggest better title and tags.

Return JSON:
{
  "title": "...",
  "content": "...",
  "tags": ["..."]
}

Prompt:
"${promptContent}"`,
    });

    return JSON.parse(response.output_text);
  } catch (error) {
    console.error("Error improving content:", error);
    throw new Error("Failed to improve content");
  }
}
export { generateFullPrompt, generateTags, improveContent };
