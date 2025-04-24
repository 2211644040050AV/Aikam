import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home/Home";
import ScrollTop from './components/Common/SrollTop';
import UserLayout from "./components/Layout/UserLayout";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Profile from './pages/Profile';
import PrivacyPolicy from './pages/Home/PrivacyPolicy';
import TermsAndConditions from './pages/Home/TermsAndConditions';
import ReturnAndRefund from './pages/Home/ReturnAndRefund';
import MedicinesById from './components/Products/MedicineById';
import AdminLayout from './components/Admin/AdminLayout';
import AdminHome from './pages/Admin/AdminHome';
import UserManagement from './components/Admin/UserManagement';
import ProductManagement from './components/Admin/ProductManagement';
import AddProduct from './components/Admin/CreateProduct'
import UpdateProduct from './components/Admin/UpdateProduct'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        {/* User routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LogIn />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="return-and-refund-policy" element={<ReturnAndRefund />} />
          {/* <Route path="product/:id" element={<MedicinesById />} /> */}
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="users" element={<UserManagement />} />          
          <Route path="products" element={<ProductManagement />} />
          <Route path="create" element={<AddProduct />} />
          <Route path="update" element={<UpdateProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
