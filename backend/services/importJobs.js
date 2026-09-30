const db = require("../database");
const axios = require("axios");

async function importAdzunaJobs({
  what = "software developer",
  where = "Kerala",
  page = 1,
} = {}) {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  if (!appId || !appKey) {
    throw new Error("Adzuna API credentials are missing");
  }

  const url = `https://api.adzuna.com/v1/api/jobs/in/search/${page}`;

  const response = await axios.get(url, {
    params: {
      app_id: appId,
      app_key: appKey,
      results_per_page: 20,
      what,
      where,
      "content-type": "application/json",
    },
    headers: {
      Accept: "application/json",
    },
  });

  const jobs = response.data.results;

  const insertJob = db.prepare(`
    INSERT INTO jobs (
    adzuna_id,
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
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let imported = 0;

  for (const job of jobs) {
    if (!job.title || !job.company?.display_name) {
      continue;
    }

    const existingJob = db
  .prepare("SELECT id FROM jobs WHERE adzuna_id = ?")
  .get(job.id);

if (existingJob) {
  continue;
}

insertJob.run(
  job.id,
  job.title,
  job.company.display_name,
  job.location?.display_name || null,
  job.description || null,
  null,
  job.salary_min && job.salary_max
    ? `₹${job.salary_min} - ₹${job.salary_max}`
    : null,
  job.redirect_url || null,
  "adzuna",
  job.created || null
);



    imported++;
  }

  return {
    totalFound: jobs.length,
    imported,
  };
}

module.exports = {
  importAdzunaJobs,
};