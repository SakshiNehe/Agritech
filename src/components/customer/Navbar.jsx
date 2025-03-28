import React, { useState, useEffect } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-[70px] z-50 transition-all duration-300 ease-in-out ${
          scrolling ? "bg-white shadow-md" : "bg-transparent"
        }`}
        style={{ backdropFilter: scrolling ? "blur(10px)" : "none" }} // Added blur effect on scroll
      >
        <nav className="w-full">
          <div className="container mx-auto flex justify-between items-center px-5 py-3">
            <Link to="/" className={`text-2xl font-bold transition ${scrolling ? "text-green-800" : "text-white"} hover:text-orange-500`}>
              Satva<span className="text-orange-500">Krishi</span>
            </Link>

            <div className="hidden lg:flex space-x-6">
              <Link to="/" className={`hover:text-orange-500 transition ${scrolling ? "text-black" : "text-white"}`}>
                Home
              </Link>
              <Link to="/about" className={`hover:text-orange-500 transition ${scrolling ? "text-black" : "text-white"}`}>
                About Us
              </Link>
              <Link to="/products" className={`hover:text-orange-500 transition ${scrolling ? "text-black" : "text-white"}`}>
                Products
              </Link>
              <Link to="/contact" className={`hover:text-orange-500 transition ${scrolling ? "text-black" : "text-white"}`}>
                Contact Us
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <Link to="/signin-selection" className="hover:text-orange-500 transition">
                <FaUser size={22} className={`${scrolling ? "text-black" : "text-white"}`} />
              </Link>
            </div>

            <button type="button" className={`lg:hidden transition ${scrolling ? "text-black" : "text-white"}`} onClick={toggleMenu}>
              {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </nav>

        <div
          className={`fixed top-0 right-0 h-screen w-64 bg-white shadow-lg transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 lg:hidden`}
        >
          <button className="absolute top-5 right-5 text-gray-700 text-2xl" onClick={toggleMenu}>
            <FaTimes />
          </button>

          <div className="flex flex-col items-center mt-20 space-y-6">
            <Link to="/" className="text-gray-800 text-lg hover:text-orange-500" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/about" className="text-gray-800 text-lg hover:text-orange-500" onClick={toggleMenu}>
              About Us
            </Link>
            <Link to="/products" className="text-gray-800 text-lg hover:text-orange-500" onClick={toggleMenu}>
              Products
            </Link>
            <Link to="/contact" className="text-gray-800 text-lg hover:text-orange-500" onClick={toggleMenu}>
              Contact Us
            </Link>
            <Link to="/signin-selection" className="text-gray-800 text-lg hover:text-orange-500" onClick={toggleMenu}>
              Sign In
            </Link>
          </div>
        </div>
      </div>

      <div className="h-[70px]"></div>
    </>
  );
};

export default Navbar;
