import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineShoppingCart } from "react-icons/hi";

const MedicineById = () => {
  const [quantity, setQuantity] = useState(1);

  // Hardcoded static product
  const product = {
    name: "Paracetamol 500mg",
    price: 100,
    discount: 20,
    stock: 8,
    brand: "MediLife",
    modelNumber: "P500X",
    category: "Medicine",
    subcategory: "Pain Relief",
    deliveryCharge: 0,
    description: "Paracetamol is used to treat mild to moderate pain and fever. Effective in headaches, muscle aches, and toothaches.",
    image: "https://picsum.photos/500/500?random=21",
  };

  // Calculations
  const price = product.price;
  const discount = product.discount;
  const salePrice = price - (price * discount) / 100;
  const youSave = price - salePrice;

  const increaseQty = () => {
    if (quantity < product.stock && quantity < 5) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="container mt-5 p-4 border rounded shadow bg-white"
    >
      <div className="row">
        {/* Image Section */}
        <div className="col-md-5 text-center mb-4 mb-md-0">
          <motion.img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
            style={{ maxHeight: "320px", objectFit: "contain" }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Info Section */}
        <div className="col-md-7">
          <h2 className="mb-2">{product.name}</h2>

          <div className="mb-3">
            <span className="bg-success text-white px-2 py-1 rounded me-2">
              4.6 <i className="fa fa-star"></i>
            </span>
            <span className="text-muted">Model: {product.modelNumber}</span>
          </div>

          <div className="mb-3">
            <span className="text-success fw-bold fs-5">₹{salePrice.toFixed(2)}</span>
            &nbsp;
            <span className="text-muted text-decoration-line-through">₹{price.toFixed(2)}</span>
            &nbsp;
            <span className="text-danger">{discount}% OFF</span>
            <div className="text-muted">You save ₹{youSave.toFixed(2)}</div>
          </div>

          <div className="mb-2">
            {product.stock > 0 && product.stock <= 10 && (
              <span className="text-danger">Only {product.stock} left in stock!</span>
            )}
            {product.stock > 10 && <span className="text-success">In stock</span>}
            {product.stock <= 0 && <span className="text-warning">Out of stock</span>}
          </div>

          <div className="mb-3">
            <strong>Brand:</strong> {product.brand} <br />
            <strong>Category:</strong> {product.category} <br />
            <strong>Item Type:</strong> {product.subcategory}
          </div>

          <div className="text-primary fw-semibold mb-3">
            Delivery Charges: {product.deliveryCharge ? `₹${product.deliveryCharge}` : "Free"}
          </div>

          <div className="mb-3">
            <h5>Description</h5>
            <p className="text-muted">{product.description}</p>
          </div>

          {/* Quantity Controls */}
          <div className="input-group mb-4" style={{ maxWidth: "140px" }}>
            <button className="btn btn-outline-dark" onClick={decreaseQty}>
              <i className="fa fa-minus-circle"></i>
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="form-control text-center"
            />
            <button className="btn btn-outline-dark" onClick={increaseQty}>
              <i className="fa fa-plus-circle"></i>
            </button>
          </div>

          {/* Buttons */}
          <div className="d-flex gap-3">
            {product.stock > 0 && (
              <Link to="/cart" className="btn btn-warning d-flex align-items-center">
                <HiOutlineShoppingCart className="me-2" /> Add to Cart
              </Link>
            )}
            <Link to="/" className="btn btn-outline-secondary">
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MedicineById;
