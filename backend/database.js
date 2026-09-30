const Database = require("better-sqlite3");

const db = new Database("jobagent.db");

// Enable foreign keys
db.pragma("foreign_keys = ON");

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS resumes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_type TEXT,
    file_size INTEGER,
    text TEXT,
    ats_score INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

console.log("Database ready");

module.exports = db;