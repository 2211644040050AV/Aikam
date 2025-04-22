const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  modelNumber: { type: String },
  brand: { type: String },
  category: { type: String },
  subcategory: { type: String },
  stock: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  deliveryCharge: { type: Number, default: 0 },
  status: { type: Boolean, default: true },
  description: { type: String },
  image: { type: String, require: true },
  expiryDate: { type: Date },
  prescriptionRequired: { type: Boolean, default: false },
  dosageForm: { type: String },
  strength: { type: String },
  composition: [String],
  usageInstructions: { type: String },
  warnings: { type: String },
  sideEffects: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema)