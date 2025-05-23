const express = require("express");
const Subcategory = require("../models/Subcategory");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create Subcategory
router.post("/", protect, async (req, res) => {
  try {
    const { name } = req.body;

    // Check if 'name' is provided
    if (!name) {
      return res.status(400).json({ message: "Please provide subcategory name" });
    }

    // Ensure the user is authenticated and has an '_id'
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // Create the subcategory
    const subcategory = await Subcategory.create({
      name,
      user: req.user._id
    });

    // Return the created subcategory
    res.status(201).json(subcategory);

  } catch (error) {
    console.error("Error creating subcategory:", error);
    res.status(500).json({ message: "Error creating subcategory" });
  }
});

// Get All Subcategories
router.get("/", async (req, res) => {
  try {
    const subcategories = await Subcategory.find();
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subcategories" });
  }
});


// Update Subcategory
router.put("/:id", protect, async (req, res) => {
  try {
    const { name } = req.body;
    const subcategory = await Subcategory.findById(req.params.id);
    if (!subcategory) return res.status(404).json({ message: "Subcategory not found" });

    subcategory.name = name || subcategory.name;

    const updated = await subcategory.save();
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating subcategory" });
  }
});

// Delete Subcategory
router.delete("/:id", protect, async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id);
    if (!subcategory) return res.status(404).json({ message: "Subcategory not found" });

    await subcategory.deleteOne();
    res.status(200).json({ message: "Subcategory deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting subcategory" });
  }
});

module.exports = router;
