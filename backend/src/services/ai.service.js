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
  const allowedCategories = ["Fitness","Motivation", "Marketing", "Coding", "Design", "Writing","Instagram", "Other"];
  try {
    const response = await ai.interactions.create({
      model: "gemini-2.5-flash",
      input: `Based on the following user input: "${userInput}", generate details.
Choose the category STRICTLY from this list only: ${allowedCategories.join(', ')}.

Return ONLY a valid JSON object with EXACTLY these keys:
{
  "title": "Generated title here",
  "content": "Generated content here",
  "tags": ["tag1", "tag2"],
  "category": "Choose one from the allowed list"
}
Do not include any extra text or markdown code blocks if possible.`,
    });

    const text = response.output_text;

    // Markdown ticks clean karne ka secure tarika
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);
    
    // Debugging ke liye check kar sakte hain
    console.log("Parsed AI Output:", parsed);

    return parsed; // Isme ab { title, content, tags, category } exact match honge
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
      input: `Improve the following prompt and also suggest a better title and tags.

Return ONLY a valid JSON object with EXACTLY these keys and no extra text:
{
  "title": "...",
  "content": "...",
  "tags": ["...", "..."]
}

Prompt:
"${promptContent}"`,
      generation_config: {
        thinking_level: "high",
        temperature: 0.7,
      },
      system_instruction:"Keep the content concise, clear,crispy , punching and engaging. Suggest a title that captures the essence of the prompt. Generate tags that are relevant and descriptive.",
    });

    const text = response.output_text;

    // ✅ Markdown ticks ko clean karein (jaise generateFullPrompt mein kiya tha)
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Error improving content:", error);
    throw new Error("Failed to improve content");
  }
}
export { generateFullPrompt, generateTags, improveContent };
