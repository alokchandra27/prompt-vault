const promptModel = require("../models/prompt.model");
const { generateTags } = require("../services/ai.service");

async function createPrompt(req, res) {
  const { title, content, category, isPublic } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const tags = await generateTags(content); // Generate tags based on the content

  const prompt = await promptModel.create({
    title,
    content,
    category,
    tags,
    isPublic: isPublic || false, //agar user ne isPublic nahi diya to default false hoga
    user: req.user.id,
  });

  res.status(201).json({
    message: "Prompt created successfully",
    prompt,
  });
}

async function getAllPrompts(req, res) {
  const { title, category, tags } = req.query;

  let filter = { isPublic: true }; // Only fetch public prompts

  if (title) filter.title = { $regex: title, $options: "i" };
  if (category) filter.category = { $regex: category, $options: "i" };
  if (tags) filter.tags = { $regex: tags, $options: "i" };

  const prompts = await promptModel
    .find(filter)
    .populate("user", "name username") // Populate user details (name and username)
    .sort({ createdAt: -1 });
  res.status(200).json({
    message: "Community prompts fetched successfully",
    prompts,
  });
}

async function getPromptById(req, res) {
  const { id } = req.params;
  const userId = req.user.id; 

  // Ya toh prompt public ho, ya fir current user hi uska owner ho
  const prompt = await promptModel.findOne({
    _id: id,
    $or: [{ isPublic: true }, { user: userId }]
  }).populate("user", "name username");

  if (!prompt) return res.status(404).json({ 
    message: "Prompt not found" });

  res.status(200).json({ 
    message: "Prompt fetched successfully",
   prompt });
}

async function updatePrompt(req, res) {
  const { id } = req.params;
  const userId = req.user.id;
  const { title, content, category, tags, isPublic } = req.body;

  const prompt = await promptModel.findOneAndUpdate(
    { _id: id, user: userId },
    { title, content, category, tags, isPublic },
    { new: true },
  );

  if (!prompt)
    return res.status(404).json({
      message: "Prompt not found or you are not authorized to update it",
    });

  res.status(200).json({ message: "Prompt updated successfully", prompt });
}

async function deletePrompt(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  const prompt = await promptModel.findOneAndDelete({ _id: id, user: userId });

  if (!prompt)
    return res.status(404).json({
      message: "Prompt not found or you are not authorized to delete it",
    });

  res.status(200).json({ message: "Prompt deleted successfully" });
}

async function getMyPrompts(req, res) {
  const userId = req.user.id;
  const prompts = await promptModel
    .find({ user: userId })
    .sort({ createdAt: -1 });
  res
    .status(200)
    .json({ message: "Your prompts fetched successfully", prompts });
}

async function getPublicPromptByIdForShare(req, res) {
  const {id} = req.params;

  const prompt = await promptModel.findOne({
    _id: id,
    isPublic: true,
  }).populate("user", "name username");

  if (!prompt) return res.status(404).json({ 
    message: "Prompt not found or is not public" });

  res.status(200).json({
    message: "Public prompt fetched successfully",
    prompt
  });
}

module.exports = {
  createPrompt,
  getAllPrompts,
  getPromptById,
  updatePrompt,
  deletePrompt,
  getMyPrompts,
  getPublicPromptByIdForShare
};
