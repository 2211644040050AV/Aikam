const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  modelNumber: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  stock: Number,
  price: { type: Number, required: true },
  discount: Number,
  deliveryCharge: Number,
  status: Boolean,
  description: String,
  image: String,
  expiryDate: Date,
  prescriptionRequired: Boolean,
  dosageForm: String,
  strength: String,
  composition: String,
  usageInstructions: String,
  warnings: String,
  sideEffects: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
