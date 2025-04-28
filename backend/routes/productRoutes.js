const express = require("express");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// POST route for creating a new product
router.post("/", protect, async (req, res) => {
  try {
    // Log the incoming request body to debug
    console.log("Request body:", req.body);

    // Destructure fields from the request body
    const {
      name,
      modelNumber,
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

    // Ensure required fields are provided
    if (!name || !modelNumber || !price) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // Create a new product instance
    const product = new Product({
      name,
      modelNumber,
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
      user: req.user._id, // User reference from the logged-in user
    });

    // Save the product to the database
    const createdProduct = await product.save();

    // Send back the created product as a response
    res.status(201).json(createdProduct);

  } catch (error) {
    // Log error and send server error response
    console.error("Error creating product:", error);
    res.status(500).send("Server Error");
  }
});

// Route to get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // Get all products from the database
    res.status(200).json(products); // Respond with the products
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Route to get a single product by its ID
router.get("/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId); // Find product by ID
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product); // Respond with the found product
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching product" });
  }
});


module.exports = router;
