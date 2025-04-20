import React, { useEffect, useState } from 'react';

export default function MyOrder() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            const mockOrders = [
                {
                    _id: "1234",
                    createdAt: new Date(),
                    shippingAddress: { city: "New York", country: "USA" },
                    orderItems: [
                        {
                            name: "Product 1",
                            Image: "https://picsum.photos/500/500?random=1"
                        }
                    ],
                    totalPrice: 100,
                    isPaid: true
                },
                {
                    _id: "223",
                    createdAt: new Date(),
                    shippingAddress: { city: "Los Angeles", country: "USA" },
                    orderItems: [
                        {
                            name: "Product 2",
                            Image: "https://picsum.photos/500/500?random=2"
                        }
                    ],
                    totalPrice: 150,
                    isPaid: false
                },
                {
                    _id: "456",
                    createdAt: new Date(),
                    shippingAddress: { city: "Chicago", country: "USA" },
                    orderItems: [
                        {
                            name: "Product 3",
                            Image: "https://picsum.photos/500/500?random=3"
                        }
                    ],
                    totalPrice: 200,
                    isPaid: true
                },
            ];

            setOrders(mockOrders);
        }, 1000);
    }, []);

    return (
        <div className='max-w-7xl mx-auto p-4 ms:p-6'>
            <h2 className="text-xl sm:text-2xl font-bold mb-6">My Order</h2>
            <div className="relative shadow-md sm:rounded-lg overflow-hidden">
                <table className="min-w-full text-left text-gray-500">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                        <tr>
                            <th className="py-2 px-4 sm:py-3">Image</th>
                            <th className="py-2 px-4 sm:py-3">Order Id</th>
                            <th className="py-2 px-4 sm:py-3">Created</th>
                            <th className="py-2 px-4 sm:py-3">Shipping Address</th>
                            <th className="py-2 px-4 sm:py-3">Items</th>
                            <th className="py-2 px-4 sm:py-3">Price</th>
                            <th className="py-2 px-4 sm:py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id} className="border-b hover:border-gray-300 cursor-pointer">
                                    <td className="px-2 py-2 sm:py-4 sm:px-4">
                                        <img
                                            src={order.orderItems[0].Image}
                                            alt={order.orderItems[0].name}
                                            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                                        />
                                    </td>
                                    <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap'>
                                        #{order._id}
                                    </td>
                                    <td className='py-2 px-2 sm:py-4 sm:px-4'>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className='py-2 px-2 sm:py-4 sm:px-4'>
                                        {order.shippingAddress.city}, {order.shippingAddress.country}
                                    </td>
                                    <td className='py-2 px-2 sm:py-4 sm:px-4'>
                                        {order.orderItems.map((item, idx) => (
                                            <div key={idx}>{item.name}</div>
                                        ))}
                                    </td>
                                    <td className='py-2 px-2 sm:py-4 sm:px-4'>
                                    ₹{order.totalPrice.toFixed(2)}
                                    </td>
                                    <td className='py-2 px-2 sm:py-4 sm:px-4'>
                                        {order.isPaid ? (
                                            <span className="text-green-600 font-semibold">Paid</span>
                                        ) : (
                                            <span className="text-red-500 font-semibold">Not Paid</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-4 py-4 text-gray-500 text-center" colSpan="7">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
