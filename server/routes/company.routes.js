const express = require("express");

const router = express.Router();

const {
  createCompany,
  getMyCompanies,
  getCompanyById,
  updateCompany,
} = require("../controllers/company.controller");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

// Create Company
router.post(
  "/create",
  isAuthenticated,
  authorizeRoles("recruiter"),
  createCompany
);

// Get My Companies
router.get(
  "/my-companies",
  isAuthenticated,
  authorizeRoles("recruiter"),
  getMyCompanies
);

// Get Company By ID
// ⚠️ Ye route hamesha /my-companies ke BAAD hona chahiye
router.get(
  "/:id",
  isAuthenticated,
  authorizeRoles("recruiter"),
  getCompanyById
);

router.put(
  "/update/:id",
  isAuthenticated,
  authorizeRoles("recruiter"),
  updateCompany
);

module.exports = router;