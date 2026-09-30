require("dotenv").config();

const { importAdzunaJobs } = require("./services/importJobs");

async function test() {
  try {
    const result = await importAdzunaJobs({
      what: "software developer",
      where: "Kerala",
      page: 1,
    });

    console.log("IMPORT SUCCESS");
    console.log(result);
  } catch (error) {
    console.error("IMPORT ERROR:", error.message);
  }
}

test();