const Application = require("../models/Application");
const Job = require("../models/Job");
const Notification = require("../models/Notification");

// ================= APPLY JOB =================
const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    const job = await Job.findById(jobId).populate("company");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const existingApplication = await Application.findOne({
      job: job._id,
      applicant: req.user._id,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const application = await Application.create({
      job: job._id,
      company: job.company._id,
      applicant: req.user._id,
      resume: req.file ? req.file.path : "",
    });

    return res.status(201).json({
      success: true,
      message: "Applied successfully",
      application,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET MY APPLIED JOBS =================
const getAppliedJobs = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user._id,
    })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET JOB APPLICANTS =================
const getJobApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({
      job: jobId,
    })
      .populate("applicant", "fullName email phone profileImage")
      .populate("job", "title")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE APPLICATION STATUS =================
const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const application = await Application.findById(applicationId)
      .populate("job", "title");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.status = status;
    await application.save();

    // ================= CREATE NOTIFICATION =================
    await Notification.create({
      user: application.applicant,
      title: "Application Status Updated",
      message: `Your application for "${application.job.title}" has been ${status}.`,
    });

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  applyJob,
  getAppliedJobs,
  getJobApplicants,
  updateApplicationStatus,
};