const express = require("express");
const db = require("../database");

const router = express.Router();

// GET /api/jobs

// POST /api/jobs
router.post("/", (req, res) => {
  try {
    const {
      title,
      company,
      location,
      description,
      requirements,
      salary,
      job_url,
      source,
      posted_at,
    } = req.body;

    if (!title || !company) {
      return res.status(400).json({
        success: false,
        message: "Title and company are required",
      });
    }

    const statement = db.prepare(`
      INSERT INTO jobs (
        title,
        company,
        location,
        description,
        requirements,
        salary,
        job_url,
        source,
        posted_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = statement.run(
      title,
      company,
      location || null,
      description || null,
      requirements || null,
      salary || null,
      job_url || null,
      source || null,
      posted_at || null
    );

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      jobId: result.lastInsertRowid,
    });
  } catch (error) {
    console.error("CREATE JOB ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create job",
    });
  }
});

router.get("/", (req, res) => {
  try {
    const jobs = db
      .prepare(`
        SELECT *
        FROM jobs
        ORDER BY id DESC
      `)
      .all();

    res.json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("GET JOBS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
});
const { importAdzunaJobs } = require("../services/importJobs");

// POST /api/jobs/import
router.post("/import", async (req, res) => {
  try {
    const result = await importAdzunaJobs({
      what: req.body.what || "software developer",
      where: req.body.where || "Kerala",
      page: req.body.page || 1,
    });

    res.json({
      success: true,
      message: "Jobs imported successfully",
      ...result,
    });
  } catch (error) {
    console.error("IMPORT JOBS ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to import jobs",
      error: error.message,
    });
  }
});
module.exports = router;