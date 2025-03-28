// src/components/Firm.js
import React from "react";
import { Link } from "react-router-dom";
import bgIcon from "../../assets/images/bg-icon.png";


const Firm = () => {
  return (
    <div
      className="bg-green-600 bg-cover bg-repeat bg-center mt-12 py-12 lg:py-20"
      style={{
        backgroundImage: `url(${bgIcon})`, // Correct background image
      }}
      data-aos="fade-in"
    >
      <div className="container mx-auto px-4 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Section */}
          <div
            className="w-full lg:w-7/12 text-center lg:text-start"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-snug drop-shadow-md">
              Explore SatvaKrishi
            </h1>
            <p className="text-lg text-white mt-4 leading-relaxed">
              Experience the journey where innovation meets agriculture. Visit
              our platform to discover fresh produce, transparent processes,
              and a commitment to empowering farmers while delivering quality
              to your doorstep.
            </p>
          </div>

          {/* Right Section with Button */}
          <div
            className="w-full lg:w-5/12 text-center lg:text-end"
            data-aos="fade-left"
            data-aos-delay="500"
          >
            <Link
              to="/contact"
              className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-all transform hover:bg-orange-600 hover:scale-105"
            >
              Visit Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Firm;
