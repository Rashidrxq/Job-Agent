function normalizeText(text) {
  return text
    .replace(/\s+/g, " ")
    .trim();
}

function containsSkill(text, skill) {
  const normalized = text.toLowerCase();
  const target = skill.toLowerCase();

  // Escape regex characters
  const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Word-boundary matching prevents partial matches
  const regex = new RegExp(`\\b${escaped}\\b`, "i");

  return regex.test(normalized);
}

function analyzeResume(text) {
  if (!text || typeof text !== "string") {
    throw new Error("Resume text is required");
  }

  const normalizedText = normalizeText(text);

  /*
   * Skills are deliberately grouped.
   * Only skills actually detected in the resume are returned.
   */
  const skillGroups = {
    programming: [
      "Python",
      "C",
      "C++",
      "Java",
      "JavaScript",
      "TypeScript",
      "SQL",
    ],

    frontend: [
      "HTML5",
      "HTML",
      "CSS3",
      "CSS",
      "React",
      "Bootstrap",
    ],

    backend: [
      "Node.js",
      "Express.js",
      "Express",
      "Flask",
      "FastAPI",
      "PHP",
    ],

    databases: [
      "MySQL",
      "PostgreSQL",
      "SQLite",
      "MongoDB",
    ],

    ai_ml: [
      "YOLOv8",
      "YOLO",
      "EfficientNet",
      "Deep Learning",
      "Machine Learning",
      "Computer Vision",
    ],

    tools: [
      "Git",
      "GitHub",
      "Postman",
      "Visual Studio Code",
      "Google Workspace",
      "Selenium",
    ],

    concepts: [
      "Data Structures",
      "Algorithms",
      "Object-Oriented Programming",
      "OOP",
      "RESTful APIs",
      "REST APIs",
      "Database Design",
      "Authentication",
      "Authorization",
      "CRUD",
      "Debugging",
      "Software Testing",
      "SDLC",
    ],
  };

  const skills = {};
  const allSkills = [];

  for (const [group, groupSkills] of Object.entries(skillGroups)) {
    skills[group] = [];

    for (const skill of groupSkills) {
      if (containsSkill(normalizedText, skill)) {
        skills[group].push(skill);
        allSkills.push(skill);
      }
    }
  }

  /*
   * Extract education
   */
  const education = [];

  if (/b\.?tech/i.test(normalizedText)) {
    education.push("B.Tech");
  }

  if (/information technology/i.test(normalizedText)) {
    education.push("Information Technology");
  }

  /*
   * Extract experience
   */
  const experience = [];

  const internshipRegex =
    /software developer intern[\s\S]{0,200}/i;

  if (internshipRegex.test(text)) {
    experience.push("Software Developer Intern");
  }

  /*
   * Extract projects
   */
  const projects = [];

  const projectNames = [
    "AI-Based Poultry Disease Detection System",
    "CodePilot",
    "Attendance Management System",
  ];

  for (const project of projectNames) {
    if (containsSkill(normalizedText, project)) {
      projects.push(project);
    }
  }

  /*
   * Basic ATS completeness score.
   *
   * This is NOT a job-match score.
   */
  let atsScore = 0;

  const sections = [
    /professional summary/i,
    /technical skills/i,
    /projects/i,
    /internship experience/i,
    /education/i,
    /certifications/i,
  ];

  for (const section of sections) {
    if (section.test(text)) {
      atsScore += 10;
    }
  }

  if (allSkills.length >= 5) {
    atsScore += 10;
  }

  if (allSkills.length >= 10) {
    atsScore += 10;
  }

  atsScore = Math.min(100, atsScore);

  return {
    atsScore,

    skills,

    totalSkills: allSkills.length,

    education,

    experience,

    projects,

    textLength: normalizedText.length,
  };
}

module.exports = {
  analyzeResume,
};