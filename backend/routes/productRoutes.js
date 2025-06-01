const express = require("express");
const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// CREATE Product (Admins Only)
router.post("/", protect, admin, upload.single("image"), async (req, res) => {
  try {
    const {
      name, modelNumber, brand, category, subcategory, stock, price, discount,
      deliveryCharge, status, description, expiryDate, prescriptionRequired,
      dosageForm, strength, composition, usageInstructions, warnings, sideEffects
    } = req.body;

    const product = new Product({
      name, modelNumber, brand, category, subcategory, stock, price, discount,
      deliveryCharge, status, description, expiryDate,
      prescriptionRequired: prescriptionRequired === 'true',
      dosageForm, strength, composition, usageInstructions, warnings, sideEffects,
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

// READ All Products (Public)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// READ Single Product (Public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE Product (Admins Only)
router.put("/:id", protect, admin, upload.single("image"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const updates = req.body;
    if (req.file) {
      if (product.image?.public_id) {
        await cloudinary.uploader.destroy(product.image.public_id);
      }
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
          Object.assign(product, updates);
          const updatedProduct = await product.save();
          return res.json(updatedProduct);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    } else {
      Object.assign(product, updates);
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during update" });
  }
});

// DELETE Product (Admins Only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.image?.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }

    await product.remove();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during deletion" });
  }
});

module.exports = router;
