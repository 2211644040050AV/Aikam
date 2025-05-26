import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const MedicineById = ({ setCartDrawerOpen }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:9000/api/products/${id}`);
        console.log("Fetched product data:", data);
        // Adjust this based on your API shape:
        setProduct(data.product || data);
      } catch (err) {
        toast.error("Product not found.");
        navigate("/collection");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  // Check if already in cart
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const alreadyInCart = cart.some((item) => item.product._id === id);
    setIsAlreadyAdded(alreadyInCart);
  }, [id]);

  // Quantity & Price Calculation
  const price = Number(product?.price || 0);
  const discount = Number(product?.discount || 0);
  const salePrice = price - (price * discount) / 100;
  const youSave = price - salePrice;
  const totalPrice = salePrice * quantity;

  const increaseQty = () => {
    if (quantity < Math.min(product.stock, 5)) {
      setQuantity((q) => q + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (quantity <= 0) return toast.error("Invalid quantity.");
    if (quantity > product.stock)
      return toast.error(`Only ${product.stock} items available.`);

    setIsButtonDisabled(true);

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ product, quantity, totalPrice });
    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success(`${quantity} ${product.name} added to cart.`);
    setIsAlreadyAdded(true);
    setCartDrawerOpen(true);
    window.dispatchEvent(new Event("cart-updated"));
    navigate("/cart");
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!product) return <div className="p-6">Product not found.</div>;

  // Fix image URL (prepend backend URL if relative path)
  const imageUrl = product.image?.url
    ? product.image.url.startsWith("http")
      ? product.image.url
      : `http://localhost:9000${product.image.url}`
    : "/placeholder.png";

  return (
    <div className="container mx-auto mt-6 mb-6 p-6 border rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row">
        {/* Left: Image */}
        <div className="md:w-1/2 text-center mb-6 md:mb-0">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full max-h-80 object-contain"
          />
          <h6 className="text-lg font-semibold mt-2">{product.name}</h6>
        </div>

        {/* Right: Info */}
        <div className="md:w-1/2 md:pl-8">
          <h2 className="text-2xl font-bold mb-3">{product.name}</h2>

          <div className="mb-2">
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
            <div className="text-sm text-gray-600">
              Total Price: ₹ {totalPrice.toFixed(2)}
            </div>
          </div>

          {/* Stock Indicator */}
          <div className="mb-2">
            {product.stock <= 0 ? (
              <span className="text-yellow-600 font-bold">Out of Stock</span>
            ) : product.stock <= 10 ? (
              <span className="text-red-600 font-bold">
                Only {product.stock} Left
              </span>
            ) : (
              <span className="text-green-600 font-bold">In Stock</span>
            )}
          </div>

          {/* Product Details */}
          <div className="mb-2 text-sm">
            <strong>Brand:</strong> {product.brand} <br />
            <strong>Model:</strong> {product.modelNumber} <br />
            <strong>Type:</strong> {product.subcategory}
          </div>

          <div className="mb-2">
            Delivery Charges:{" "}
            {product.deliveryCharge ? `₹ ${product.deliveryCharge}` : "Free"}
          </div>

          <div className="mb-4 text-sm">
            <strong>Description:</strong>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center mb-4">
            <button
              onClick={decreaseQty}
              disabled={quantity <= 1}
              className="bg-gray-300 p-2 rounded-l-md"
            >
              <i className="fa fa-minus" />
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="w-12 text-center p-2 border-t border-b"
            />
            <button
              onClick={increaseQty}
              disabled={quantity >= product.stock || quantity >= 5}
              className="bg-gray-300 p-2 rounded-r-md"
            >
              <i className="fa fa-plus" />
            </button>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4">
            {isAlreadyAdded ? (
              <button disabled className="bg-green-500 text-white p-3 rounded-md">
                <i className="fa fa-check mr-2" /> Already in Cart
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={isButtonDisabled}
                className={`bg-yellow-500 text-white p-3 rounded-md ${isButtonDisabled ? "opacity-50" : "hover:bg-yellow-400"
                  }`}
              >
                {isButtonDisabled ? (
                  "Adding..."
                ) : (
                  <>
                    <i className="fa fa-cart-plus mr-2" /> Add to Cart
                  </>
                )}
              </button>
            )}

            <button
              onClick={() => {
                const userInfo = JSON.parse(localStorage.getItem("userInfo"));

                if (!userInfo || !userInfo.token) {
                  toast.error("Please login before proceeding to checkout.");
      navigate("/login?redirect=/checkout");
                  return;
                }

                if (product.stock <= 0) {
                  toast.error("This product is out of stock. Cannot proceed to checkout.");
                  return;
                }

                navigate("/checkout");
              }}
              disabled={product.stock <= 0}
              className={`bg-blue-500 text-white p-3 rounded-md text-center ${product.stock <= 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-400"
                }`}
            >
              Proceed to Checkout
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default MedicineById;
