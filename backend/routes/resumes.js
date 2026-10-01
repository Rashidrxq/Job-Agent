const express = require("express");
const multer = require("multer");
const path = require("path");

const db = require("../database");
const { extractResumeText } = require("../services/resumeParser");
const { analyzeResume } = require("../services/resumeAnalyzer");

const router = express.Router();

// ===============================
// FILE UPLOAD CONFIGURATION
// ===============================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// ===============================
// ALLOW ONLY PDF AND DOCX
// ===============================

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and DOCX files are allowed"));
    }
  },
});

// ===============================
// GET ALL RESUMES
// GET /api/resumes
// ===============================

router.get("/", (req, res) => {
  try {
    const resumes = db
      .prepare(`
        SELECT *
        FROM resumes
        ORDER BY id DESC
      `)
      .all();

    res.json({
      success: true,
      resumes,
    });
  } catch (error) {
    console.error("GET RESUMES ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch resumes",
    });
  }
});

// ===============================
// UPLOAD RESUME
// POST /api/resumes
// ===============================

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    // Check file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    // Resume name
    const name =
      req.body.name ||
      req.file.originalname.replace(/\.(pdf|docx)$/i, "");

    // ===============================
    // EXTRACT TEXT
    // ===============================

    const text = await extractResumeText(
      req.file.path,
      req.file.mimetype
    );

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from resume",
      });
    }

    // ===============================
    // ANALYZE RESUME
    // ===============================

    const analysis = analyzeResume(text);

    // ===============================
    // SAVE TO DATABASE
    // ===============================

    const statement = db.prepare(`
      INSERT INTO resumes (
        name,
        file_name,
        file_path,
        file_type,
        file_size,
        text,
        ats_score,
        resume_analysis
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = statement.run(
      name,
      req.file.originalname,
      req.file.path,
      req.file.mimetype,
      req.file.size,
      text,
      analysis.atsScore,
      JSON.stringify(analysis)
    );

    // ===============================
    // RESPONSE
    // ===============================

    res.status(201).json({
      success: true,
      message: "Resume uploaded and analyzed successfully",

      resume: {
        id: result.lastInsertRowid,
        name,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        textLength: text.length,
        atsScore: analysis.atsScore,
        analysis,
      },
    });
  } catch (error) {
    console.error("UPLOAD RESUME ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to upload and process resume",
      error: error.message,
    });
  }
});

// ===============================
// EXPORT ROUTER
// ===============================

module.exports = router;