const express = require('express');
const Brand = require('../models/Brand');
const { protect } = require('../middleware/authMiddleware');  // Optional: If you have authentication middleware

const router = express.Router();

// Create a Brand
router.post('/', protect, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Please provide brand name' });
    }

    const brand = new Brand({
      name,
      user: req.user._id,
    });

    const createdBrand = await brand.save();
    res.status(201).json(createdBrand);
  } catch (error) {
    console.error('Error creating brand:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get All
router.get("/", async (req, res) => {
  try {
    const brands = await Brand.find(); // Correct reference to the model
    res.status(200).json(brands);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching brands" });
  }
});

module.exports = router;
