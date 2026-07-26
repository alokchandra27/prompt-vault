const promptModel = require("../models/prompt.model");
const PDFDocument = require("pdfkit");

async function exportPrivatePromptAsJSON(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  const prompt = await promptModel.findOne({
    _id: id,
    user: userId,
  });

  if (!prompt) {
    return res.status(404).json({
      message: "Prompt not found or you are not authorized to export it",
    });
  }

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${prompt.title}.json"`,
  );
  res.setHeader("Content-Type", "application/json");

  res.status(200).json({
    message: "Prompt exported successfully",
    title: prompt.title,
    content: prompt.content,
    category: prompt.category,
    tags: prompt.tags,
    createdAt: prompt.createdAt,
    updatedAt: prompt.updatedAt,
  });
}

async function exportPublicPromptAsJSON(req, res) {
  const { id } = req.params;

  const prompt = await promptModel.findOne({
    _id: id,
    isPublic: true,
  });

  if (!prompt) {
    return res.status(404).json({
      message: "Prompt not found or it is not public",
    });
  }

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${prompt.title}.json"`,
  );
  res.setHeader("Content-Type", "application/json");

  res.status(200).json({
    message: "Prompt exported successfully",
    title: prompt.title,
    content: prompt.content,
    category: prompt.category,
    tags: prompt.tags,
    createdAt: prompt.createdAt,
    updatedAt: prompt.updatedAt,
  });
}

async function exportPrivatePromptAsMarkdown(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  const prompt = await promptModel.findOne({
    _id: id,
    user: userId,
  });

  if (!prompt) {
    return res.status(404).json({
      message: "Prompt not found or you are not authorized to export it",
    });
  }

  const markdownContent = `absence # ${prompt.title}
    **Content:** ${prompt.content}
    **Category:** ${prompt.category}
    **Tags:** ${prompt.tags.map((tag) => `#${tag}`).join(" ")}
    **Created At:** ${prompt.createdAt}
    **Updated At:** ${prompt.updatedAt}
    `;

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${prompt.title}.md"`,
  );
  res.setHeader("Content-Type", "text/markdown");

  res.status(200).send(markdownContent);
}

async function exportPublicPromptAsMarkdown(req, res) {
  const { id } = req.params;

  const prompt = await promptModel.findOne({
    _id: id,
    isPublic: true,
  });

  const markdownContent = `# ${prompt.title}
**Content:** ${prompt.content}
**Category:** ${prompt.category}
**Tags:** ${prompt.tags.map((tag) => `#${tag}`).join(" ")}
**Created At:** ${prompt.createdAt}
**Updated At:** ${prompt.updatedAt}
`;

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${prompt.title}.md"`,
  );
  res.setHeader("Content-Type", "text/markdown");

  res.status(200).send(markdownContent);
}

// 📄 3. EXPORT PROMPT AS PDF
async function exportPrivatePromptAsPDF(req, res) {
  try {
    const { id } = req.params;

    const prompt = await promptModel.findOne({ _id: id, user: req.user.id });

    if (!prompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }

    // Response header set karna taaki browser PDF download kare
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${prompt.title}.pdf"`,
    );
    res.setHeader("Content-Type", "application/pdf");

    // Naya PDF document banana
    const doc = new PDFDocument({ margin: 50 });

    // PDF stream ko response mein pipe karna (direct download ke liye)
    doc.pipe(res);

    // --- PDF Styling & Content ---

    // Title
    doc.fontSize(22).fillColor("#111827").text(prompt.title, { align: "left" });
    doc.moveDown(0.5);

    // Metadata (Category & Tags)
    doc.fontSize(10).fillColor("#4B5563");
    doc.text(`Category: ${prompt.category}`);
    doc.text(`Tags: ${prompt.tags.map((tag) => `#${tag}`).join(", ")}`);
    doc.text(`Created At: new Date(prompt.createdAt).toLocaleDateString()`);
    doc.moveDown(1);

    // Divider Line
    doc
      .lineWidth(1)
      .strokeColor("#E5E7EB")
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .stroke();
    doc.moveDown(1);

    // Content Heading
    doc
      .fontSize(14)
      .fillColor("#1F2937")
      .text("Prompt Content:", { underline: true });
    doc.moveDown(0.5);

    // Main Content Box
    doc.fontSize(12).fillColor("#374151").text(prompt.content, {
      lineGap: 4,
      align: "left",
    });

    // PDF finalize karke stream close karna
    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to export as PDF" });
  }
}

async function exportPublicPromptAsPDF(req, res) {
  const { id } = req.params;

  const prompt = await promptModel.findOne({ _id: id, isPublic: true });

  if (!prompt) {
    return res
      .status(404)
      .json({ message: "Prompt not found or it is not public" });
  }

  // Response header set karna taaki browser PDF download kare
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${prompt.title}.pdf"`,
  );
  res.setHeader("Content-Type", "application/pdf");

  // Naya PDF document banana
  const doc = new PDFDocument({ margin: 50 });

  doc.pipe(res);

  // --- PDF Styling & Content ---

  // Title
  doc.fontSize(22).fillColor("#111827").text(prompt.title, { align: "left" });
  doc.moveDown(0.5);

  // Metadata (Category & Tags)
  doc.fontSize(10).fillColor("#4B5563");
  doc.moveDown(0.5);
  doc.text(`Category: ${prompt.category}`);
  doc.moveDown(0.5);
  doc.text(`Tags: ${prompt.tags.map((tag) => `#${tag}`).join(", ")}`);
  doc.moveDown(0.5);
  const formattedDate = new Date(prompt.createdAt).toLocaleDateString();
  doc.text(`Created At: ${formattedDate}`);
  doc.moveDown(1);

  // Divider Line
  doc
    .lineWidth(1)
    .strokeColor("#E5E7EB")
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .stroke();
  doc.moveDown(1);

  // Content Heading
  doc
    .fontSize(14)
    .fillColor("#1F2937")
    .text("Prompt Content:", { underline: true });
  doc.moveDown(0.5);

  // Main Content Box
  doc.fontSize(12).fillColor("#374151").text(prompt.content, {
    lineGap: 4,
    align: "left",
  });

  // PDF finalize karke stream close karna
  doc.end();
}

module.exports = {
  exportPrivatePromptAsJSON,
  exportPublicPromptAsJSON,
  exportPrivatePromptAsMarkdown,
  exportPublicPromptAsMarkdown,
  exportPrivatePromptAsPDF,
  exportPublicPromptAsPDF,
};
