// src/components/Blog.jsx
import React from "react";
import blog1 from "../assets/images/blog-1.jpg";
import blog2 from "../assets/images/blog-2.jpg";
import blog3 from "../assets/images/blog-3.jpg";

// Corrected blogData with direct image imports
const blogData = [
  {
    id: 1,
    img: blog1,
    title: "5 Tips to Increase Crop Yield Using Sustainable Methods",
    date: "05 Mar, 2025",
  },
  {
    id: 2,
    img: blog2,
    title: "Empowering Farmers Through Fair Pricing and Direct Sales",
    date: "18 Feb, 2025",
  },
  {
    id: 3,
    img: blog3,
    title: "How SatvaKrishi Ensures Quality and Transparency for Consumers",
    date: "12 Jan, 2025",
  },
];

const Blog = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        {/* Section Header */}
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Latest Insights
        </h1>
        <p className="text-gray-600">
          Stay informed with tips, stories, and updates from the farming
          community and SatvaKrishi’s initiatives.
        </p>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogData.map((blog) => (
          <div
            key={blog.id}
            className="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              className="w-full h-64 object-cover"
              src={blog.img}
              alt={blog.title}
            />
            <div className="p-6">
              <a
                href="#"
                className="block text-xl font-semibold text-gray-800 hover:text-green-500 transition"
              >
                {blog.title}
              </a>
              <div className="mt-4 text-gray-600 border-t pt-4 flex justify-between items-center text-sm">
                <span className="flex items-center">
                  <i className="fa fa-user text-green-500 mr-2"></i> Admin
                </span>
                <span className="flex items-center">
                  <i className="fa fa-calendar text-green-500 mr-2"></i>
                  {blog.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
