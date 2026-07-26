const express = require('express');
const router = express.Router();
const { exportPrivatePromptAsJSON, exportPublicPromptAsJSON,exportPrivatePromptAsMarkdown,exportPublicPromptAsMarkdown, exportPrivatePromptAsPDF, exportPublicPromptAsPDF } = require('../controllers/exportPrompts.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/private/:id/json', authMiddleware, exportPrivatePromptAsJSON);
router.get('/public/:id/json', exportPublicPromptAsJSON);
router.get('/private/:id/markdown', authMiddleware, exportPrivatePromptAsMarkdown);
router.get('/public/:id/markdown', exportPublicPromptAsMarkdown);
router.get('/private/:id/pdf', authMiddleware, exportPrivatePromptAsPDF);
router.get('/public/:id/pdf', exportPublicPromptAsPDF);

module.exports = router;