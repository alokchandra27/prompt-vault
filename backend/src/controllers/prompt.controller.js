const promptModel = require("../models/prompt.model");

// async function getMyPrompts(req, res) {
// 	const prompts = await promptModel.find({ user: req.user.id }).sort({
// 		createdAt: -1,
// 	});

// 	res.status(200).json({
// 		message: "Your prompts fetched successfully",
// 		prompts,
// 	});
// }

// module.exports = {
// 	createPrompt,
// 	getAllPrompts,
// 	getPromptById,
// 	updatePrompt,
// 	deletePrompt,
// 	getMyPrompts,
// };

async function createPrompt(req, res) {
  const { title, content, category, tags } = req.body;

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
  const prompts = await promptModel.find().sort({ createdAt: -1 }); //means the latest prompt will be shown first
  res.status(200).json({
    message: "Prompts fetched successfully",
    prompts,
  });
}

async function getPromptById(req, res) {
  const userId = req.user.id;

  const prompt = await promptModel.findById(userId);

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
  const userId = req.user.id;
  const { title, content, category, tags } = req.body;

  const prompt = await promptModel.findOneAndUpdate(
    {
      user: userId,
    },
    { title: title, content: content, category: category, tags: tags },
    { new: true },
  );

  if (!prompt) {
    return res.status(404).json({
      message: "Prompt not found or you are not authorized to update it",
    });

    res.status(200).json({
      message: "Prompt updated successfully",
      prompt,
    });
  }
}

async function deletePrompt(req, res) {
  const userId = req.user.id;

  const prompt = await promptModel.findOneAndDelete({
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
}

module.exports = {
  createPrompt,
  getAllPrompts,
  getPromptById,
  updatePrompt,
  deletePrompt,
  getMyPrompts,
};
