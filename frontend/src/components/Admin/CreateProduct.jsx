import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InputField({ label, name, value, onChange, type = 'text' }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    name: '',
    modelNumber: '',
    brand: '',
    category: '',
    subcategory: '',
    image: '',
    stock: '',
    price: '',
    discount: '',
    deliveryCharge: '',
    expiryDate: '',
    dosageForm: '',
    strength: '',
    composition: '',
    usageInstructions: '',
    warnings: '',
    sideEffects: '',
    description: '',
    prescriptionRequired: false,
    status: true,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const [brandRes, categoryRes, subcategoryRes] = await Promise.all([
        axios.get('http://localhost:9000/api/brands'),
        axios.get('http://localhost:9000/api/categories'),
        axios.get('http://localhost:9000/api/subcategories'),
      ]);

      setBrands(brandRes.data || []);
      setCategories(categoryRes.data || []);
      setSubcategories(subcategoryRes.data || []);
    } catch (err) {
      console.error('Error fetching options:', err);
    }
  };

  const handleChange = async (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      const file = files[0];

      if (!file) {
        setFormData((prev) => ({ ...prev, image: '' }));
        setImagePreview(null);
        return;
      }

      // Validate allowed image types
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG and PNG images are allowed.');
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'aikam_preset'); // Make sure this preset allows JPG/PNG uploads

      try {
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/dxufc1uiy/image/upload',
          data
        );

        setFormData((prev) => ({ ...prev, image: res.data.secure_url }));
        setImagePreview(res.data.secure_url);
      } catch (err) {
        console.error('Cloudinary upload error:', err.response?.data || err.message);
        alert('Image upload failed. Please check your Cloudinary preset settings.');
        setFormData((prev) => ({ ...prev, image: '' }));
        setImagePreview(null);
      } finally {
        setUploading(false);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        ...(name === 'category' ? { subcategory: '' } : {}),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token'); // get real token from storage
  
    if (!token) {
      alert('You are not authenticated. Please login first.');
      return;
    }
  
    try {
      const res = await axios.post('http://localhost:9000/api/products', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      alert('Product created successfully!');
      console.log(res.data);
    } catch (err) {
      console.error('Product creation failed:', err);
      if (err.response?.status === 401) {
        alert('Unauthorized: Please login again.');
      } else {
        alert('Product creation failed! Please try again.');
      }
    }
  };
  

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <div className="p-3 bg-white shadow rounded-lg mb-8">
        <form onSubmit={handleSubmit}>
          <InputField label="Product Name" name="name" value={formData.name} onChange={handleChange} />
          <InputField label="Model Number" name="modelNumber" value={formData.modelNumber} onChange={handleChange} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700">Brand</label>
              <select name="brand" value={formData.brand} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="">Select a brand</option>
                {brands.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Subcategory</label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select a subcategory</option>
                {subcategories.map((sc) => (
                  <option key={sc._id} value={sc._id}>
                    {sc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              name="image"
              className="w-full p-2 border rounded"
              disabled={uploading}
            />
            {uploading && <p className="text-sm text-blue-500">Uploading image...</p>}
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Preview" className="w-40 h-40 object-cover rounded border" />
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, image: '' }));
                    setImagePreview(null);
                  }}
                  className="mt-1 text-sm text-red-500"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Stock" name="stock" value={formData.stock} onChange={handleChange} />
            <InputField label="Price" name="price" value={formData.price} onChange={handleChange} />
            <InputField label="Discount" name="discount" value={formData.discount} onChange={handleChange} />
            <InputField label="Delivery Charges" name="deliveryCharge" value={formData.deliveryCharge} onChange={handleChange} />
            <InputField type="date" label="Expiry Date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} />
            <InputField label="Dosage Form" name="dosageForm" value={formData.dosageForm} onChange={handleChange} />
            <InputField label="Strength" name="strength" value={formData.strength} onChange={handleChange} />
            <InputField label="Composition" name="composition" value={formData.composition} onChange={handleChange} />
            <InputField label="Usage Instructions" name="usageInstructions" value={formData.usageInstructions} onChange={handleChange} />
            <InputField label="Warnings" name="warnings" value={formData.warnings} onChange={handleChange} />
            <InputField label="Side Effects" name="sideEffects" value={formData.sideEffects} onChange={handleChange} />
          </div>

          <div className="mb-4 mt-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="prescriptionRequired"
                checked={formData.prescriptionRequired}
                onChange={handleChange}
              />
              <span>Prescription Required</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="status" checked={formData.status} onChange={handleChange} />
              <span>{formData.status ? 'Active' : 'Inactive'}</span>
            </label>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
