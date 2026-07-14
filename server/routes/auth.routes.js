
const express = require("express");

const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getProfile,
  updateProfile,
  uploadResume,
} = require("../controllers/auth.controller");

const {
  isAuthenticated,
} = require("../middlewares/authMiddleware");

const upload = require("../middlewares/multer");

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Current User
router.get("/me", isAuthenticated, getCurrentUser);

// Get Profile
router.get("/profile", isAuthenticated, getProfile);

// Update Profile
router.put("/update-profile", isAuthenticated, updateProfile);

// Upload Resume
router.put(
  "/upload-resume",
  isAuthenticated,
  upload.single("resume"),
  uploadResume
);

module.exports = router;

