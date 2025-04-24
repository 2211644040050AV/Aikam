import React, { useState } from 'react';

export default function SubcategoryModal({ onClose, onSave, existingSubcategories = [] }) {
  const [subcategorySearch, setSubcategorySearch] = useState('');
  const [subcategories, setSubcategories] = useState(existingSubcategories);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const filteredSubcategories = subcategories
    .filter(s => s.name.toLowerCase().includes(subcategorySearch.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleSave = () => {
    if (selectedSubcategory) {
      onSave(selectedSubcategory);
    }
  };

  const handleAddNew = () => {
    const newSubcategory = prompt("Enter new subcategory name:");
    if (newSubcategory) {
      const newSubcategoryObj = { _id: Date.now(), name: newSubcategory };
      const updatedSubcategories = [...subcategories, newSubcategoryObj];
      setSubcategories(updatedSubcategories);
      setSelectedSubcategory(newSubcategory);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Select Subcategory</h2>
        <input
          type="text"
          placeholder="Search subcategory..."
          value={subcategorySearch}
          onChange={(e) => setSubcategorySearch(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
        />
        <select
          value={selectedSubcategory}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="">Select a subcategory</option>
          {filteredSubcategories.map((s) => (
            <option key={s._id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
        <div className="flex justify-between">
          <button
            onClick={handleAddNew}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            + Add New Subcategory
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={!selectedSubcategory}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
