import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [showChargeDetails, setShowChargeDetails] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: 'Lucknow',
    pincode: '',
    country: 'India',
    phone: '',
  });

  const orderDetails = {
    items: [
      { name: 'Medicine A', brand: 'Brand A', quantity: 2, total: 200, delivery: 20, image: 'https://via.placeholder.com/100' },
      { name: 'Medicine B', brand: 'Brand B', quantity: 1, total: 100, delivery: 10, image: 'https://via.placeholder.com/100' },
    ],
    subTotal: 300,
    deliveryCharges: 30,
    orderTotal: 330,
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const confirmOrder = window.confirm('Are you sure to Place this Order..?');
    if (!confirmOrder) return;
    alert('Order Placed Successfully');
    setOrderSuccess(true);
  };

  if (orderSuccess) {
    return (
      <div className="container mx-auto mt-5">
        <div className="text-right mb-4">
          <button className="bg-gray-800 text-white text-sm px-4 py-2 rounded-md" onClick={() => window.print()}>
            <i className="fa fa-print"></i> Print
          </button>
        </div>
        <div className="text-center">
          <h1><i className="fa fa-check-circle text-green-500"></i></h1>
          <h1 className="text-gray-600 text-3xl">Thank You!</h1>
          <p className="text-lg font-bold">Your Order was Successfully completed</p>
          <p><b>Order ID: <span className="font-normal">ORD123456</span></b></p>
          <p className="text-lg"><b>Expected Delivery within 12 hrs</b></p>
          <a href="/" className="bg-yellow-500 text-white py-2 px-6 rounded-md">BACK TO STORE</a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-2 px-2 tracking-tight">
      {/* Left - Shipping Form */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handlePlaceOrder}>
          <h2 className="text-lg mb-4">Contact Details</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" value="user@example.com" disabled className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed" />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700">First Name</label>
              <input 
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="text-gray-700">Last Name</label>
              <input 
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input 
              type="text"
              value={shippingAddress.address}
              onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700">City</label>
              <input type="text" value="Lucknow" disabled className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed" />
            </div>
            <div>
              <label className="text-gray-700">Pin Code</label>
              <input 
                type="number"
                value={shippingAddress.pincode}
                onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                maxLength={8}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input type="text" value="India" disabled className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input 
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-black text-white py-3 rounded cursor-pointer">
            Continue to Payment
          </button>
        </form>
      </div>

      {/* Right - Order Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {orderDetails.items.map((product, index) => (
            <div key={index} className="flex items-start justify-between py-4 border-b">
              <div className="flex items-start gap-4">
                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded" />
                <div>
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-gray-500 text-sm">{product.brand}</p>
                </div>
              </div>
              <div className="text-right">
                <p>Qty: {product.quantity}</p>
                <p>₹ {product.total}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-md py-2 border-b flex justify-between">
          <span>Subtotal</span>
          <span>₹ {orderDetails.subTotal}</span>
        </div>

        <div className="text-md py-2 border-b flex justify-between">
          <span>Delivery Charges</span>
          <span className="cursor-pointer" onClick={() => setShowChargeDetails(!showChargeDetails)}>
            ₹ {orderDetails.deliveryCharges} <i className={`fa ${showChargeDetails ? 'fa-minus-circle' : 'fa-plus-circle'} ml-2`}></i>
          </span>
        </div>

        {showChargeDetails && (
          <div className="text-sm text-gray-600 mt-2">
            {orderDetails.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.name}</span>
                <span>₹ {item.delivery}</span>
              </div>
            ))}
          </div>
        )}

        <div className="font-bold text-lg py-4 flex justify-between">
          <span>Total</span>
          <span>₹ {orderDetails.orderTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
