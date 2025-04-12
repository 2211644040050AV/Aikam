import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import AdminLayout from './layouts/AdminLayout'
import UserLayout from "./components/Layout/UserLayout"
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="#">{/* Admin Layout */}</Route>
      <Route path="/" element={<UserLayout></UserLayout>}>{/* User Layout */}</Route>
      </Routes>
    </BrowserRouter>
  )
}
