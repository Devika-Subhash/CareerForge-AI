const Job = require("../models/Job");

// Get all jobs for the logged-in user
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      user: req.userId,
    }).sort({
      createdAt: -1,
    });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch jobs.",
    });
  }
};

// Add a new job
const createJob = async (req, res) => {
  try {
    const { company, position, status } = req.body;

    if (!company || !position) {
      return res.status(400).json({
        message: "Company and position are required.",
      });
    }

    const job = await Job.create({
      user: req.userId,
      company,
      position,
      status,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create job.",
    });
  }
};

// Update a job
const updateJob = async (req, res) => {
  try {
    const { company, position, status } = req.body;

    const job = await Job.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.userId,
      },
      {
        company,
        position,
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
      });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({
      message: "Unable to update job.",
    });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
      });
    }

    res.json({
      message: "Job deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete job.",
    });
  }
};

module.exports = {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
};