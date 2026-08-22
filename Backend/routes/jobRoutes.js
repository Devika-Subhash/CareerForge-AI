const express = require("express");

const {
  getJobs,
  getJobStats,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get job statistics
router.get("/stats", protect, getJobStats);

// Get all jobs
router.get("/", protect, getJobs);

// Add a new job
router.post("/", protect, createJob);

// Update a job
router.put("/:id", protect, updateJob);

// Delete a job
router.delete("/:id", protect, deleteJob);

module.exports = router;