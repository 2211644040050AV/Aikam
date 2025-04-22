const express = require("express");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to create a new product
router.post("/", protect, async (req, res) => {
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
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
