const Interview = require("../models/Interview");

const questionBank = {
  react: [
    "What is React and why is it used?",
    "What is the difference between props and state?",
    "Explain the useEffect hook.",
    "What is the Virtual DOM?",
    "How does React handle component re-rendering?",
  ],

  frontend: [
    "What is the difference between HTML, CSS, and JavaScript?",
    "What is responsive web design?",
    "What is the difference between let, const, and var?",
    "What is the DOM?",
    "What are REST APIs and how are they used in frontend applications?",
  ],

  backend: [
    "What is Node.js and why is it used?",
    "What is Express.js?",
    "What is middleware in Express.js?",
    "What is a REST API?",
    "How does authentication using JWT work?",
  ],

  node: [
    "What is Node.js?",
    "What is the event loop in Node.js?",
    "What is Express.js?",
    "What is middleware?",
    "How would you handle errors in an Express application?",
  ],

  fullstack: [
    "Explain the MERN stack.",
    "What is the difference between frontend and backend development?",
    "How does React communicate with an Express backend?",
    "What is MongoDB and why is it used?",
    "Explain JWT authentication in a full-stack application.",
  ],

  python: [
    "What are the main features of Python?",
    "What is the difference between a list and a tuple?",
    "What are Python dictionaries?",
    "What is object-oriented programming in Python?",
    "How is exception handling done in Python?",
  ],

  general: [
    "Tell me about yourself.",
    "Why are you interested in this role?",
    "What are your strengths?",
    "Describe a challenging project you worked on.",
    "Where do you see yourself in the next five years?",
  ],
};


// GET INTERVIEW QUESTIONS
const getQuestions = (req, res) => {
  try {
    const { jobRole } = req.query;

    if (!jobRole || !jobRole.trim()) {
      return res.status(400).json({
        message: "Job role is required.",
      });
    }

    const role = jobRole.toLowerCase();

    let category = "general";

    if (role.includes("react")) {
      category = "react";
    } else if (
      role.includes("frontend") ||
      role.includes("front end")
    ) {
      category = "frontend";
    } else if (
      role.includes("full stack") ||
      role.includes("fullstack") ||
      role.includes("mern")
    ) {
      category = "fullstack";
    } else if (
      role.includes("backend") ||
      role.includes("back end")
    ) {
      category = "backend";
    } else if (role.includes("node")) {
      category = "node";
    } else if (role.includes("python")) {
      category = "python";
    }

    res.json({
      jobRole,
      category,
      questions: questionBank[category],
    });
  } catch (error) {
    console.error("Interview questions error:", error);

    res.status(500).json({
      message: "Unable to fetch interview questions.",
    });
  }
};


// SAVE INTERVIEW
const saveInterview = async (req, res) => {
  try {
    const { jobRole, questions, score } = req.body;

    if (!jobRole || !questions || score === undefined) {
      return res.status(400).json({
        message: "Job role, questions and score are required.",
      });
    }

    if (!Array.isArray(questions)) {
      return res.status(400).json({
        message: "Questions must be an array.",
      });
    }

    // authMiddleware stores the logged-in user's ID in req.userId
    if (!req.userId) {
      return res.status(401).json({
        message: "User authentication information is missing.",
      });
    }

    const interview = await Interview.create({
      user: req.userId,
      jobRole,
      questions,
      score,
    });

    res.status(201).json({
      message: "Interview saved successfully.",
      interview,
    });
  } catch (error) {
    console.error("Save interview error:", error);

    res.status(500).json({
      message: "Unable to save interview.",
      error: error.message,
    });
  }
};


// GET INTERVIEW HISTORY
const getInterviewHistory = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "User authentication information is missing.",
      });
    }

    const interviews = await Interview.find({
      user: req.userId,
    }).sort({ createdAt: -1 });

    res.json({
      interviews,
    });
  } catch (error) {
    console.error("Get interview history error:", error);

    res.status(500).json({
      message: "Unable to fetch interview history.",
      error: error.message,
    });
  }
};


module.exports = {
  getQuestions,
  saveInterview,
  getInterviewHistory,
};