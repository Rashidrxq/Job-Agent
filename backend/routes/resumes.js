const express = require("express");
const multer = require("multer");
const path = require("path");

const db = require("../database");

const router = express.Router();

// Where uploaded files are stored
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Allow only PDF and DOCX
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

// POST /api/resumes
router.post("/", upload.single("resume"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const name =
      req.body.name ||
      req.file.originalname.replace(/\.(pdf|docx)$/i, "");

    const statement = db.prepare(`
      INSERT INTO resumes (
        name,
        file_name,
        file_path,
        file_type,
        file_size
      )
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = statement.run(
      name,
      req.file.originalname,
      req.file.path,
      req.file.mimetype,
      req.file.size
    );

    res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",

      resume: {
        id: result.lastInsertRowid,
        name,
        fileName: req.file.originalname,
        fileSize: req.file.size,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to upload resume",
    });
  }
});

module.exports = router;