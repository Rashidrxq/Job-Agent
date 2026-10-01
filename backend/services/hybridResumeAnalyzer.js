// ==========================================
// HYBRID RESUME ANALYZER
// ==========================================

const {
  analyzeResume: ruleAnalyzeResume,
} = require("./resumeAnalyzer");

const {
  normalizeResumeAnalysis,
} = require("./ai/analysisSchema");

// ------------------------------------------
// HYBRID ANALYSIS
// ------------------------------------------

async function analyzeResumeHybrid(
  resumeText,
  aiProvider = null
) {
  // ----------------------------------------
  // 1. Rule-based analysis
  // ----------------------------------------

  let ruleAnalysis;

  try {
    ruleAnalysis = ruleAnalyzeResume(resumeText);
  } catch (error) {
    console.error(
      "RULE RESUME ANALYSIS ERROR:",
      error
    );

    ruleAnalysis = null;
  }

  // ----------------------------------------
  // 2. AI analysis
  // ----------------------------------------

  let aiAnalysis = null;

  if (aiProvider) {
    try {
      aiAnalysis =
        await aiProvider.analyzeResume(
          resumeText
        );
    } catch (error) {
      console.error(
        "AI RESUME ANALYSIS ERROR:",
        error.message
      );
    }
  }

  // ----------------------------------------
  // 3. AI + Rule merge
  // ----------------------------------------

  const merged = mergeResumeAnalysis(
    ruleAnalysis,
    aiAnalysis,
    resumeText.length
  );

  return merged;
}

// ==========================================
// MERGE
// ==========================================

function mergeResumeAnalysis(
  ruleAnalysis,
  aiAnalysis,
  textLength
) {
  // If AI unavailable, use rules
  if (!aiAnalysis) {
    return normalizeResumeAnalysis(
      ruleAnalysis,
      textLength
    );
  }

  // If rules unavailable, use AI
  if (!ruleAnalysis) {
    return normalizeResumeAnalysis(
      aiAnalysis,
      textLength
    );
  }

  const mergedSkills = {};

  const categories = [
    "programming",
    "frontend",
    "backend",
    "databases",
    "ai_ml",
    "tools",
    "concepts",
  ];

  categories.forEach((category) => {
    const ruleSkills =
      ruleAnalysis.skills?.[category] || [];

    const aiSkills =
      aiAnalysis.skills?.[category] || [];

    mergedSkills[category] = [
      ...new Set([
        ...ruleSkills,
        ...aiSkills,
      ]),
    ];
  });

  return normalizeResumeAnalysis(
    {
      ...ruleAnalysis,
      ...aiAnalysis,

      skills: mergedSkills,

      education:
        aiAnalysis.education?.length
          ? aiAnalysis.education
          : ruleAnalysis.education || [],

      experience:
        aiAnalysis.experience?.length
          ? aiAnalysis.experience
          : ruleAnalysis.experience || [],

      projects:
        aiAnalysis.projects?.length
          ? aiAnalysis.projects
          : ruleAnalysis.projects || [],
    },
    textLength
  );
}

module.exports = {
  analyzeResumeHybrid,
  mergeResumeAnalysis,
};