const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create and save new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Create JWT token payload
    const payload = { user: { id: newUser._id, role: newUser.role } };

    // Generate JWT token
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" }, (err, token) => {
      if (err) {
        console.error("Token generation error:", err);
        return res.status(500).json({ message: "Error generating token" });
      }

      // Send response with user data and JWT token
      res.status(201).json({
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        token,
      });
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Create JWT token payload
    const payload = { user: { id: user._id, role: user.role } };

    // Generate JWT token
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" }, (err, token) => {
      if (err) {
        console.error("Token generation error:", err);
        return res.status(500).json({ message: "Error generating token" });
      }

      // Send response with user data and JWT token
      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Profile route - Requires authentication (protect middleware)
router.get("/profile", protect, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized, no user data" });
  }

  try {
    // Send user profile data
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
    