const express = require("express");

const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
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

// Get All Jobs
router.get(
  "/",
  isAuthenticated,
  getAllJobs
);

// Get Job By ID
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

router.delete(
  "/delete/:id",
  isAuthenticated,
  authorizeRoles("recruiter"),
  deleteJob
);

module.exports = router;