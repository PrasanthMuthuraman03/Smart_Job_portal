const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./models/db"); // Import DB connection
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ API routes with /api prefix
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

console.log("✅ API routes mounted with /api prefix");

// ✅ Serve uploaded resumes
app.use("/uploads", express.static("uploads"));

// ✅ Test API
app.get("/", (req, res) => {
  res.send("Smart Job Portal Backend Running ✅");
});

// ✅ Test DB API
app.get("/api/test-db", (req, res) => {
  db.query("SHOW TABLES", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
