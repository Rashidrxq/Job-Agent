const skillGroups = {
  programming: [
    "Python",
    "JavaScript",
    "TypeScript",
    "Java",
    "C",
    "C++",
    "C#",
    "PHP",
    "Go",
    "Rust",
  ],

  frontend: [
    "React",
    "Next.js",
    "Vue",
    "Angular",
    "HTML",
    "CSS",
    "Tailwind",
    "Bootstrap",
  ],

  backend: [
    "Node.js",
    "Express",
    "Flask",
    "Django",
    "Spring",
    "REST API",
  ],

  database: [
    "SQL",
    "MySQL",
    "PostgreSQL",
    "SQLite",
    "MongoDB",
    "Prisma",
  ],

  tools: [
    "Git",
    "GitHub",
    "Docker",
    "AWS",
    "Azure",
    "Excel",
  ],

  ai_ml: [
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "PyTorch",
    "YOLO",
    "Pandas",
    "NumPy",
  ],
};

function extractSkills(text) {
  const found = [];
  const normalizedText = text.toLowerCase();

  for (const skills of Object.values(skillGroups)) {
    for (const skill of skills) {
      if (normalizedText.includes(skill.toLowerCase())) {
        if (!found.includes(skill)) {
          found.push(skill);
        }
      }
    }
  }

  return found;
}

function calculateAtsScore(text, skills) {
  let score = 0;

  if (text.length > 500) score += 20;
  if (text.length > 1500) score += 10;

  if (/education/i.test(text)) score += 15;
  if (/experience/i.test(text)) score += 15;
  if (/projects/i.test(text)) score += 15;
  if (/skills/i.test(text)) score += 10;

  if (skills.length >= 5) score += 5;
  if (skills.length >= 10) score += 5;
  if (skills.length >= 15) score += 5;

  return Math.min(score, 100);
}

function analyzeResume(text) {
  if (!text || !text.trim()) {
    throw new Error("Resume text is empty");
  }

  const skills = extractSkills(text);
  const atsScore = calculateAtsScore(text, skills);

  return {
    skills,
    atsScore,
    textLength: text.length,
  };
}

module.exports = {
  analyzeResume,
};