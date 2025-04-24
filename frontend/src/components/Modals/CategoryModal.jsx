import React, { useState } from 'react';

export default function CategoryModal({ onClose, onSave, existingCategories = [] }) {
  const [categorySearch, setCategorySearch] = useState('');
  const [categories, setCategories] = useState(existingCategories);
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredCategories = categories
    .filter(c => c.name.toLowerCase().includes(categorySearch.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleSave = () => {
    if (selectedCategory) {
      onSave(selectedCategory);
    }
  };

  const handleAddNew = () => {
    const newCategory = prompt("Enter new category name:");
    if (newCategory) {
      const newCategoryObj = { _id: Date.now(), name: newCategory };
      const updatedCategories = [...categories, newCategoryObj];
      setCategories(updatedCategories);
      setSelectedCategory(newCategory);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Select Category</h2>
        <input
          type="text"
          placeholder="Search category..."
          value={categorySearch}
          onChange={(e) => setCategorySearch(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="">Select a category</option>
          {filteredCategories.map((c) => (
            <option key={c._id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        <div className="flex justify-between">
          <button
            onClick={handleAddNew}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            + Add New Category
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
              disabled={!selectedCategory}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
