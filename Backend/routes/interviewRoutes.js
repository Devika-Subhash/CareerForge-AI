const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getQuestions,
  saveInterview,
  getInterviewHistory,
} = require("../controllers/interviewController");

router.get("/questions", protect, getQuestions);

router.post("/", protect, saveInterview);

router.get("/history", protect, getInterviewHistory);

module.exports = router;