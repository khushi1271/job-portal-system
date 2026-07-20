const Message = require("../models/Message");

// ================= SEND MESSAGE =================
const sendMessage = async (req, res) => {
  try {
    const { receiver, text } = req.body;

    if (!receiver || !text) {
      return res.status(400).json({
        success: false,
        message: "Receiver and message are required",
      });
    }

    let message = await Message.create({
      sender: req.user._id,
      receiver,
      text,
    });

    // Populate sender details
    message = await message.populate("sender", "fullName");

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      messageData: message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET MESSAGES =================
const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        {
          sender: req.user._id,
          receiver: userId,
        },
        {
          sender: userId,
          receiver: req.user._id,
        },
      ],
    })
      .populate("sender", "fullName")
      .populate("receiver", "fullName")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= MARK AS SEEN =================
const markAsSeen = async (req, res) => {
  try {
    const { userId } = req.params;

    await Message.updateMany(
      {
        sender: userId,
        receiver: req.user._id,
        seen: false,
      },
      {
        $set: {
          seen: true,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Messages marked as seen",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET CONVERSATIONS =================
const getConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    const messages = await Message.find({
      $or: [
        { sender: userId },
        { receiver: userId },
      ],
    })
      .populate("sender", "fullName")
      .populate("receiver", "fullName")
      .sort({ updatedAt: -1 });

    const conversationMap = new Map();

    messages.forEach((msg) => {
      const otherUser =
        msg.sender._id.toString() === userId.toString()
          ? msg.receiver
          : msg.sender;

      if (!conversationMap.has(otherUser._id.toString())) {
        conversationMap.set(otherUser._id.toString(), {
          user: otherUser,
          lastMessage: msg.text,
          updatedAt: msg.updatedAt,
        });
      }
    });

    return res.status(200).json({
      success: true,
      conversations: Array.from(conversationMap.values()),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET UNREAD COUNT =================
const getUnreadCounts = async (req, res) => {
  try {
    const userId = req.user._id;

    const unread = await Message.aggregate([
      {
        $match: {
          receiver: userId,
          seen: false,
        },
      },
      {
        $group: {
          _id: "$sender",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      unread,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= CLEAR CHAT =================
const clearChat = async (req, res) => {
  try {
    const { receiverId } = req.params;

    await Message.deleteMany({
      $or: [
        { sender: req.user._id, receiver: receiverId },
        { sender: receiverId, receiver: req.user._id },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Chat cleared successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE SINGLE MESSAGE =================
const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // Sirf sender hi apna message delete kar sakta hai
    if (message.sender.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this message",
      });
    }

    await Message.findByIdAndDelete(messageId);

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  markAsSeen,
  getConversations,
  getUnreadCounts,
  clearChat,
  deleteMessage,
};

