const express = require("express");

const router = express.Router();

const {
  createJob,
  getAllJobs,
  getRecruiterJobs,
  getJobById,
  updateJob,
  deleteJob,
  getRecruiterStats
} = require("../controllers/job.controller");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

// Create Job
router.post(
  "/create",
  isAuthenticated,
  authorizeRoles("recruiter"),
  createJob
);

// Recruiter Jobs (IMPORTANT: :id se pehle)
router.get(
  "/recruiter",
  isAuthenticated,
  authorizeRoles("recruiter"),
  getRecruiterJobs
);

// Get All Jobs
router.get(
  "/",
  isAuthenticated,
  getAllJobs
);

// Get Job By ID (Hamesha last me)
router.get(
  "/:id",
  isAuthenticated,
  getJobById
);

// Update Job
router.put(
  "/update/:id",
  isAuthenticated,
  authorizeRoles("recruiter"),
  updateJob
);

// Delete Job
router.delete(
  "/delete/:id",
  isAuthenticated,
  authorizeRoles("recruiter"),
  deleteJob
);

router.get(
  "/recruiter/stats",
  isAuthenticated,
  authorizeRoles("recruiter"),
  getRecruiterStats
);

module.exports = router;