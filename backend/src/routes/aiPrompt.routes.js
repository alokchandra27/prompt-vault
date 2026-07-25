const express = require("express");
const { generatePromptController, improvePromptController } = require("../controllers/aiPrompt.controller.js");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/generate", authMiddleware, generatePromptController);
router.post("/improve", authMiddleware, improvePromptController);

module.exports = router;