const express = require("express");
const router = express.Router();
const { getJobs, getJobById, createJob } = require("../controllers/jobController");
const protect = require("../middleware/authMiddleware");

router.get("/", getJobs);
router.get("/:id", getJobById);

// ✅ Only recruiters can create jobs
router.post("/", protect(["recruiter"]), createJob);

module.exports = router;
