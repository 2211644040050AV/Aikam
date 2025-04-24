const express = require("express");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   POST /api/products
// @desc    Create a new product
// @access  Private
router.post("/", protect, async (req, res) => {
  console.log("Request body:", req.body);  // Add this line to log the body
  try {
    const {
      name,
      modelNumber,
      brand,
      category,
      subcategory,
      stock,
      price,
      discount,
      deliveryCharge,
      status,
      description,
      image,
      expiryDate,
      prescriptionRequired,
      dosageForm,
      strength,
      composition,
      usageInstructions,
      warnings,
      sideEffects,
    } = req.body;

    // Validation (optional but good practice)
    if (!name || !modelNumber || !brand || !category || !price) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const product = new Product({
      name,
      modelNumber,
      brand,
      category,
      subcategory,
      stock,
      price,
      discount,
      deliveryCharge,
      status,
      description,
      image,
      expiryDate,
      prescriptionRequired,
      dosageForm,
      strength,
      composition,
      usageInstructions,
      warnings,
      sideEffects,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);

  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
