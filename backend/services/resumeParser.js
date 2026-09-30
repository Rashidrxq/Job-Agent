const fs = require("fs");
const { PDFParse } = require("pdf-parse");
const mammoth = require("mammoth");

async function extractResumeText(filePath, fileType) {
  // =========================
  // PDF
  // =========================
  if (fileType === "application/pdf") {
    const buffer = fs.readFileSync(filePath);

    const parser = new PDFParse({
      data: buffer,
    });

    try {
      const result = await parser.getText();

      return result.text || "";
    } finally {
      await parser.destroy();
    }
  }

  // =========================
  // DOCX
  // =========================
  if (
    fileType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({
      path: filePath,
    });

    return result.value || "";
  }

  throw new Error("Unsupported resume file type");
}

module.exports = {
  extractResumeText,
};