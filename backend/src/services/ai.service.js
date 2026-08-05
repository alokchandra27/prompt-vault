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
  const allowedCategories = ["Fitness", "Motivation", "Marketing", "Coding", "Design", "Writing", "Instagram", "Other"];
  try {
    const response = await ai.interactions.create({
      model: "gemini-2.5-flash",
      input: `Based on the following user input: "${userInput}", generate details.
Choose the category STRICTLY from this list only: ${allowedCategories.join(', ')}.

Return ONLY a valid JSON object with EXACTLY these keys:
{
  "title": "Generated title here",
  "content": "Generated content here",
  "tags": ["#tag1", "#tag2"],
  "category": "Choose one from the allowed list"
}
IMPORTANT: Every tag in the "tags" array MUST start with a '#' symbol (e.g., ["#coding", "#ai"]). Do not use bullets or asterisks.
Do not include any extra text or markdown code blocks if possible. Generate only 5 tags. If fewer than 5 relevant tags are possible, return only the relevant ones.`,
    });

    const text = response.output_text;

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    // 🔥 Safety check: ensure tags are formatted with '#'
    if (Array.isArray(parsed.tags)) {
      parsed.tags = parsed.tags.map(tag => {
        const clean = tag.replace(/^[*-\s]+/, "").trim();
        return clean.startsWith("#") ? clean : `#${clean}`;
      });
    }

    console.log("Parsed AI Output:", parsed);
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
      input: `Generate relevant tags for the following prompt content: "${promptContent}". Return them comma-separated, starting each with a hashtag like #tag1, #tag2.`,
      generation_config: {
        thinking_level: "high",
        temperature: 0.7,
      },
      system_instruction: "Your name is PromptVault. You are a helpful assistant that generates relevant tags starting with '#' for prompt content.genreate only 5 tags. Do not include any extra text or markdown code blocks.",
    });

    return response.output_text
      .split(",")
      .map((tag) => tag.replace(/^[*-\s]+/, "").trim())
      .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`));
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
  "tags": ["#...", "#..."]
}

IMPORTANT: Every tag in the "tags" array MUST start with a '#' symbol.

Prompt:
"${promptContent}"`,
      generation_config: {
        thinking_level: "high",
        temperature: 0.7,
      },
      system_instruction: "Keep the content concise, clear, crispy, punching and engaging. Suggest a title that captures the essence of the prompt. Generate tags starting with '#' that are relevant and descriptive. generate only 5 tags. Do not include any extra text or markdown code blocks.",
    });

    const text = response.output_text;

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    // 🔥 Safety check for improved tags
    if (Array.isArray(parsed.tags)) {
      parsed.tags = parsed.tags.map(tag => {
        const clean = tag.replace(/^[*-\s]+/, "").trim();
        return clean.startsWith("#") ? clean : `#${clean}`;
      });
    }

    return parsed;
  } catch (error) {
    console.error("Error improving content:", error);
    throw new Error("Failed to improve content");
  }
}

export { generateFullPrompt, generateTags, improveContent };