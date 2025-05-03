import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BrandModal({ onClose, onSave }) {
  const [brandSearch, setBrandSearch] = useState('');
  const [brands, setBrands] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState('');

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/brands");
      // Ensure only brands with a valid name are stored
      const cleaned = response.data.filter(b => typeof b?.name === 'string');
      setBrands(cleaned);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const handleSave = () => {
    const selectedBrand = brands.find(b => b._id === selectedBrandId);
    if (!selectedBrand) {
      alert("Please select a brand before saving.");
      return;
    }

    if (typeof onSave === 'function') {
      onSave(selectedBrand);
    }
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const handleAddNew = async () => {
    const newBrandName = prompt("Enter new brand name:");
    if (!newBrandName) return;

    try {
      const response = await axios.post('http://localhost:9000/api/brands', {
        name: newBrandName,
      });

      const newBrand = response.data;
      if (typeof newBrand?.name === 'string') {
        setBrands(prev => [...prev, newBrand]);
        setSelectedBrandId(newBrand._id);
      } else {
        alert("Invalid brand data received.");
      }
    } catch (error) {
      console.error('Error adding new brand:', error);
      alert('Failed to add brand');
    }
  };

  const filteredBrands = brands
    .filter(b => typeof b?.name === 'string')
    .filter(b => b.name.toLowerCase().includes(brandSearch.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

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
          value={selectedBrandId}
          onChange={(e) => setSelectedBrandId(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="">Select a brand</option>
          {filteredBrands.map((b) => (
            <option key={b._id} value={b._id}>
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
            disabled={!selectedBrandId}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
