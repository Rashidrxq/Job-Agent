const axios = require("axios");

async function fetchAdzunaJobs({
  country = "in",
  what = "software developer",
  where = "Kerala",
  page = 1,
} = {}) {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  if (!appId || !appKey) {
    throw new Error("Adzuna API credentials are missing");
  }

  const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}`;

  const response = await axios.get(url, {
    params: {
      app_id: appId,
      app_key: appKey,
      what,
      where,
      results_per_page: 20,
      content_type: "application/json",
    },
  });

  return response.data;
}

module.exports = {
  fetchAdzunaJobs,
};