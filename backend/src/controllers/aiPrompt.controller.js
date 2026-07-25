import { generateFullPrompt, improveContent } from "../services/ai.service.js";
import promptModel from "../models/prompt.model.js";

// 🔵 GENERATE + SAVE
export async function generatePromptController(req, res) {
    try {
        const { userInput } = req.body;

        if (!userInput) {
            return res.status(400).json({ error: "User input required" });
        }

        const aiData = await generateFullPrompt(userInput);

        const newPrompt = await promptModel.create({
            title: aiData.title,
            content: aiData.content,
            category: aiData.category,
            tags: aiData.tags,
            user: req.user.id
        });

        return res.status(201).json({
            message: "Prompt generated successfully",
            prompt: newPrompt
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "AI generation failed" });
    }
}


// 🟣 IMPROVE (NO SAVE)
export async function improvePromptController(req, res) {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ error: "Content required" });
        }

        const improved = await improveContent(content);

        return res.status(200).json({
            original: content,
            improved
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Improve failed" });
    }
}