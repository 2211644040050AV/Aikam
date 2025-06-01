const express = require("express");
const User = require("../models/user");
const { protect, admin } = require("../middleware/authMiddleware");
const { route } = require("./userRoutes");

const router = express.Router();

router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ name, email, password, role: role || "customer" });
    await user.save();

    const { password: _, ...userData } = user.toObject();

    res.status(201).json({ message: "User created", user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:id",protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = res.body.name || user.name;
      user.email = res.body.email || user.email;
      user.role = res.body.role || user.role;
    }
    const updateUser = await user.save();
    res.json({message: "User updated successfully", user: updateUser});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server Error"});
  }
})

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({message: "User deleted successfully"});
    } else {
      res.status(404).json({message: "User not found"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server Error"});
  }
})


module.exports = router;
