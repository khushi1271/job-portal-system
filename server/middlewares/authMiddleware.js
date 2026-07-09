const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  try {
let token = null;

console.log("Authorization Header:", req.headers.authorization);
console.log("Cookies:", req.cookies);

if (
  req.headers.authorization &&
  req.headers.authorization.startsWith("Bearer ")
) {
  token = req.headers.authorization.split(" ")[1];
}

if (!token && req.cookies.token) {
  token = req.cookies.token;
}

console.log("Final Token:", token);

    // 3. Token nahi mila
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please Login First",
      });
    }

    // 4. Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Find User
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

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