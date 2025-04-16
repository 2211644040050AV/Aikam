import React, { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { motion } from 'framer-motion';

export default function CartContents() {
  // Cart products state
  const [cartProducts, setCartProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 10.00,
      image: "https://picsum.photos/200?random=1",
    },
    {
      id: 2,
      name: "Product 2",
      size: "L",
      color: "Blue",
      quantity: 2,
      price: 20.00,
      image: "https://picsum.photos/200?random=2",
    },
    {
      id: 3,
      name: "Product 3",
      size: "S",
      color: "Green",
      quantity: 1,
      price: 30.00,
      image: "https://picsum.photos/200?random=3",
    },
    {
      id: 4,
      name: "Product 4",
      size: "XL",
      color: "Black",
      quantity: 3,
      price: 40.00,
      image: "https://picsum.photos/200?random=4",
    },
    {
      id: 5,
      name: "Product 5",
      size: "XXL",
      color: "White",
      quantity: 1,
      price: 50.00,
      image: "https://picsum.photos/200?random=5",
    },
  ]);

  // Update quantity
  const updateQuantity = (id, action) => {
    setCartProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id
          ? { ...product, quantity: action === 'increment' ? product.quantity + 1 : product.quantity - 1 }
          : product
      )
    );
  };

  // Remove product from cart with animation
  const removeProduct = (id) => {
    setCartProducts(prevProducts => prevProducts.filter(product => product.id !== id));
  };

  return (
    <motion.div layout>
      {cartProducts.map((product) => (
        <motion.div
          key={product.id}
          className='flex items-start justify-between py-3 border-b'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
        >
          <div className='flex items-start'>
            <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4 rounded' />
            <div>
              <h3>{product.name}</h3>
              <p className='text-sm text-gray-500'>size: {product.size} | color: {product.color}</p>
              <div className='flex items-center mt-2'>
                <button
                  onClick={() => updateQuantity(product.id, 'decrement')}
                  className='border rounded px-3 py-1 text-xl font-medium'
                  disabled={product.quantity <= 1}
                >
                  -
                </button>
                <motion.span
                  className='mx-4'
                  key={product.quantity} // This key ensures the motion transition is triggered on quantity change
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {product.quantity}
                </motion.span>
                <button
                  onClick={() => updateQuantity(product.id, 'increment')}
                  className='border rounded px-3 py-1 text-xl font-medium'
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>₹ {product.price.toLocaleString()}</p>
            <motion.button
              onClick={() => removeProduct(product.id)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <RiDeleteBin6Line className='h-6 w-6 mt-2 text-red-600' />
            </motion.button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
