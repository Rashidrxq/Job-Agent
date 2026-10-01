const express = require("express");
const db = require("../database");
const { calculateJobMatch } = require("../services/jobMatcher");
const { importAdzunaJobs } = require("../services/importJobs");

const router = express.Router();

// =====================================================
// GET ALL JOBS + RESUME MATCH
// GET /api/jobs
// =====================================================

router.get("/", (req, res) => {
  try {
    // Get the latest analyzed resume
    const resume = db
      .prepare(`
        SELECT id, resume_analysis
        FROM resumes
        WHERE resume_analysis IS NOT NULL
        ORDER BY id DESC
        LIMIT 1
      `)
      .get();

    // Get all jobs
    const jobs = db
      .prepare(`
        SELECT *
        FROM jobs
        ORDER BY id DESC
      `)
      .all();

    let analyzedJobs = jobs;

    // Calculate match if an analyzed resume exists
    if (resume) {
      let resumeAnalysis;

      try {
        resumeAnalysis = JSON.parse(resume.resume_analysis);
      } catch (error) {
        console.error("RESUME ANALYSIS JSON ERROR:", error);
        resumeAnalysis = null;
      }

          if (resumeAnalysis) {
      analyzedJobs = jobs.map((job) => {
        const match = calculateJobMatch(
          resumeAnalysis,
          job
        );

        return {
          ...job,

          matchScore: match.score,

          matchedSkills: match.matchedSkills,

          missingSkills: match.missingSkills,

          match: {
            score: match.score,
            matchedSkills: match.matchedSkills,
            missingSkills: match.missingSkills,
          },
        };
      });

  // Highest match first
  analyzedJobs.sort((a, b) => {
    return b.matchScore - a.matchScore;
  });
}
    }

    res.json({
      success: true,

      resume: resume
        ? {
            id: resume.id,
          }
        : null,

      jobs: analyzedJobs,
    });
  } catch (error) {
    console.error("GET JOBS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
});

// =====================================================
// CREATE JOB
// POST /api/jobs
// =====================================================

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

// =====================================================
// IMPORT ADZUNA JOBS
// POST /api/jobs/import
// =====================================================

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
    console.error(
      "IMPORT JOBS ERROR:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to import jobs",
      error: error.message,
    });
  }
});

module.exports = router;