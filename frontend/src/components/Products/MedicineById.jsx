import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MedicineById = ({ setCartDrawerOpen }) => {
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);

  const navigate = useNavigate();

  const product = {
    id: 21,
    name: "Paracetamol 500mg",
    price: 100,
    discount: 20,
    stock: 8,
    brand: "MediLife",
    modelNumber: "P500X",
    category: "Medicine",
    subcategory: "Pain Relief",
    deliveryCharge: 20,
    description: "Paracetamol is used to treat mild to moderate pain and fever. Effective in headaches, muscle aches, and toothaches.",
    image: "https://picsum.photos/500/500?random=21",
  };

  const price = product.price;
  const discount = product.discount;
  const salePrice = price - (price * discount) / 100;
  const youSave = price - salePrice;

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const already = cart.find((item) => item.product.id === product.id);
    if (already) {
      setIsAlreadyAdded(true);
    }
  }, []);

  const increaseQty = () => {
    if (quantity < product.stock && quantity < 5 && !isAlreadyAdded) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1 && !isAlreadyAdded) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); // important to stop refresh
  
    if (quantity <= 0) {
      toast.error("Please select a valid quantity.");
    } else if (quantity > product.stock) {
      toast.error(`Only ${product.stock} items available in stock.`);
    } else {
      setIsButtonDisabled(true);
  
      const cartItem = { product, quantity, totalPrice: salePrice * quantity }; // Add totalPrice here
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));
  
      toast.success(`${quantity} ${product.name} added to cart.`);
      setIsButtonDisabled(false);
      setIsAlreadyAdded(true);
  
      window.dispatchEvent(new Event("cart-updated")); // Update cart globally
      setCartDrawerOpen(true); // 🚀 Open Cart Drawer here

      navigate("/cart"); // Redirect to cart after adding item
    }
  };

  return (
    <div className="container mx-auto mt-6 mb-6 p-6 border rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/2 text-center mb-6 md:mb-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-80 object-contain transition-transform duration-300 transform hover:scale-105 mb-4"
          />
          <h6 className="text-lg font-semibold">{product.name}</h6>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 md:pl-8">
          <h2 className="text-2xl font-bold mb-3">{product.name}</h2>

          <div className="mb-3 flex items-center gap-2">
            <span className="bg-green-500 text-white py-1 px-2 rounded">
              4.6 <i className="fa fa-star"></i>
            </span>
            <span>| {product.modelNumber}</span>
          </div>

          <div className="mb-3">
            <span className="text-green-600 font-bold text-xl">
              ₹ {salePrice.toFixed(2)}
            </span>
            <span className="line-through text-gray-500 mx-2">
              ₹ {price.toFixed(2)}
            </span>
            <span className="text-red-500 font-semibold">{discount}% OFF</span>
            <div className="text-sm text-gray-600">
              You Save ₹ {youSave.toFixed(2)}
            </div>
          </div>

          {/* Stock Info */}
          <div className="mb-4">
            {product.stock > 0 && product.stock <= 10 && (
              <span className="text-red-600 font-bold">
                Only {product.stock} Left
              </span>
            )}
            {product.stock > 10 && (
              <span className="text-green-600 font-bold">In-Stock</span>
            )}
            {product.stock <= 0 && (
              <span className="text-yellow-600 font-bold">Out of Stock</span>
            )}
          </div>

          {/* Basic Details */}
          <div className="mb-4">
            <strong>Brand:</strong> {product.brand} <br />
            <strong>Category:</strong> {product.category} <br />
            <strong>Item Type:</strong> {product.subcategory}
          </div>

          {/* Delivery Charges */}
          <div className="mb-4 font-semibold">
            Delivery Charges:{" "}
            {product.deliveryCharge ? (
              `₹ ${product.deliveryCharge}`
            ) : (
              <>
                Free <i className="fa fa-thumbs-up text-green-500 ml-1"></i>
              </>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h5 className="text-lg font-semibold mb-1">Description</h5>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center mb-6">
            <button
              onClick={decreaseQty}
              disabled={isAlreadyAdded}
              className={`bg-gray-300 p-2 rounded-l-md ${
                isAlreadyAdded ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"
              }`}
            >
              <i className="fa fa-minus"></i>
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              disabled={isAlreadyAdded}
              className="w-12 text-center p-2 border-t border-b"
            />
            <button
              onClick={increaseQty}
              disabled={isAlreadyAdded}
              className={`bg-gray-300 p-2 rounded-r-md ${
                isAlreadyAdded ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"
              }`}
            >
              <i className="fa fa-plus"></i>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            {isAlreadyAdded ? (
              <button
                disabled
                className="bg-green-500 text-white p-3 rounded-md flex items-center justify-center cursor-not-allowed"
              >
                <i className="fa fa-check mr-2"></i> Already in Cart
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={isButtonDisabled}
                className={`bg-yellow-500 text-white p-3 rounded-md flex items-center justify-center ${
                  isButtonDisabled
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-yellow-400 hover:text-white"
                }`}
              >
                {isButtonDisabled ? (
                  "Adding..."
                ) : (
                  <>
                    <i className="fa fa-cart-plus mr-2"></i> Add to Cart
                  </>
                )}
              </button>
            )}

            <Link
              to="/place-order"
              className="bg-blue-500 hover:bg-blue-400 text-white p-3 rounded-md flex items-center justify-center"
            >
              <i className="fa fa-bolt mr-2"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineById;
