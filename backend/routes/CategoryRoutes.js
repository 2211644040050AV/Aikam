const express = require("express");
const Category = require("../models/Category");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create
router.post("/", protect, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Category name required" });

    const category = await Category.create({ name, user: req.user._id });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get All
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
});

// Update
router.put("/:id", protect, async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) return res.status(404).json({ message: "Category not found" });

    category.name = name || category.name;
    const updated = await category.save();

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating category" });
  }
});

// Delete
router.delete("/:id", protect, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    await category.deleteOne();
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category" });
  }
});

module.exports = router;
