const express = require("express");

const router = express.Router();

const {
  applyJob,
  getAppliedJobs,
  getJobApplicants,
  updateApplicationStatus,
} = require("../controllers/application.controller");

const upload = require("../middlewares/multer");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

// Apply Job
router.post(
  "/apply",
  isAuthenticated,
  authorizeRoles("candidate"),
  upload.single("resume"),
  applyJob
);

// Candidate - Get My Applications
router.get(
  "/my-applications",
  isAuthenticated,
  authorizeRoles("candidate"),
  getAppliedJobs
);

// Recruiter - Get Applicants of a Job
router.get(
  "/job/:jobId",
  isAuthenticated,
  authorizeRoles("recruiter"),
  getJobApplicants
);

// Recruiter - Update Application Status
router.put(
  "/status/:applicationId",
  isAuthenticated,
  authorizeRoles("recruiter"),
  updateApplicationStatus
);

module.exports = router;