const express = require("express");

const router = express.Router();

const {
  sendMessage,
  getMessages,
  markAsSeen,
  getConversations,
  getUnreadCounts,
} = require("../controllers/message.controller");

const {
  isAuthenticated,
} = require("../middlewares/authMiddleware");

// ================= SEND MESSAGE =================
router.post(
  "/send",
  isAuthenticated,
  sendMessage
);

// ================= GET CHAT MESSAGES =================
router.get(
  "/:userId",
  isAuthenticated,
  getMessages
);

// ================= MARK AS SEEN =================
router.put(
  "/seen/:userId",
  isAuthenticated,
  markAsSeen
);

// ================= GET CONVERSATIONS =================
router.get(
  "/conversations",
  isAuthenticated,
  getConversations
);

// ================= GET UNREAD COUNTS =================
router.get(
  "/unread",
  isAuthenticated,
  getUnreadCounts
);

module.exports = router;