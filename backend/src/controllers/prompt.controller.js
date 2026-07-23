const promptModel = require("../models/prompt.model");


async function createPrompt(req, res) {
  const { title, content, category, tags } = req.body;

   if(!title || !content ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }


  const prompt = await promptModel.create({
    title,
    content,
    category,
    tags,
    user: req.user.id,
  });

 
  res.status(201).json({
    message: "Prompt created successfully",
    prompt,
  });
}

async function getAllPrompts(req, res) {
  const {title , category, tags} = req.query;

  let filter = {};

  if(title) {
    filter.title = { $regex:title, $options: "i" };
  }

  if(category) {
    filter.category = {$regex:category, $options: "i" };
  }

  if(tags) {
    filter.tags = {$regex:tags, $options: "i" };
  }

  const prompts = await promptModel.find(filter).sort({ createdAt: -1 });

  res.status(200).json({
    message: "Prompts fetched successfully",
    prompts,
  });
}

async function getPromptById(req, res) {
  const { id } = req.params;
  const userId = req.user.id;
  const prompt = await promptModel.findOne({
    _id: id,
    user: userId,
  });

  if (!prompt) {
    return res.status(404).json({
      message: "Prompt not found",
    });
  }

  res.status(200).json({
    message: "Prompt of user fetched successfully",
    prompt,
  });
}

async function updatePrompt(req, res) {
  const { id } = req.params;
  const userId = req.user.id;
  const { title, content, category, tags } = req.body;

  const prompt = await promptModel.findOneAndUpdate(
    {
      _id: id,
      user: userId,
    },
    { title, content, category, tags },
    { new: true },
  );

  if (!prompt) {
    return res.status(404).json({
      message: "Prompt not found or you are not authorized to update it",
    });
  }
  res.status(200).json({
    message: "Prompt updated successfully",
    prompt,
  });
}

async function deletePrompt(req, res) {
  const { id } = req.params;
  const userId = req.user.id;//for security purpose, we are checking if the user is the owner of the prompt before deleting it

  const prompt = await promptModel.findOneAndDelete({
    _id: id,
    user: userId,
  });

  if (!prompt) {
    return res.status(404).json({
      message: "Prompt not found or you are not authorized to delete it",
    });
  }

  res.status(200).json({
    message: "Prompt deleted successfully",
  });
}

async function getMyPrompts(req, res) {
  const userId = req.user.id;
  const prompts = await promptModel
    .find({ user: userId })
    .sort({ createdAt: -1 });

  res.status(200).json({
    message: "Your prompts fetched successfully",
    prompts,
  });
}

module.exports = {
  createPrompt,
  getAllPrompts,
  getPromptById,
  updatePrompt,
  deletePrompt,
  getMyPrompts,
};
