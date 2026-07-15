const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "application",
        "job",
        "interview",
        "system",
        "profile",
      ],
      default: "system",
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    relatedJob: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },

    relatedApplication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);