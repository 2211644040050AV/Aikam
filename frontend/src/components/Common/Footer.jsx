import React, { useEffect } from 'react';
import {motion} from 'framer-motion';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaRegRegistered,
  FaLock,
  FaListAlt,
  FaSyncAlt,
  FaQuestionCircle,
  FaFileContract,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import BackToTop from './BackToTop';

export default function Footer() {

  return (
    <motion.footer
    initial={{ opacity: 0, y: 50 }}    
    whileInView={{ opacity: 1, y: 0 }} 
    transition={{ duration: 0.6, ease: 'easeOut' }}
    viewport={{ once: true }}
    className="py-12 bg-gray-900 text-white">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-4 lg:px-0">

        {/* Address Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 scudo">Find Us</h3>
          <p className="flex items-start gap-2">
            <FaMapMarkerAlt className="mt-1" />
            Aikam India [Lucknow Ki Pharmacy],<br />
            414-B, Sahara Shopping Center, Lekhraj,<br />
            Indira Nagar, Lucknow – 226016
          </p>
          <p className="flex items-center gap-2 mt-2">
            <FaPhoneAlt /> Official: +91 9559604466
          </p>
          <p className="flex items-center gap-2">
            <FaPhoneAlt /> +91 8861496927
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope /> aikamindia@gmail.com, contact@aikam.in
          </p>
          <p className="flex items-center gap-2">
            <FaRegRegistered /> D.L. No.: UP32200003836, UP32210003831
          </p>
          <p className="flex items-center gap-2">
            <FaRegRegistered /> GST No.: 09AIOPV4086B1ZT
          </p>
        </div>

        {/* Map Section */}
        <div className="h-full">
          <h3 className="text-lg font-semibold mb-4">We are on Map</h3>
          <iframe
            className="w-full h-64 rounded"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14236.090657811417!2d80.9727444!3d26.871021!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5d39eb0846b18f47!2sAikam%20India%20(Lucknow%20ki%20Pharmacy)!5e0!3m2!1sen!2sin!4v1643350419326!5m2!1sen!2sin"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>

        {/* Policies Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FaFileContract /> Our Policies
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaLock />
              <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaListAlt />
              <Link to="/terms-and-conditions" className="hover:underline">Terms & Conditions</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaSyncAlt />
              <Link to="/return-and-refund-policy" className="hover:underline">Return & Refund Policy</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaQuestionCircle />
              <Link to="#" className="hover:underline">Frequently Asked Questions</Link>
            </li>
          </ul>
        </div>

      </div>
      <div className=" text-center py-4 mt-8">
        <p className=" text-sm">
          © 2024 Aikam India. All rights reserved. All medicines are dispensed in compliance with the Drugs and Cosmetics Act, 1940 and Drugs and Cosmetics Rules, 1945.
        </p>
      </div>
      <BackToTop />
    </motion.footer>
  );
}
