const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  try {
    // Cookie se token lena
    const token = req.cookies.token;

    // Token nahi mila
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please Login First",
      });
    }

    // Token verify karna
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User database se nikalna
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // User request me store karna
    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    next();
  };
};
module.exports = {
  isAuthenticated,
  authorizeRoles,
};