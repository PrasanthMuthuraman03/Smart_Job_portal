const express = require("express");
const router = express.Router();
const { getJobs, getJobById, createJob } = require("../controllers/jobController");

// Routes
router.get("/", getJobs);         // GET /jobs
router.get("/:id", getJobById);   // GET /jobs/:id
router.post("/", createJob);      // POST /jobs

module.exports = router;
