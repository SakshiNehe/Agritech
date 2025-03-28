import React from "react";
import { LanguageProvider } from "./context/LanguageContext";
import VoiceAssistant from "./components/VoiceAssistant";
import SignupVoiceChat from "./components/SignupVoiceChat";

import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Navbar from "./components/customer/Navbar";
import Footer from "./components/customer/Footer";
import Home from "./components/customer/Home";
import About from "./components/customer/About";
import Features from "./components/customer/Features";
import Product from "./components/customer/Product";
import ProductDashboard from "./components/customer/ProductDashboard"
import Firm from "./components/customer/Firm";
import Contact from "./components/customer/Contact";
import BuyNow from "./components/customer/BuyNow";
import Cart from "./components/customer/Cart";
import Vedic from "./components/customer/Vedic";
import Organic from "./components/customer/Organic";
import SignInSelection from "./pages/SignInSelection";
import FarmerLandingPage from "./components/FarmerLandingPage";
import CustomerSignup from "./pages/CustomerSignUp";
import CustomerSignin from "./pages/CustomerSignin";
import FarmerDashboard from "./pages/farmerDashboard";
import FarmerLogin from "./pages/FarmerLogin";
import AddProduct from "./components/AddProduct";



const App = () => {
  // Initialize AOS animation
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product-Dashboard" element={<ProductDashboard />} />
        <Route path="/firm" element={<Firm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Organic" element={<Organic />} />
        <Route path="/Vedic" element={<Vedic />} />
        <Route path="/Buynow" element={<BuyNow />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/signin-selection" element = {<SignInSelection/>}/>
        <Route path="/customer-signup" element = {<CustomerSignup/>}/>
        <Route path="/customer-signin" element = {<CustomerSignin/>}/>
        <Route path="/farmer-signup" element={<SignupVoiceChat/>}/>
        <Route path="farmer-Dashboard" element={<FarmerDashboard/>}/>
        <Route path="/login" element={<FarmerLogin/>} />
        <Route path="/farmer-landing-page" element = {<FarmerLandingPage/>}/>
        <Route path="/add-product" element={<AddProduct/>}/>


      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

