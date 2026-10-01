// ==========================================
// OPENAI PROVIDER
// ==========================================

const OpenAI = require("openai");
const AIProvider = require("./aiProvider");

class OpenAIProvider extends AIProvider {
  constructor() {
    super();

    this.name = "openai";

    if (!process.env.OPENAI_API_KEY) {
      throw new Error(
        "OPENAI_API_KEY is not configured"
      );
    }

    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async analyzeResume(resumeText) {
    const response =
      await this.client.responses.create({
        model: "gpt-5-mini",

        input: [
          {
            role: "system",
            content: `
You are an expert resume and ATS analyzer.

Analyze the resume objectively.

Return ONLY valid JSON.

Do not invent skills, experience, education,
projects, certifications, or achievements.

Use the following schema:

{
  "atsScore": 0,
  "skills": {
    "programming": [],
    "frontend": [],
    "backend": [],
    "databases": [],
    "ai_ml": [],
    "tools": [],
    "concepts": []
  },
  "education": [],
  "experience": [],
  "projects": [],
  "certifications": [],
  "keywords": [],
  "strengths": [],
  "weaknesses": [],
  "atsIssues": [],
  "summary": ""
}

ATS score should evaluate resume structure,
clarity, keyword usage, technical skill
presentation, readability, and ATS compatibility.

Do not score based on whether you personally
like the candidate.
            `,
          },
          {
            role: "user",
            content: `
Analyze this resume:

---------------- RESUME ----------------

${resumeText}

-------------- END RESUME --------------
            `,
          },
        ],
      });

    const output = response.output_text;

    if (!output) {
      throw new Error(
        "OpenAI returned empty response"
      );
    }

    return parseJSON(output);
  }
}

// ==========================================
// SAFE JSON PARSER
// ==========================================

function parseJSON(text) {
  let cleaned = String(text).trim();

  // Remove markdown code fences if present
  cleaned = cleaned
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error(
      "OPENAI JSON PARSE ERROR:",
      error.message
    );

    console.error(
      "RAW AI RESPONSE:",
      text
    );

    throw new Error(
      "AI returned invalid JSON"
    );
  }
}

module.exports = OpenAIProvider;