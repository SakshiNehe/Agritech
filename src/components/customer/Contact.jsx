// src/pages/Contact.js
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Contact = () => {
  return (
    <>
      {/* Navbar Component */}
      <Navbar />

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          📞 Contact Us
        </h1>

        {/* Contact Info */}
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto text-center">
          <p className="text-lg text-gray-600 mb-4">
            📧 <span className="font-semibold">Email:</span>{" "}
            <a
              href="mailto:satvakrishi123@gmail.com"
              className="text-blue-500 hover:underline"
            >
              satvakrishi123@gmail.com
            </a>
          </p>

          <p className="text-lg text-gray-600 mb-4">
            📞 <span className="font-semibold">Phone:</span>{" "}
            <a href="tel:+919876543210" className="text-blue-500 hover:underline">
              +91 98765 43210
            </a>
          </p>

          <p className="text-lg text-gray-600 mb-4">
            📍 <span className="font-semibold">Location:</span> Nashik, Maharashtra, India
          </p>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </>
  );
};

export default Contact;
