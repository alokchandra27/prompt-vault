const promptModel = require("../models/prompt.model");
const { generateFullPrompt, improveContent } = require("../services/ai.service");

// 🔵 GENERATE + SAVE
async function generatePromptController(req, res) {
    try {
        const { userInput, isPublic } = req.body;

        if (!userInput) {
            return res.status(400).json({ error: "User input required" });
        }

        const aiData = await generateFullPrompt(userInput);

        // 🔥 TAGS FORMAT FIX (#coding #ai ...)
        let formattedTags = [];
        if (Array.isArray(aiData.tags)) {
            formattedTags = aiData.tags.map(tag =>
                tag.startsWith("#") ? tag : `#${tag}`
            );
        } else if (typeof aiData.tags === "string") {
            formattedTags = aiData.tags
                .split(",")
                .map(tag => tag.trim())
                .map(tag => tag.startsWith("#") ? tag : `#${tag}`);
        }

        const newPrompt = await promptModel.create({
            title: aiData.title,
            content: aiData.content,
            category: aiData.category,
            tags: formattedTags, // ✅ updated
            isPublic: isPublic || false,
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
async function improvePromptController(req, res) {
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

module.exports = {
    generatePromptController,
    improvePromptController
};