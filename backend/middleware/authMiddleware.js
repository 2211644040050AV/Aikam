const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Protect middleware
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];
    if (!token || token.split('.').length !== 3) {
      return res.status(401).json({ message: "Malformed token" });
    }

    console.log("Incoming Token:", token); // 👈 Temporary log for debugging

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!user.role) {
      return res.status(400).json({ message: "User role is not defined" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

module.exports = { protect, admin };
