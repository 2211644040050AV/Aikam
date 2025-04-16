import React from 'react';
import { motion } from 'framer-motion';
import { TbBrandMeta } from 'react-icons/tb';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';

export default function Topbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      className="fixed top-0 left-0 w-full z-50 bg-[#9A65C1] text-white text-sm"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-2 px-4">
        {/* Social Media Links */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" aria-label="Meta" className="hover:text-gray-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-gray-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-gray-300">
            <RiTwitterXLine className="h-5 w-5" />
          </a>
        </div>

        {/* Centered Text */}
        <div className="text-sm text-center flex-grow">
          <span>We ship product - fast and reliable!</span>
        </div>

        {/* Phone number for larger screens */}
        <div className="text-sm hidden md:block">
          <a href="tel:+91 7398554261" className="hover:text-gray-300">
            +91 7398554261
          </a>
        </div>
      </div>
    </motion.div>
  );
}
