import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import aikam from '../../assets/aikam.png'
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight, HiScale } from 'react-icons/hi2'
import { motion } from 'framer-motion'
import SearchBar from './Search'
import CartDrawer from '../Layout/CartDrawer'
import { IoMdClose } from 'react-icons/io'

export default function Navbar() {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);

    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen);
    }

    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <>
           <motion.nav
             initial={{ opacity: 0, slide: 0 }}
             whileInView={{ opacity: 1, slide: 1 }}
             transition={{ duration: 1.5 }} 
            className='w-full z-40 sticky top-0 bg-white/90 backdrop-blur-md shadow-md px-6 py-3 flex justify-between items-center'>
                {/* Left Logo */}
                <div>
                    <Link to="/" className='text-2xl font-medium'>
                        <img src={aikam} className="w-24 h-auto" alt="Lucknow Ki Pharmacy" />
                    </Link>
                </div>
                {/* Center Navigation Li */}
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
                </div>
                {/* Right Icons */}
                <div className="flex items-center space-x-4">
                    <Link to="/profile" className='hover:text-black'>
                        <HiOutlineUser className='h-6 w-6 text-gray-700' />
                    </Link>
                    <button
                        onClick={toggleCartDrawer}
                        className="relative hover:text-black">
                        <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
                        <span className="absolute -top-1 -right-2 bg-[#9A65C1] text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                            4
                        </span>
                    </button>

                    {/* Search */}
                    <div className='overflow-hidden'>
                        <SearchBar />
                    </div>

                    <button
                        onClick={toggleNavDrawer}
                        className='md:hidden'>
                        <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
                    </button>
                </div>
            </motion.nav>
            <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

            {/* Mobile Navigation */}
            <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className='flex items-center justify-between p-4'>
                    <h2 className='text-xl font-semibold'>Menu</h2>
                    <button onClick={toggleNavDrawer}>
                        <IoMdClose className='h-6 w-6 text-gray-600' />
                    </button>
                </div>
                <div className='p-4'>
                    <nav className='space-y-4'>
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black '>
                            Analgesics
                        </Link>
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black '>
                            Antibiotics
                        </Link>
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black '>
                            Antipyretics
                        </Link>
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black '>
                            Antacids
                        </Link>
                    </nav>
                </div>
            </div>

        </>
    )
}
