const db = require("../models/db");
const multer = require("multer");
const path = require("path");

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Apply for a job
const applyJob = (req, res) => {
  const { name, email, jobId } = req.body;
  const resumeFile = req.file ? req.file.filename : null;

  if (!name || !email || !jobId || !resumeFile) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const checkSql = "SELECT * FROM applications WHERE email = ? AND jobId = ?";
  db.query(checkSql, [email, jobId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length > 0) {
      return res.status(400).json({ error: "You have already applied to this job" });
    }

    const sql =
      "INSERT INTO applications (name, email, jobId, resumeFile, status, appliedDate) VALUES (?, ?, ?, ?, 'applied', NOW())";

    db.query(sql, [name, email, jobId, resumeFile], (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });

      res.status(201).json({ message: "Application submitted successfully" });
    });
  });
};

// Fetch applications for logged-in user (candidate or recruiter)
const getApplications = (req, res) => {
  let sql;
  let params = [];

  if (req.user.role === "candidate") {
    sql = "SELECT * FROM applications WHERE email = ? ORDER BY appliedDate DESC";
    params.push(req.user.email);
  } else if (req.user.role === "recruiter") {
    sql = "SELECT * FROM applications ORDER BY appliedDate DESC";
  } else {
    return res.status(403).json({ error: "Unauthorized" });
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ applications: results });
  });
};

module.exports = { applyJob, upload, getApplications };
