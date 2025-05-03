import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import AOS from "aos";
import "aos/dist/aos.css";

// Layout Components
import MainLayout from './components/layout/MainLayout';
import Navbar from "./components/customer/Navbar";
import Footer from "./components/customer/Footer";

// Core Components
import VoiceAssistant from "./components/VoiceAssistant";

// Auth Pages
import SignInSelection from "./pages/auth/SignInSelection";
import FarmerLogin from "./pages/auth/FarmerLogin";
import FarmerRegister from "./pages/auth/FarmerRegister";
import CustomerLogin from "./pages/auth/CustomerLogin";
import CustomerRegister from "./pages/auth/CustomerRegister";

// Farmer Pages
import Dashboard from "./pages/farmer/Dashboard";
import Inventory from "./pages/farmer/Inventory";
import AddProduct from "./pages/farmer/AddProduct";
import Orders from "./pages/farmer/Orders";
import Profile from "./pages/farmer/Profile";

// Shop/Customer Pages
import Home from "./pages/customer/Home";
import Products from "./pages/customer/Products";
import Cart from "./pages/customer/Cart";
import CustomerProfile from "./pages/customer/CustomerProfile";

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Router>
      <LanguageProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/auth/signin" replace />} />
          <Route path="/auth/signin" element={<SignInSelection />} />
          
          {/* Farmer Auth Routes */}
          <Route path="/farmer/login" element={<FarmerLogin />} />
          <Route path="/farmer/register" element={<FarmerRegister />} />
          
          {/* Customer Auth Routes */}
          <Route path="/customer/login" element={<CustomerLogin />} />
          <Route path="/customer/register" element={<CustomerRegister />} />
          
          {/* Farmer Protected Routes */}
          <Route path="/farmer" element={<MainLayout isFarmer={true} />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          
          {/* Customer Protected Routes */}
          <Route path="/shop" element={<MainLayout isFarmer={false} />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<CustomerProfile />} />
          </Route>
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LanguageProvider>
    </Router>
  );
};

export default App;

