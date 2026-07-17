const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["candidate", "recruiter", "admin"],
      default: "candidate",
    },

    profileImage: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    skills: [
      {
        type: String,
      },
    ],

    education: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },
    isBlocked: {
  type: Boolean,
  default: false,
},

profileImage: {
  type: String,
  default: "",
},
  },
  
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);