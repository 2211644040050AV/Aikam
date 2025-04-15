import React from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Home from '../../pages/Home/Home'

export default function UserLayout() {
    return (
        <>
            {/* Header */}
            <Header />

            {/* Main Content */}
            <Home />

            {/* Footer */}
            <Footer />

        </>
    )
}
