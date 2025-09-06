

const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const { applyJob, getApplications, upload } = require("../controllers/applicationController");

// Candidate or Recruiter apply
router.post("/", upload.single("resume"), applyJob);

// Candidate gets only their apps, recruiter gets all
router.get("/", protect(), getApplications);

module.exports = router;
