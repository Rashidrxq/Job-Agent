// ==========================================
// JOB MATCHER
// ==========================================

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^\w+#.\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ==========================================
// SKILL ALIASES
// ==========================================

const SKILL_ALIASES = {
  Python: ["python"],

  JavaScript: [
    "javascript",
    "js",
  ],

  TypeScript: [
    "typescript",
    "ts",
  ],

  Java: [
    "java",
  ],

  "C++": [
    "c++",
    "cpp",
  ],

  PHP: [
    "php",
  ],

  C: [
    " c ",
    "c programming",
    "c language",
  ],

  React: [
    "react",
    "reactjs",
    "react.js",
  ],

  "Node.js": [
    "node.js",
    "nodejs",
    "node js",
  ],

  Express: [
    "express",
    "express.js",
    "expressjs",
  ],

  Flask: [
    "flask",
  ],

  FastAPI: [
    "fastapi",
    "fast api",
  ],

  HTML: [
    "html",
    "html5",
  ],

  CSS: [
    "css",
    "css3",
  ],

  Bootstrap: [
    "bootstrap",
  ],

  SQL: [
    "sql",
  ],

  MySQL: [
    "mysql",
  ],

  PostgreSQL: [
    "postgresql",
    "postgres",
  ],

  SQLite: [
    "sqlite",
  ],

  MongoDB: [
    "mongodb",
    "mongo db",
  ],

  "REST API": [
    "rest api",
    "restful api",
    "rest apis",
    "restful apis",
  ],

  Git: [
    "git",
  ],

  GitHub: [
    "github",
  ],

  Docker: [
    "docker",
  ],

  AWS: [
    "aws",
    "amazon web services",
  ],

  Azure: [
    "azure",
  ],

  TensorFlow: [
    "tensorflow",
  ],

  PyTorch: [
    "pytorch",
  ],

  YOLOv8: [
    "yolov8",
    "yolo v8",
  ],

  EfficientNet: [
    "efficientnet",
  ],

  Selenium: [
    "selenium",
  ],

  "Data Structures": [
    "data structures",
    "data structure",
  ],

  Algorithms: [
    "algorithms",
    "algorithm",
  ],

  OOP: [
    "object oriented programming",
    "object-oriented programming",
    "oop",
  ],

  JWT: [
    "jwt",
    "json web token",
    "json web tokens",
  ],

  "Postman": [
    "postman",
  ],

  "Visual Studio Code": [
    "visual studio code",
    "vs code",
  ],

  "Computer Vision": [
    "computer vision",
  ],

  "Deep Learning": [
    "deep learning",
  ],

  "Machine Learning": [
    "machine learning",
    "machine-learning",
  ],

  "RESTful APIs": [
    "restful apis",
    "restful api",
  ],

  "Database Design": [
    "database design",
  ],

  Authentication: [
    "authentication",
  ],

  Authorization: [
    "authorization",
  ],

  CRUD: [
    "crud",
  ],

  SDLC: [
    "software development life cycle",
    "sdlc",
  ],

  Testing: [
    "software testing",
    "testing",
  ],
};

const SKILL_DICTIONARY = Object.keys(SKILL_ALIASES);

// ==========================================
// WORD BOUNDARY ESCAPER
// ==========================================

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ==========================================
// CHECK WHETHER TEXT CONTAINS SKILL
// ==========================================

function containsSkill(text, skill) {
  const normalizedText = normalize(text);

  const aliases = SKILL_ALIASES[skill] || [skill];

  return aliases.some((alias) => {
    const normalizedAlias = normalize(alias);

    if (!normalizedAlias) {
      return false;
    }

    // --------------------------------------
    // Special handling for C
    // --------------------------------------

    if (skill === "C") {
      return (
        /\bc programming\b/i.test(normalizedText) ||
        /\bc language\b/i.test(normalizedText) ||
        /\bprogramming in c\b/i.test(normalizedText) ||
        /\bc\/c\+\+\b/i.test(normalizedText)
      );
    }

    // --------------------------------------
    // Special handling for C++
    // --------------------------------------

    if (skill === "C++") {
      return (
        /\bc\+\+\b/i.test(normalizedText) ||
        /\bcpp\b/i.test(normalizedText)
      );
    }

    // --------------------------------------
    // Java
    // --------------------------------------

    if (skill === "Java") {
      return /\bjava\b/i.test(normalizedText);
    }

    // --------------------------------------
    // SQL
    // --------------------------------------

    if (skill === "SQL") {
      return /\bsql\b/i.test(normalizedText);
    }

    // --------------------------------------
    // Git
    // --------------------------------------

    if (skill === "Git") {
      return /\bgit\b/i.test(normalizedText);
    }

    // --------------------------------------
    // AWS
    // --------------------------------------

    if (skill === "AWS") {
      return /\baws\b/i.test(normalizedText);
    }

    // --------------------------------------
    // Normal matching
    // --------------------------------------

    const escaped = escapeRegex(normalizedAlias);

    return new RegExp(
      `(^|\\s)${escaped}(?=\\s|$)`,
      "i"
    ).test(normalizedText);
  });
}

// ==========================================
// FLATTEN RESUME SKILLS
// ==========================================

function flattenSkills(skills) {
  if (!skills || typeof skills !== "object") {
    return [];
  }

  return [
    ...new Set(
      Object.values(skills)
        .flat()
        .filter(Boolean)
        .map((skill) => String(skill).trim())
    ),
  ];
}

