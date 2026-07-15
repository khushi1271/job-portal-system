const Notification = require("../models/Notification");

// ================= CREATE NOTIFICATION =================
const createNotification = async (req, res) => {
  try {
    const {
      recipient,
      sender,
      title,
      message,
      type,
      relatedJob,
      relatedApplication,
    } = req.body;

    if (!recipient || !title || !message) {
      return res.status(400).json({
        success: false,
        message: "Recipient, title and message are required",
      });
    }

    const notification = await Notification.create({
      recipient,
      sender,
      title,
      message,
      type,
      relatedJob,
      relatedApplication,
    });

    return res.status(201).json({
      success: true,
      message: "Notification created successfully",
      notification,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET MY NOTIFICATIONS =================
const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user._id,
    })
      .populate("sender", "fullName email")
      .populate("relatedJob", "title")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= MARK AS READ =================
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    notification.isRead = true;

    await notification.save();

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE NOTIFICATION =================
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    await Notification.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createNotification,
  getMyNotifications,
  markAsRead,
  deleteNotification,
};