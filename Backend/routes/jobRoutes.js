const express = require("express");

const {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getJobs);

router.post("/", protect, createJob);

router.put("/:id", protect, updateJob);

router.delete("/:id", protect, deleteJob);

module.exports = router;