// ==========================================
// CHECK RESUME SKILL
// ==========================================

function resumeHasSkill(resumeSkills, jobSkill) {
  return resumeSkills.some((resumeSkill) => {
    const normalizedResumeSkill = normalize(resumeSkill);

    const aliases = SKILL_ALIASES[jobSkill] || [];

    return aliases.some((alias) => {
      const normalizedAlias = normalize(alias);

      if (!normalizedAlias) {
        return false;
      }

      if (jobSkill === "C") {
        return (
          normalizedResumeSkill === "c" ||
          normalizedResumeSkill.includes("c programming")
        );
      }

      if (jobSkill === "C++") {
        return (
          normalizedResumeSkill === "c++" ||
          normalizedResumeSkill === "cpp"
        );
      }

      return (
        normalizedResumeSkill === normalizedAlias ||
        normalizedResumeSkill.includes(normalizedAlias)
      );
    });
  });
}

// ==========================================
// DETECT JOB SKILLS
// ==========================================

function detectJobSkills(jobText) {
  return SKILL_DICTIONARY.filter((skill) =>
    containsSkill(jobText, skill)
  );
}

// ==========================================
// TITLE RELEVANCE
// ==========================================

function calculateTitleScore(title) {
  const normalizedTitle = normalize(title);

  const developerKeywords = [
    "software developer",
    "software development",
    "software engineer",
    "software engineering",
    "developer",
    "development",
    "engineer",
    "engineering",
    "frontend",
    "front end",
    "backend",
    "back end",
    "full stack",
    "fullstack",
    "web developer",
    "application developer",
    "application engineer",
    "programmer",
  ];

  const hasRelevantTitle = developerKeywords.some((keyword) =>
    normalizedTitle.includes(keyword)
  );

  return hasRelevantTitle ? 15 : 0;
}

// ==========================================
// JOB DOMAIN RELEVANCE
// ==========================================

function calculateRelevanceScore(jobText) {
  const normalizedJobText = normalize(jobText);

  const keywords = [
    "software",
    "developer",
    "development",
    "programming",
    "web",
    "application",
    "api",
    "database",
    "engineering",
  ];

  const matches = keywords.filter((keyword) =>
    normalizedJobText.includes(keyword)
  );

  if (matches.length >= 3) {
    return 10;
  }

  if (matches.length >= 1) {
    return 5;
  }

  return 0;
}

// ==========================================
// MAIN MATCH FUNCTION
// ==========================================

function calculateJobMatch(resumeAnalysis, job) {
  if (!resumeAnalysis || !job) {
    return {
      score: 0,
      matchedSkills: [],
      missingSkills: [],
      breakdown: {
        skillScore: 0,
        titleScore: 0,
        relevanceScore: 0,
      },
    };
  }

  // ----------------------------------------
  // Resume skills
  // ----------------------------------------

  const resumeSkills = flattenSkills(
    resumeAnalysis.skills
  );

  // ----------------------------------------
  // Job text
  // ----------------------------------------

  const jobTitle = String(job.title || "");

  const jobDescription = String(
    job.description || ""
  );

  const jobRequirements = String(
    job.requirements || ""
  );

  const jobText = `
    ${jobTitle}
    ${jobDescription}
    ${jobRequirements}
  `;

  // ----------------------------------------
  // Detect required skills
  // ----------------------------------------

  const detectedJobSkills = detectJobSkills(
    jobText
  );

  // ----------------------------------------
  // Match skills
  // ----------------------------------------

  const matchedSkills =
    detectedJobSkills.filter((skill) =>
      resumeHasSkill(resumeSkills, skill)
    );

  // ----------------------------------------
  // Missing skills
  // ----------------------------------------

  const missingSkills =
    detectedJobSkills.filter(
      (skill) =>
        !matchedSkills.includes(skill)
    );

  // ========================================
  // SCORE
  // ========================================

 let skillScore = 0;
let titleScore = 0;
let relevanceScore = 0;

// ========================================
// SKILL SCORE
// ========================================

if (detectedJobSkills.length > 0) {
  skillScore =
    (matchedSkills.length /
      detectedJobSkills.length) *
    80;
}

// ========================================
// TITLE SCORE
// ========================================

if (detectedJobSkills.length > 0) {
  titleScore = calculateTitleScore(jobTitle);
}

// ========================================
// RELEVANCE SCORE
// ========================================

if (detectedJobSkills.length > 0) {
  relevanceScore =
    calculateRelevanceScore(jobText);
}

// ========================================
// NO DETECTABLE SKILLS
// ========================================

// If the job description doesn't contain
// recognizable technical requirements,
// don't pretend we have a strong match.

if (detectedJobSkills.length === 0) {
  titleScore = 10;
  relevanceScore = 0;
}

// ========================================
// FINAL SCORE
// ========================================

let score = Math.round(
  skillScore +
  titleScore +
  relevanceScore
);

score = Math.max(
  0,
  Math.min(100, score)
);

  score = Math.max(
    0,
    Math.min(100, score)
  );

  // ========================================
  // RETURN
  // ========================================

  return {
    score,

    matchedSkills,

    missingSkills,

    breakdown: {
      skillScore: Math.round(skillScore),
      titleScore,
      relevanceScore,
    },
  };
}

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  calculateJobMatch,
};