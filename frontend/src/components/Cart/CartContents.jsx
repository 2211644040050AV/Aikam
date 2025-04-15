import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { motion } from 'framer-motion'

export default function CartContents() {

  const cartProducts = [
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
  ]

  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.8 }} 
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    viewport={{ once: true }}>
      {
        cartProducts.map ((product, index) => (
          <div key={product.id} className='flex items-start justify-between py-3 border-b '>
            <div className='flex items-start'>
              <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4 rounded' />
              <div>
                <h3>{product.name}</h3>
                <p className='text-sm text-gray-500'>size: {product.size} | color: {product.color}</p>
                <div className='flex items-center mt-2'>
                  <button className='border rounded px-3 py-1 text-xl font-medium '>-</button>
                  <span className='mx-4'>{product.quantity}</span>
                  <button className='border rounded px-3 py-1 text-xl font-medium '>+</button>
                </div>
              </div>
            </div>
            <div>
            <p>₹ {product.price.toLocaleString()}</p>
            <button>
              <RiDeleteBin6Line className='h-6 w-6 mt-2 text-red-600' />
            </button>
            </div>
          </div>
        ))
      }      
    </motion.div>
  )
}
