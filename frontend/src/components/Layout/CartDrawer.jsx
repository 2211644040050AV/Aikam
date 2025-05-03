import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import CartContents from '../Cart/CartContents'

export default function CartDrawer({ drawerOpen, toggleCartDrawer }) {

  return (
    <div className={`fixed top-0 right-0 w-4/5 sm:w-2/3 md:w-1/2 h-full bg-white shadow-md transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>

      {/* Close Button */}
      <div className='flex items-center justify-between p-4'>
      <h2 className='text-xl font-semibold'>Your Cart</h2>
        <button>
          <IoMdClose className='h-6 w-6 text-gray-700' onClick={toggleCartDrawer} />
        </button>
      </div>
      {/* Cart content with scrollable area  */}
      <div className='flex-grow p-4 overflow-y-auto'>
        {/* <h2 className='text-xl font-semibold mb-4'>Your Cart</h2> */}
        {/* Component for Cart Content */}
        <CartContents />
      </div>
      {/* Checkout */}
      <div className='p-4 bg-white sticky b-0'>
        <button className='w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition'>Checkout</button>
        <p className='text-sm tracking-tighter text-gray-500 mt-2 text-center'>Shipping, taxes, and discount code calculated at checkout.</p>
      </div>
    </div>
  )
}