import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

export default function UserLayout() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main  className="pt-[110px]">
        <Outlet /> 
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
