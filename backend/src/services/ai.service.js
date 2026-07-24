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

async function generatePrompt(userInput) {
    try {
        const response = await ai.interactions.create({
            model: "gemini-2.5-flash",
            input: `Generate a creative prompt based on the following user input: "\n${userInput}". Please provide a unique and engaging prompt that can inspire users to create content.`,
            generation_config:{
                thinking_level: "high",
                temperature: 0.7,
            },
            system_instruction: "Your name is PromptVault. You are a helpful assistant that generates creative prompts based on user input.",
        });
        return response.output_text;
    }
    catch (error) {
        console.error("Error generating prompt:", error);
        throw new Error("Failed to generate prompt");
    }
}

async function generateTags(promptContent) {
    try {
        const response = await ai.interactions.create({
            model: "gemini-2.5-flash",
            input: `Generate relevant tags for the following prompt content: "${promptContent}". Please provide a list of tags that are concise, descriptive, and relevant to the content.`,
            generation_config:{
                thinking_level: "high",
                temperature: 0.7,
            },
            system_instruction: "Your name is PromptVault. You are a helpful assistant that generates relevant tags for prompt content.",
        });
        return response.output_text.split(",").map(tag => tag.trim());
    }catch (error) {
        console.error("Error generating tags:", error);
        throw new Error("Failed to generate tags");
    }
}

async function improveContent(promptContent) {
    try {
        const response = await ai.interactions.create({
            model: "gemini-2.5-flash",
            input: `Improve the following prompt content: "${promptContent}". Please enhance the clarity, creativity, and engagement of the content while maintaining its original intent.`,
            generation_config:{
                thinking_level: "high",
                temperature: 0.7,
            },
            system_instruction: "Your name is PromptVault. You are a helpful assistant that generates creative prompts based on content.",
        });
        return response.output_text;
    }
    catch (error) {
        console.error("Error improving content:", error);
        throw new Error("Failed to improve content");
    }
}

export  {
    generatePrompt,
    generateTags,
    improveContent
};

