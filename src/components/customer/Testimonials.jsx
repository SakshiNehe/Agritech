import React from "react";

// Testimonial Data Array
const testimonials = [
  {
    id: 1,
    img: "/img/testimonial-1.jpg",
    name: "Client Name",
    profession: "Farmer",
    review:
      "SatvaKrishi helped me sell my organic produce directly to customers. I received fair prices and increased my income.",
  },
  {
    id: 2,
    img: "/img/testimonial-2.jpg",
    name: "Client Name",
    profession: "Customer",
    review:
      "I love the quality of products on SatvaKrishi! Knowing that my food comes from verified organic farmers gives me peace of mind.",
  },
  {
    id: 3,
    img: "/img/testimonial-3.jpg",
    name: "Client Name",
    profession: "Supplier",
    review:
      "This platform bridges the gap between farmers and consumers. SatvaKrishi has truly empowered small-scale farmers.",
  },
];

const Testimonial = () => {
  return (
    <>
      {/* Testimonial Section */}
      <div className="container-xxl py-12 bg-gray-100">
        <div className="container mx-auto">
          {/* Section Header */}
          <div
            className="text-center mx-auto mb-12 max-w-lg animate-fade-up"
            data-wow-delay="0.1s"
          >
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              Customer Review
            </h1>
            <p className="text-gray-600">
              See how SatvaKrishi has transformed the lives of farmers and
              provided quality produce to consumers.
            </p>
          </div>

          {/* Testimonial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
              >
                {/* Quote Icon */}
                <i className="fa fa-quote-left text-3xl text-green-500"></i>
                <p className="text-gray-700 my-4">{testimonial.review}</p>

                {/* User Info */}
                <div className="flex items-center mt-4">
                  <img
                    className="w-16 h-16 rounded-full border-2 border-green-500"
                    src={testimonial.img}
                    alt={testimonial.name}
                  />
                  <div className="ml-4">
                    <h5 className="text-lg font-semibold">{testimonial.name}</h5>
                    <span className="text-gray-500">{testimonial.profession}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Navigation (Optional, if required later) */}
        <div className="flex justify-center space-x-4 mt-8">
          <button className="w-12 h-12 flex items-center justify-center border border-green-500 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition duration-300">
            <i className="fa fa-chevron-left"></i>
          </button>
          <button className="w-12 h-12 flex items-center justify-center border border-green-500 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition duration-300">
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
