import React, { useState } from 'react'
import {motion} from 'framer-motion';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { HiMiniXMark } from 'react-icons/hi2';

export default function Searchbar() {

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    setIsOpen(false);
  }


  return (

    <motion.div
    initial={{ opacity: 0, slide: 0 }}
    whileInView={{ opacity: 1, slide: 1 }}
    transition={{ duration: 1.5 }}
    className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"} `}>
      {isOpen ? (
        <form onSubmit={handleSearch}
          className="relative flex items-center justify-center w-full">
          <div className='relative w-1/2'>
            <input type="text"
              placeholder='Search'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700' />
            {/* Search Icon */}
            <button type='submit' className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 cursor-pointer'>
              <HiMagnifyingGlass className="w-6 h-6" />
            </button>
          </div>
          {/* Close Icon */}
          <button type='button' onClick={handleSearchToggle} className='transform -translate -y-1/2  text-gray-600 hover:text-gray-800 cursor-pointer'
          >
            <HiMiniXMark className='w-6 h-6' />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </motion.div>
  )
}
