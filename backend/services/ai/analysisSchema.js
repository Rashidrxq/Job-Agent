// ==========================================
// UNIFIED RESUME ANALYSIS SCHEMA
// ==========================================

function createEmptyResumeAnalysis() {
  return {
    atsScore: 0,

    skills: {
      programming: [],
      frontend: [],
      backend: [],
      databases: [],
      ai_ml: [],
      tools: [],
      concepts: [],
    },

    totalSkills: 0,

    education: [],

    experience: [],

    projects: [],

    certifications: [],

    keywords: [],

    strengths: [],

    weaknesses: [],

    atsIssues: [],

    summary: "",

    textLength: 0,
  };
}

function normalizeResumeAnalysis(data, textLength = 0) {
  const base = createEmptyResumeAnalysis();

  const analysis = {
    ...base,
    ...(data || {}),
    skills: {
      ...base.skills,
      ...(data?.skills || {}),
    },
  };

  // Make sure arrays are actually arrays
  Object.keys(analysis.skills).forEach((category) => {
    if (!Array.isArray(analysis.skills[category])) {
      analysis.skills[category] = [];
    }
  });

  const arrayFields = [
    "education",
    "experience",
    "projects",
    "certifications",
    "keywords",
    "strengths",
    "weaknesses",
    "atsIssues",
  ];

  arrayFields.forEach((field) => {
    if (!Array.isArray(analysis[field])) {
      analysis[field] = [];
    }
  });

  analysis.atsScore = Math.max(
    0,
    Math.min(100, Number(analysis.atsScore) || 0)
  );

  analysis.totalSkills = Object.values(analysis.skills)
    .flat()
    .filter(Boolean).length;

  analysis.textLength = textLength;

  return analysis;
}

module.exports = {
  createEmptyResumeAnalysis,
  normalizeResumeAnalysis,
};