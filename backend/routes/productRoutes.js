const express = require("express");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

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

    if (!name || !modelNumber || !price) {
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

// Route to get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); 
    res.status(200).json(products); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Route to get a single product by its ID
router.get("/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching product" });
  }
});


module.exports = router;
