import React from 'react';
import { motion } from 'framer-motion';
import Avtar from '../../assets/dicon.png';
import ContactForm from './ContactForm';
import Service from './Service';
import Testimonials from './Testimonials';

export default function Home() {
  return (
    <div className="bg-white text-black">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="text-center py-6">
        <h1 className="text-3xl font-bold">
          <span>Lucknow ki Pharmacy</span> <span className="mx-2">|</span>
          <span>लखनऊ की फार्मेसी</span>
        </h1>
        <p className="text-lg mt-2">Instant Medicine Delivery - FLAT 20% *OFF</p>
      </motion.div>

      {/* Order + Form */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 lg:px-12 py-6">
        {/* LEFT: CTA Section */}
        <div className="flex flex-col items-center justify-center">
          <img src={Avtar} alt="icon" className="w-3/4 sm:w-1/2 md:w-1/3 lg:w-2/4 h-auto mb-4 mx-auto" />
          <div className="text-center text-xl font-semibold">
            <p>To order us <span className="mx-2">|</span> ऑर्डर करने के लिए</p>
            <div className="text-4xl my-3 animate-bounce">
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-4">
            <a
              href="https://api.whatsapp.com/send?phone=+919559604466&text=Hello..."
              className="bg-green-600 text-white px-6 py-2 rounded flex items-center space-x-2 justify-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-whatsapp"></i>
              <span>WhatsApp Us</span>
            </a>
            <a
              href="tel:+91-9559604466"
              className="bg-blue-600 text-white px-6 py-2 rounded flex items-center space-x-2 justify-center"
            >
              <i className="fa fa-phone"></i>
              <span>Call Us</span>
            </a>
          </div>
        </div>

        {/* RIGHT: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          className='flex flex-col justify-center'>
          <ContactForm />
        </motion.div>
      </motion.div>

      {/* Services and Testimonials */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 lg:px-8 py-4">
        <Service />
        <Testimonials />
      </motion.div>


    </div>
  );
}
