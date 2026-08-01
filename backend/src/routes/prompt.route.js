const express = require("express");
const route = express.Router();

const {
  createPrompt,
  getAllPrompts,
  getPromptById,
  updatePrompt,
  deletePrompt,
  getMyPrompts,
  getPublicPromptByIdForShare,
} = require("../controllers/prompt.controller");

const authMiddleware = require("../middlewares/authMiddleware");

route.post("/", authMiddleware, createPrompt);
route.get("/", getAllPrompts);
route.get("/me", authMiddleware, getMyPrompts);

// ⚠️ IMPORTANT: Public route ko hamesha /:id ke upar rakhein
route.get("/public/:id", getPublicPromptByIdForShare);

route.get("/:id", authMiddleware, getPromptById);
route.patch("/:id", authMiddleware, updatePrompt);
route.delete("/:id", authMiddleware, deletePrompt);

module.exports = route;