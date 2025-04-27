import React, { useState } from 'react';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner'; 
import ErrorBoundary from "./components/Common/ErrorBoundary";
import Home from "./pages/Home/Home";
import ScrollTop from './components/Common/SrollTop';
import UserLayout from "./components/Layout/UserLayout";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Profile from './pages/Profile';
import CollectionPage from './pages/CollectionPage';
import PrivacyPolicy from './pages/Home/PrivacyPolicy';
import TermsAndConditions from './pages/Home/TermsAndConditions';
import ReturnAndRefund from './pages/Home/ReturnAndRefund';
import MedicinesById from './components/Products/MedicineById';
import Cart from './components/Cart/CartContents';
import Checkout from './components/Cart/Checkout'; 
import AdminLayout from './components/Admin/AdminLayout';
import AdminHome from './pages/Admin/AdminHome';
import UserManagement from './components/Admin/UserManagement';
import ProductManagement from './components/Admin/ProductManagement';
import AddProduct from './components/Admin/CreateProduct';
import UpdateProduct from './components/Admin/UpdateProduct';

import { Provider } from "react-redux";
import store from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <ErrorBoundary>
        <Toaster position="top-right" />
        <ScrollTop />
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<LogIn />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="collection" element={<CollectionPage />} />
            <Route path="product/:id" element={<MedicinesById />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="return-and-refund-policy" element={<ReturnAndRefund />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="create" element={<AddProduct />} />
            <Route path="update" element={<UpdateProduct />} />
          </Route>

          {/* Fallback Route */}
          {/* <Route path="*" element={<Home />} /> */}
        </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
}
