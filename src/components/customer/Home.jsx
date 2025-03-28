// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


// Import Images
import heroImg1 from "../../assets/images/carousel-1.jpg";
import heroImg2 from "../../assets/images/carousel-2.jpg";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Carousel Logic
  const images = [heroImg1, heroImg2];
  const texts = [
    {
      title: "Fresh from Farms, ",
      subtitle: "Straight to You",
    },
    {
      title: "Empowering Farms, ",
      subtitle: "Enriching Life",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto Slide every 5 seconds
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        goToNextSlide();
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [currentIndex, isHovered]);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      {/* Carousel Section */}
      <section
        className="relative w-full h-screen overflow-hidden"
        onMouseEnter={() => setIsHovered(true)} // Pause on hover
        onMouseLeave={() => setIsHovered(false)} // Resume on mouse leave
      >
        {/* Slide Container */}
        <div
          className="w-full h-full flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              className="w-full h-screen flex-shrink-0 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${img})` }}
            >
              {/* Overlay and Hero Text */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-left">
                <div
                  className="text-center text-white px-4"
                  data-aos={index === currentIndex ? "fade-down" : ""}
                >
                  <h1 className="text-5xl font-extrabold mb-2">
                    {texts[index].title}
                    <span className="text-orange-500">{texts[index].subtitle}</span>
                  </h1>
                  <div className="flex justify-center space-x-4 mt-4">
                    <a
                      href="/Product"
                      className="bg-blue-500 text-white py-3 px-6 rounded-full shadow-md hover:bg-blue-600 transition"
                    >
                      Explore Products
                    </a>
                    <a
                      href="/Features"
                      className="bg-blue-500 text-white py-3 px-6 rounded-full shadow-md hover:bg-blue-600 transition"
                    >
                      Discover Services
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                index === currentIndex
                  ? "bg-orange-500 scale-110"
                  : "bg-white/70 hover:bg-orange-500"
              }`}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
