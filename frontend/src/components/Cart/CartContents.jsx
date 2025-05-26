import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { motion } from 'framer-motion';

export default function CartContents() {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);

  // Handle checkout: Confirm user is logged in
  const handleCheckout = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo || !userInfo.token) {
      navigate("/login?redirect=/checkout");
    } else {
      navigate("/checkout");
    }
  };

  // Load cart from localStorage
  const fetchCart = () => {
    try {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      const validCart = storedCart.filter(item => item && item.product);
      setCartProducts(validCart);

      if (storedCart.length !== validCart.length) {
        localStorage.setItem('cart', JSON.stringify(validCart));
      }
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      setCartProducts([]);
      localStorage.removeItem('cart');
    }
  };

  useEffect(() => {
    fetchCart();
    const handleCartUpdated = () => fetchCart();
    window.addEventListener('cart-updated', handleCartUpdated);
    return () => window.removeEventListener('cart-updated', handleCartUpdated);
  }, []);

  // Update quantity
  const updateQuantity = (index, action) => {
    const updatedCart = [...cartProducts];
    const item = updatedCart[index];
    if (!item.product) return;

    if (action === 'increment') item.quantity += 1;
    else if (action === 'decrement' && item.quantity > 1) item.quantity -= 1;

    setCartProducts(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  // Remove item
  const removeProduct = (index) => {
    const updatedCart = cartProducts.filter((_, idx) => idx !== index);
    setCartProducts(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  // Price calculations
  const calculateTotalPrice = () =>
    cartProducts.reduce((total, item) => {
      const discountedPrice = item.product.price - (item.product.price * item.product.discount) / 100;
      return total + discountedPrice * item.quantity;
    }, 0);

  const calculateTotalDiscount = () =>
    cartProducts.reduce((total, item) => {
      const discountAmount = (item.product.price * item.product.discount) / 100;
      return total + discountAmount * item.quantity;
    }, 0);

  const calculateTotalDelivery = () =>
    cartProducts.reduce((total, item) => {
      return total + (item.product.deliveryCharge || 0) * item.quantity;
    }, 0);

  const calculateFinalTotal = () => calculateTotalPrice() + calculateTotalDelivery();

  return (
    <motion.div layout>
      <h2 className="text-2xl sm:text-3xl px-3 py-1">Your Cart</h2>

      {cartProducts.length === 0 ? (
        <div className="w-full h-100 text-3xl text-red-800 flex items-center justify-center">
          <p>
            Your cart is empty.{' '}
            <a href="/collection" className="text-blue-500">Browse Products</a> or{' '}
            <a href="/" className="text-blue-500">Return to Home</a>
          </p>
        </div>
      ) : (
        <>
          {cartProducts.map((item, index) => {
            if (!item.product) return null;
            const discountedPrice = item.product.price - (item.product.price * item.product.discount) / 100;
            const itemTotalPrice = discountedPrice * item.quantity;

            return (
              <div
                key={index}
                className="block m-2 p-2 w-full lg:w-4/5 md:w-full sm:w-full mx-auto"
              >
                <motion.div
                  className="flex items-start justify-between py-4 border-b"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-start">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-auto h-20 sm:h-24 object-cover mx-4 rounded"
                    />
                    <div>
                      <h3 className="text-xl sm:text-base">{item.product.name}</h3>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(index, 'decrement')}
                          className="border rounded px-3 py-1 text-lg sm:text-xl font-medium"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <motion.span
                          className="mx-4"
                          key={item.quantity}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.quantity}
                        </motion.span>
                        <button
                          onClick={() => updateQuantity(index, 'increment')}
                          className="border rounded px-3 py-1 text-lg sm:text-xl font-medium"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-rows-1 sm:grid-cols-2 items-center justify-center my-2 mx-1 gap-4">
                    <p className="text-2xl sm:text-base text-center sm:text-left">
                      ₹ {itemTotalPrice.toLocaleString()}
                    </p>
                    <motion.button
                      onClick={() => removeProduct(index)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="self-center justify-self-center sm:justify-self-end"
                    >
                      <RiDeleteBin6Line className="h-6 w-6 text-red-600" />
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            );
          })}

          {/* Cart Summary */}
          <div className="w-full lg:w-4/5 mx-auto p-4 border-t mt-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-semibold">Total Price (After Discount):</p>
              <p className="text-xl">₹ {calculateTotalPrice().toLocaleString()}</p>
            </div>

            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-semibold">Total Discount:</p>
              <p className="text-xl text-green-600">- ₹ {calculateTotalDiscount().toLocaleString()}</p>
            </div>

            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-semibold">Total Delivery Charges:</p>
              <p className="text-xl">₹ {calculateTotalDelivery().toLocaleString()}</p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="text-2xl font-bold">Final Total:</p>
              <p className="text-2xl font-bold">₹ {calculateFinalTotal().toLocaleString()}</p>
            </div>

            <button
              onClick={handleCheckout}
              className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white px-4 py-2 rounded-lg mt-6 sm:w-full md:w-auto ml-auto block"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}
