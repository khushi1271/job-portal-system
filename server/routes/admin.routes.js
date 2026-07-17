const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  toggleBlockUser,
} = require("../controllers/admin.controller");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

// Get All Users
router.get(
  "/users",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);

// Block / Unblock User
router.put(
  "/users/:id/block",
  isAuthenticated,
  authorizeRoles("admin"),
  toggleBlockUser
);

module.exports = router;