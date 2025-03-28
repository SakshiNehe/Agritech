import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AOS from "aos";
import "aos/dist/aos.css";

// Importing Images Correctly
import icon1 from "../../assets/images/icon-1.png";
import icon2 from "../../assets/images/icon-2.png";
import icon3 from "../../assets/images/icon-3.png";

const Features = () => {
  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Only animate once
    });
  }, []);

  return (
    <>
      {/* Navbar Section */}
      <Navbar />

      {/* Page Header Start */}
      <div
        className="container-fluid page-header bg-green-600 text-white py-10 text-center"
        data-aos="fade-in"
      >
        <div className="container">
          <h1 className="text-4xl font-bold mb-3">🌱 Our Unique Features</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-center mb-0 text-lg">
              <li className="breadcrumb-item">
                <a className="text-white hover:text-orange-500" href="/">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item">
                <a className="text-white hover:text-orange-500" href="#">
                  Pages
                </a>
              </li>
              <li
                className="breadcrumb-item text-orange-500 active"
                aria-current="page"
              >
                Features
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      {/* Features Section Start */}
      <div className="container my-12">
        <div
          className="section-header text-center mx-auto mb-8"
          data-aos="fade-up"
          style={{ maxWidth: "500px" }}
        >
          <h1 className="text-4xl font-semibold text-green-700 mb-3">
            Why Choose <span className="text-orange-500">SatvaKrishi?</span>
          </h1>
          <p className="text-lg text-gray-600">
            We bring you fresh, high-quality farm produce directly from verified
            farmers, ensuring trust, transparency, and sustainability.
          </p>
        </div>

        <div className="row g-4 flex justify-center">
          {/* Feature 1 */}
          <div
            className="col-lg-4 col-md-6 mb-6"
            data-aos="fade-right"
          >
            <div className="bg-white text-center h-100 p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <img
                className="img-fluid mb-4 w-24 mx-auto"
                src={icon1}
                alt="Traceable Supply Chain"
              />
              <h4 className="text-xl font-bold text-green-700 mb-3">
                Transparency
              </h4>
              <p className="text-gray-600 mb-4">
                Track your produce journey from farm to plate, ensuring complete
                transparency and trust.
              </p>
              <a
                className="btn bg-orange-500 text-white py-2 px-5 rounded-full shadow-md hover:bg-orange-600 transition"
                href="https://goo.gl/maps/56iTZnWQSPG2"
                target="_blank"
                rel="noopener noreferrer"
              >
                📍 Visit Now
              </a>
            </div>
          </div>

          {/* Feature 2 */}
          <div
            className="col-lg-4 col-md-6 mb-6"
            data-aos="fade-up"
          >
            <div className="bg-white text-center h-100 p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <img
                className="img-fluid mb-4 w-24 mx-auto"
                src={icon2}
                alt="Fair Pricing for Farmers"
              />
              <h4 className="text-xl font-bold text-green-700 mb-3">
                Fair Pricing for Farmers
              </h4>
              <p className="text-gray-600 mb-4">
                Empowering farmers by providing fair prices, eliminating
                middlemen, and ensuring sustainable livelihoods.
              </p>
              <a
                className="btn bg-orange-500 text-white py-2 px-5 rounded-full shadow-md hover:bg-orange-600 transition"
                href="https://goo.gl/maps/56iTZnWQSPG2"
                target="_blank"
                rel="noopener noreferrer"
              >
                📍 Visit Now
              </a>
            </div>
          </div>

          {/* Feature 3 */}
          <div
            className="col-lg-4 col-md-6 mb-6"
            data-aos="fade-left"
          >
            <div className="bg-white text-center h-100 p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <img
                className="img-fluid mb-4 w-24 mx-auto"
                src={icon3}
                alt="Verified Quality"
              />
              <h4 className="text-xl font-bold text-green-700 mb-3">
                Verified Quality
              </h4>
              <p className="text-gray-600 mb-4">
                All products undergo strict quality checks to ensure freshness,
                safety, and nutritional value.
              </p>
              <a
                className="btn bg-orange-500 text-white py-2 px-5 rounded-full shadow-md hover:bg-orange-600 transition"
                href="https://goo.gl/maps/56iTZnWQSPG2"
                target="_blank"
                rel="noopener noreferrer"
              >
                📍 Visit Now
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Features Section End */}

      {/* Footer Section */}
      <Footer />
    </>
  );
};

export default Features;
