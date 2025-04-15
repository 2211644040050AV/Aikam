import React from 'react'
import { motion } from 'framer-motion'
import { TbBrandMeta } from 'react-icons/tb'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'

export default function Topbar() {
    return (
        <motion.div
        initial={{ opacity: 0, slide: 0 }}
        whileInView={{ opacity: 1, slide: 1 }}
        transition={{ duration: 0.5 }}
        className='bg-[#9A65C1] text-white'>
            <div className='container mx-auto flex justify-between items-center py-3 px-4'>
                <div className='hidden md:flex items-center space-x-4'>
                    <a href="#" className='hover:text-gray-300'>
                        <TbBrandMeta className='h-5 w-5'></TbBrandMeta>
                    </a>
                    <a href="#" className='hover:text-gray-300'>
                        <IoLogoInstagram className='h-5 w-5'></IoLogoInstagram>
                    </a>
                    <a href="#" className='hover:text-gray-300'>
                        <RiTwitterXLine className='h-5 w-5'></RiTwitterXLine>
                    </a>
                </div>
                <div className='text-sm text-center flex-grow'>
                    <span>
                        We ship product - fast and reliable!
                    </span>
                </div>
                <div className='text-sm hidden md:block'>
                    <a href="tel:+91 7398554261" className='hover:text-gray-300'>+91 7398554261</a>
                </div>
            </div>
        </motion.div>
    )
}
