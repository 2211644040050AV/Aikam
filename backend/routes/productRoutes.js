const express = require("express");
const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", protect, upload.single("image"), async (req, res) => {
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
      expiryDate,
      prescriptionRequired: prescriptionRequired === 'true',
      dosageForm,
      strength,
      composition,
      usageInstructions,
      warnings,
      sideEffects,
      user: req.user._id,
    });

    if (req.file) {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return res.status(500).json({ message: "Cloudinary upload failed" });
          }

          product.image = {
            url: result.secure_url,
            public_id: result.public_id,
          };

          const createdProduct = await product.save();
          return res.status(201).json(createdProduct);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    } else {
      const createdProduct = await product.save();
      res.status(201).json(createdProduct);
    }
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching product" });
  }
});

module.exports = router;
