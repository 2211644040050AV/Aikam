import React, { useState } from 'react';

const SubcategoryModal = ({ onClose, onSave }) => {
  const [subcategoryName, setSubcategoryName] = useState("");

  const handleSave = () => {
    if (subcategoryName.trim() === "") return; // Don't save empty subcategories
    onSave(subcategoryName);
    setSubcategoryName(""); // Reset field after saving
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Add New Subcategory</h3>
        <div className="mb-4">
          <label className="block text-gray-700">Subcategory Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Save</button>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryModal;
