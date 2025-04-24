import React, { useState, useEffect } from 'react';
import BrandModal from '../Modals/BrandModal';
import CategoryModal from '../Modals/CategoryModal';
import SubcategoryModal from '../Modals/SubcategoryModal';

export default function CreateProduct() {

  useEffect(() => {
    setBrands([{ _id: 1, name: "Cipla" }]);
    setCategories([{ _id: 1, name: "Tablets" }]);
    setSubcategories([{ _id: 1, name: "Pain Relief" }]);
  }, []);


  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);
  const [brandSearch, setBrandSearch] = useState('');

  const [formData, setFormData] = useState({
    name: "",
    modelNumber: "",
    brand: "",
    category: "",
    subcategory: "",
    stock: "",
    price: "",
    discount: "",
    deliveryCharge: "",
    status: false,
    description: "",
    image: null,
    expiryDate: "",
    prescriptionRequired: false,
    dosageForm: "",
    strength: "",
    composition: "",
    usageInstructions: "",
    warnings: "",
    sideEffects: "",
  });

  useEffect(() => {
    setBrands([{ _id: 1, name: "Cipla" }, { _id: 2, name: "Sun Pharma" }, { _id: 3, name: "Pfizer" }]);
    setCategories([{ _id: 1, name: "Tablets" }]);
    setSubcategories([{ _id: 1, name: "Pain Relief" }]);
  }, []);

  const filteredBrands = brands
    .filter(b => b.name.toLowerCase().includes(brandSearch.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      if (file) {
        setImagePreview(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <div className='p-3 bg-white shadow rounded-lg mb-8'>
        <form onSubmit={handleSubmit}>
          {/* Name & Model */}
          <div className="mb-4">
            <label className="block text-gray-700">Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className='w-full p-2 border rounded' required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Model Number</label>
            <input type="text" name="modelNumber" value={formData.modelNumber} onChange={handleChange} className='w-full p-2 border rounded' required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Brand Select Button */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Brand</label>
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  {formData.brand || "Not selected"}
                </span>
                <button
                  type="button"
                  onClick={() => setShowBrandModal(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Select
                </button>
              </div>
            </div>

            {/* Category Select Button */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Category</label>
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  {formData.category || "Not selected"}
                </span>
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Select
                </button>
              </div>
            </div>

            {/* Subcategory Select Button */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Subcategory</label>
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  {formData.subcategory || "Not selected"}
                </span>
                <button
                  type="button"
                  onClick={() => setShowSubcategoryModal(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Select
                </button>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-700">Product Image</label>
            <input type="file" accept="image/*" onChange={handleChange} name="image" className='w-full p-2 border rounded' />
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-40 h-40 object-cover rounded border" />}
          </div>

          {/* Grid Inputs */}
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

          {/* Description */}
          <div className="mb-4 mt-4">
            <label className="block text-gray-700">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" rows="3" />
          </div>

          {/* Checkboxes */}
          <div className="flex items-center space-x-4 mb-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="prescriptionRequired" checked={formData.prescriptionRequired} onChange={handleChange} />
              <span>Prescription Required</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="status" checked={formData.status} onChange={handleChange} />
              <span>Status</span>
            </label>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => window.history.back()} // or navigate to another route if using react-router
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Save Product
            </button>
          </div>

        </form>
      </div>

      {/* Modals */}
      {showBrandModal && (
        <BrandModal
          onClose={() => setShowBrandModal(false)}
          onSave={(newBrand) => {
            setBrands([...brands, { _id: Date.now(), name: newBrand }]);
            setFormData({ ...formData, brand: newBrand });
            setShowBrandModal(false);
          }}
        />
      )}

      {showCategoryModal && (
        <CategoryModal
          onClose={() => setShowCategoryModal(false)}
          onSave={(newCat) => {
            setCategories([...categories, { _id: Date.now(), name: newCat }]);
            setFormData({ ...formData, category: newCat });
            setShowCategoryModal(false);
          }}
        />
      )}

      {showSubcategoryModal && (
        <SubcategoryModal
          onClose={() => setShowSubcategoryModal(false)}
          onSave={(newSub) => {
            setSubcategories([...subcategories, { _id: Date.now(), name: newSub }]);
            setFormData({ ...formData, subcategory: newSub });
            setShowSubcategoryModal(false);
          }}
        />
      )}
    </div>
  );
}

// Reusable input field component
const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-gray-700">{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} className='w-full p-2 border rounded' required />
  </div>
);
