const jwt = require("jsonwebtoken");
const User = require('../models/user');

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  // Check if the request has an Authorization header and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using the JWT secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by the ID in the token payload and exclude password
      req.user = await User.findById(decoded.user.id).select("-password");

      // If no user is found with the provided ID
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    // No token provided
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
