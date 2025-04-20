import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home/Home";
import SrollTop from './components/Common/SrollTop';
import UserLayout from "./components/Layout/UserLayout";
import LogIn from "./pages/LogIn"
import Register from "./pages/Register"
import Profile from './pages/Profile';
import PrivacyPolicy from '../src/pages/Home/PrivacyPolicy';
import TermsAndConditions from '../src/pages/Home/TermsAndConditions';
import ReturnAndRefund from '../src/pages/Home/ReturnAndRefund';
import MedicinesById from './components/Products/MedicineById';

export default function App() {
  return (
    <BrowserRouter>
      <SrollTop />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<LogIn />} />
          <Route path='register' element={<Register />} />
          <Route path='profile' element={<Profile />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="return-and-refund-policy" element={<ReturnAndRefund />} />
          {/* <Route path="product/:id" element={<MedicineById />} /> */}
          </Route>
      </Routes>
    </BrowserRouter>
  );
}
