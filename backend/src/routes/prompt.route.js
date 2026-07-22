const express = require("express");
const route = express.Router();

const {
  createPrompt,
  getAllPrompts,
  getPromptById,
  updatePrompt,
  deletePrompt,
  getMyPrompts,
} = require("../controllers/prompt.controller");

const authMiddleware = require("../middlewares/authMiddleware");

route.post("/", authMiddleware, createPrompt);
route.get("/", getAllPrompts);
route.get("/:id", authMiddleware, getPromptById);
route.patch("/:id", authMiddleware, updatePrompt);
route.delete("/:id", authMiddleware, deletePrompt);
route.get("/me", authMiddleware, getMyPrompts);


module.exports = route;