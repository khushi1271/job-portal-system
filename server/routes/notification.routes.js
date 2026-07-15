const express = require("express");

const router = express.Router();

const {
  getMyNotifications,
  markAsRead,
} = require("../controllers/notification.controller");

const {
  isAuthenticated,
} = require("../middlewares/authMiddleware");

// Get Logged-in User Notifications
router.get(
  "/",
  isAuthenticated,
  getMyNotifications
);

// Mark Notification as Read
router.put(
  "/:id/read",
  isAuthenticated,
  markAsRead
);

module.exports = router;