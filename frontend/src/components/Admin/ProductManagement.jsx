import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product");
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='max-w-7xl mx-auto p-2'>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <Link
          to="/admin/create-product"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Product
        </Link>
      </div>

      <div className='overflow-auto shadow-md sm:rounded-lg'>
        <table className='min-w-full text-lg text-gray-500'>
          <thead className='bg-gray-100 text-xs uppercase text-gray-800'>
            <tr>
              <th className='py-4 px-4'>Image</th>
              <th className='py-4 px-4'>Name</th>
              <th className='py-4 px-4'>Price</th>
              <th className='py-4 px-4'>Model Number</th>
              <th className='py-4 px-4'>Stock</th>
              <th className='py-4 px-4'>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className='border-b hover:bg-gray-50'>
                  <td className='p-3'>
                    {product.image?.data ? (
                      <img
                        src={`data:${product.image.contentType};base64,${product.image.data}`}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <span className="text-sm text-gray-400">No image</span>
                    )}
                  </td>
                  <td className='p-4 font-medium text-gray-900'>{product.name}</td>
                  <td className='p-3'>₹{product.price}</td>
                  <td className='p-3'>{product.modelNumber}</td>
                  <td className='p-3'>{product.stock}</td>
                  <td className='p-3 flex items-center gap-2'>
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="text-yellow-600 hover:text-yellow-500"
                    >
                      <RiEdit2Line className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-500"
                    >
                      <RiDeleteBin6Line className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className='p-4 text-center' colSpan="6">No products available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
