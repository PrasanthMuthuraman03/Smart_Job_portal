const db = require("../models/db");

// ✅ Get all jobs with search, filters, sorting, pagination
const getJobs = (req, res) => {
  const { search, location, sort, page = 1, limit = 3 } = req.query;

  let sql = "SELECT * FROM jobs WHERE 1=1";
  const params = [];

  // 🔍 Search by title/company/skills
  if (search) {
    sql += " AND (title LIKE ? OR company LIKE ? OR skills LIKE ?)";
    const searchValue = `%${search}%`;
    params.push(searchValue, searchValue, searchValue);
  }

  // 📍 Filter by location
  if (location) {
    sql += " AND location LIKE ?";
    params.push(`%${location}%`);
  }

  // 🆕 Sorting
  if (sort === "newest") {
    sql += " ORDER BY postedDate DESC";
  } else if (sort === "oldest") {
    sql += " ORDER BY postedDate ASC";
  } else {
    sql += " ORDER BY id DESC";
  }

  // 🧾 Pagination
  const offset = (page - 1) * limit;
  sql += " LIMIT ? OFFSET ?";
  params.push(Number(limit), Number(offset));

  // 🟢 Debugging: log query + params
  console.log("📌 Final SQL:", sql);
  console.log("📌 Params:", params);

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("❌ DB Error:", err);
      return res.status(500).json({ error: err.message });
    }

    // Count total for pagination
    let countSql = "SELECT COUNT(*) as total FROM jobs WHERE 1=1";
    const countParams = [];

    if (search) {
      countSql += " AND (title LIKE ? OR company LIKE ? OR skills LIKE ?)";
      const searchValue = `%${search}%`;
      countParams.push(searchValue, searchValue, searchValue);
    }

    if (location) {
      countSql += " AND location LIKE ?";
      countParams.push(`%${location}%`);
    }

    console.log("📊 Count SQL:", countSql);
    console.log("📊 Count Params:", countParams);

    db.query(countSql, countParams, (err2, countResult) => {
      if (err2) {
        console.error("❌ Count Query Error:", err2);
        return res.status(500).json({ error: err2.message });
      }

      const totalJobs = countResult[0].total;
      const totalPages = Math.ceil(totalJobs / limit);

      res.json({
        jobs: results,
        totalJobs,
        totalPages,
        currentPage: Number(page),
      });
    });
  });
};

// ✅ Get single job details
const getJobById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM jobs WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(results[0]);
  });
};

// ✅ Create a new job
const createJob = (req, res) => {
  const { title, company, location, description, skills } = req.body;

  if (!title || !company || !location || !description || !skills) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "INSERT INTO jobs (title, company, location, description, skills, postedDate) VALUES (?, ?, ?, ?, ?, NOW())";

  db.query(sql, [title, company, location, description, skills], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({
      message: "Job created successfully",
      jobId: result.insertId,
    });
  });
};

module.exports = { getJobs, getJobById, createJob };
