const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./database");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const resumeRoutes = require("./routes/resumes");
const jobRoutes = require("./routes/jobs");

app.use("/api/resumes", resumeRoutes);
app.use("/api/jobs", jobRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "JobAgent backend is running",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`JobAgent backend running on http://localhost:${PORT}`);
});