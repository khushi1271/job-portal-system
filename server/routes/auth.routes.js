const express = require("express");

const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getProfile,
} = require("../controllers/auth.controller");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/me", isAuthenticated, (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});

router.get("/me", isAuthenticated, getCurrentUser);

module.exports = router;