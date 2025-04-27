import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import aikam from '../../assets/aikam.png';
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from 'react-icons/hi2';
import { motion } from 'framer-motion';
import SearchBar from './Search';
import CartDrawer from '../Layout/CartDrawer';
import { IoMdClose } from 'react-icons/io';

export default function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();  // Initialize useNavigate

    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen);
    };

    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartCount(cart.length);
    }, [drawerOpen]);

    // Navigate to cart after adding an item
    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ product: { name: 'New Product', price: 100, image: 'image_url' }, quantity: 1 });

        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update cart count and navigate to cart
        setCartCount(cart.length);
        navigate('/cart');  // Navigate to the cart page
    };

    return (
        <>
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="fixed top-[40px] left-0 w-full z-40 bg-white/70 backdrop-blur-md shadow-md p-1 flex items-center justify-between"
            >
                <div>
                    <Link to="/" className='text-xl font-medium'>
                        <img src={aikam} className="w-24 h-auto" alt="Lucknow Ki Pharmacy" />
                    </Link>
                </div>

                <div className='hidden md:flex space-x-6'>
                    <Link to="#" className='text-gray-700 hover:text-black text-sm font-medium'>
                        Analgesics
                    </Link>
                    <Link to="#" className='text-gray-700 hover:text-black text-sm font-medium'>
                        Antibiotics
                    </Link>
                    <Link to="#" className='text-gray-700 hover:text-black text-sm font-medium'>
                        Antipyretics
                    </Link>
                    <Link to="#" className='text-gray-700 hover:text-black text-sm font-medium'>
                        Antacids
                    </Link>
                    <Link to="/collection" className='text-gray-700 hover:text-black text-sm font-medium'>
                        All Collection
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Link to="/admin" className='block bg-[#9A65C1] px-2 py-1 rounded text-sm text-white hover:bg-[#6a4d7f] transition-all'>Admin</Link>
                    <Link to="/profile" className='hover:text-black' aria-label="User Profile">
                        <HiOutlineUser className='h-6 w-6 text-gray-700' />
                    </Link>

                    <Link
                        to="/cart"
                        className="relative hover:text-black"
                    >
                        <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
                        <span className="absolute -top-1 -right-2 bg-[#9A65C1] text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                            {cartCount}
                        </span>
                    </Link>

                    <div className='overflow-hidden'>
                        <SearchBar />
                    </div>

                    <button
                        onClick={toggleNavDrawer}
                        className='md:hidden'
                        aria-label="Open Navigation Menu"
                    >
                        <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
                    </button>
                </div>
            </motion.nav>

            <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

            <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className='flex items-center justify-between p-4'>
                    <h2 className='text-xl font-semibold'>Menu</h2>
                    <button onClick={toggleNavDrawer} aria-label="Close Navigation Menu">
                        <IoMdClose className='h-6 w-6 text-gray-600' />
                    </button>
                </div>
                <div className='p-4'>
                    <nav className='space-y-4'>
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
                            Analgesics
                        </Link>
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
                            Antibiotics
                        </Link>
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
                            Antipyretics
                        </Link>
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
                            Antacids
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    );
}
