const Job = require("../models/Job");
const Company = require("../models/Company");

// ================= CREATE JOB =================
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      experience,
      location,
      jobType,
      position,
      company,
    } = req.body;

    // Validation
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !experience ||
      !location ||
      !company
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check Company
    const existingCompany = await Company.findById(company);

    if (!existingCompany) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Create Job
    const job = await Job.create({
      title,
      description,
      requirements,
      salary,
      experience,
      location,
      jobType,
      position,
      company,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL JOBS =================
const getAllJobs = async (req, res) => {
  try {
    const { keyword, location, experience, jobType } = req.query;

    let filter = {};

    // Keyword Search
    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    // Location Filter
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    // Experience Filter
    if (experience) {
      filter.experience = Number(experience);
    }

    // Job Type Filter
    if (jobType) {
      filter.jobType = jobType;
    }

    const jobs = await Job.find(filter)
      .populate("company")
      .populate("createdBy", "fullName email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET JOB BY ID =================
const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id)
      .populate("company")
      .populate("createdBy", "fullName email");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE JOB =================
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      requirements,
      salary,
      experience,
      location,
      jobType,
      position,
    } = req.body;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    job.title = title || job.title;
    job.description = description || job.description;
    job.requirements = requirements || job.requirements;
    job.salary = salary || job.salary;
    job.experience = experience || job.experience;
    job.location = location || job.location;
    job.jobType = jobType || job.jobType;
    job.position = position || job.position;

    await job.save();

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE JOB =================
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await Job.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRecruiterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      createdBy: req.user._id,
    })
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createJob,
  getAllJobs,
  getRecruiterJobs,
  getJobById,
  updateJob,
  deleteJob,
};