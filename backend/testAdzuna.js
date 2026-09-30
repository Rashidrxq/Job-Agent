require("dotenv").config();
const axios = require("axios");

async function test() {
  try {
    console.log("APP ID exists:", !!process.env.ADZUNA_APP_ID);
    console.log("APP KEY exists:", !!process.env.ADZUNA_APP_KEY);

    const response = await axios.get(
      "https://api.adzuna.com/v1/api/jobs/in/search/1",
      {
        params: {
          app_id: process.env.ADZUNA_APP_ID,
          app_key: process.env.ADZUNA_APP_KEY,
          results_per_page: 5,
          what: "software developer",
          where: "Kerala",
          "content-type": "application/json",
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    console.log("SUCCESS");
    console.log("Total jobs:", response.data.count);
    console.log(response.data.results);
  } catch (error) {
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
  }
}

test();