import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SrollTop from './components/Common/SrollTop'
import UserLayout from "./components/Layout/UserLayout"
import PrivacyPolicy from '../src/pages/Home/PrivacyPolicy'
import TermsAndConditions from '../src/pages/Home/TermsAndConditions'
import ReturnAndRefund from '../src/pages/Home/ReturnAndRefund'

export default function App() {
  return (
    <BrowserRouter>
    <SrollTop />
      <Routes>
        <Route path="/" element={<UserLayout />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/return-and-refund-policy" element={<ReturnAndRefund />} />
      </Routes>
    </BrowserRouter>
  )
}
