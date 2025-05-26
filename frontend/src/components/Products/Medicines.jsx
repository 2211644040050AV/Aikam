import React, { useRef, useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from 'framer-motion';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Medicines() {
  const sliderRef = useRef(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:9000/api/products');
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="py-10 px-4 lg:px-12 bg-white"
    >
      <div className="container mx-auto text-center mb-10 relative">
        <h1 className="text-3xl font-bold mb-4">Shop Now</h1>
        <p className="text-lg text-gray-600 mb-8">
          Browse through our collection of stylish and comfortable products.
        </p>

        {/* Buttons */}
        <div className="flex flex-col-reverse items-center gap-2 mt-6 lg:mt-0 lg:flex-row lg:absolute lg:right-0 lg:bottom-0">
          <Link
            to="/collection"
            className="px-4 py-2 text-sm font-medium border rounded bg-white hover:bg-gray-100"
          >
            See All
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="p-2 rounded border bg-black text-white"
            >
              <FiChevronLeft className="text-2xl" />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="p-2 rounded border bg-black text-white"
            >
              <FiChevronRight className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="container mx-auto">
        <Slider ref={sliderRef} {...settings}>
          {products.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="px-2"
            >
              <div className="relative group">
                <img
                  src={
                    product.images?.[0]?.url ||
                    (product.image?.data
                      ? `data:${product.image.contentType};base64,${product.image.data}`
                      : 'https://via.placeholder.com/500x550')
                  }
                  alt={product.name}
                  className="w-full h-[500px] object-cover rounded shadow-md transition duration-300 group-hover:scale-105"
                  draggable="false"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4 rounded-b-lg">
                  <Link to={`/product/${product._id}`} className="block">
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="mt-1">₹{product.price}</p>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </motion.section>
  );
}
