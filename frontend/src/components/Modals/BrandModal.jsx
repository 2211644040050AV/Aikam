import React, { useState, useEffect } from 'react';

export default function BrandModal({ onClose, onSave, existingBrands = [] }) {
  const [brandSearch, setBrandSearch] = useState('');
  const [brands, setBrands] = useState(existingBrands);
  const [selectedBrand, setSelectedBrand] = useState('');

  const filteredBrands = brands
    .filter(b => b.name.toLowerCase().includes(brandSearch.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleSave = () => {
    if (selectedBrand) {
      onSave(selectedBrand);
    }
  };

  const handleAddNew = () => {
    const newBrand = prompt("Enter new brand name:");
    if (newBrand) {
      const newBrandObj = { _id: Date.now(), name: newBrand };
      const updatedBrands = [...brands, newBrandObj];
      setBrands(updatedBrands);
      setSelectedBrand(newBrand);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Select Brand</h2>
        <input
          type="text"
          placeholder="Search brand..."
          value={brandSearch}
          onChange={(e) => setBrandSearch(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
        />
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="">Select a brand</option>
          {filteredBrands.map((b) => (
            <option key={b._id} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleAddNew}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            + Add New Brand
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={!selectedBrand}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
