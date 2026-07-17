const express = require("express");

const router = express.Router();

const {
  sendMessage,
  getMessages,
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

module.exports = router;