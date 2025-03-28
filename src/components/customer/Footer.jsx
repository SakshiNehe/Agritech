// src/components/Footer.js
import React from "react";
import { FaTwitter, FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { BsArrowUp } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-gray-400 pt-10">
      <div className="container mx-auto px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div data-aos="fade-right">
            <h1 className="text-3xl font-bold text-white mb-4">
              S<span className="text-orange-500">atva</span>Krishi
            </h1>
            <p className="leading-relaxed">
              Empowering farmers with fair pricing and ensuring fresh, healthy produce reaches
              communities. Experience transparency, quality, and trust with SatvaKrishi.
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaFacebookF size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaYoutube size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>

          {/* Address Section */}
          <div data-aos="fade-up">
            <h4 className="text-lg text-white mb-4">📍 Address</h4>
            <p className="mb-2">ABC Road, Nashik, Maharashtra, India</p>
            <p className="mb-2">📞 +91 98765 43210</p>
            <p>📧 support@satvakrishi.com</p>
          </div>

          {/* Quick Links */}
          <div data-aos="fade-up">
            <h4 className="text-lg text-white mb-4">🔗 Quick Links</h4>
            <a href="/About" className="block mb-2 hover:text-white transition">
              About Us
            </a>
            <a href="/Contact" className="block mb-2 hover:text-white transition">
              Contact Us
            </a>
            <a href="/Features" className="block mb-2 hover:text-white transition">
              Our Services
            </a>
            <a href="/" className="block mb-2 hover:text-white transition">
              Terms & Conditions
            </a>
            <a href="#" className="block mb-2 hover:text-white transition">
              Support
            </a>
          </div>

          {/* Newsletter */}
          <div data-aos="fade-left">
            <h4 className="text-lg text-white mb-4">📧 Newsletter</h4>
            <p className="mb-4">
              Subscribe to stay updated on new arrivals, offers, and farming trends.
            </p>
            <div className="relative w-full max-w-xs">
              <input
                type="email"
                placeholder="Your email"
                className="w-full py-3 px-4 text-sm text-gray-700 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-orange-500 text-white py-2 px-4 rounded-full text-sm hover:bg-orange-600 transition">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-800 py-4 mt-8">
        <div className="container mx-auto text-center text-sm">
          &copy; 2025 <span className="text-orange-500">SatvaKrishi</span>. All Rights Reserved.
        </div>
      </div>

      {/* Back to Top Button */}
      <a
        href="#"
        className="fixed bottom-5 right-5 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition transform hover:scale-110"
      >
        <BsArrowUp size={24} />
      </a>
    </div>
  );
};

export default Footer;
