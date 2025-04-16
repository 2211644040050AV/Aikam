import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { HiMiniXMark } from 'react-icons/hi2';

export default function Searchbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    setIsOpen(false);
  };

  // Focus input when search bar is opened
  useEffect(() => {
    if (isOpen) {
      document.getElementById('search-input').focus();
    }
  }, [isOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? 'absolute top-0 left-0 w-full bg-white h-24 z-50' : 'w-auto'
      }`}
    >
      {isOpen ? (
        <form onSubmit={handleSearch} className="relative flex items-center justify-center w-full">
          <div className="relative w-1/2">
            <input
              id="search-input"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            />
            {/* Search Icon */}
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 cursor-pointer"
              aria-label="Search"
            >
              <HiMagnifyingGlass className="w-6 h-6" />
            </button>
          </div>
          {/* Close Icon */}
          <button
            type="button"
            onClick={handleSearchToggle}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 cursor-pointer"
            aria-label="Close search"
          >
            <HiMiniXMark className="w-6 h-6" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle} aria-label="Open search">
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </motion.div>
  );
}
