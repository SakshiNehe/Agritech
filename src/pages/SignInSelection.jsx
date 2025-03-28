import React from "react";
import { Link } from "react-router-dom";
import client from "../assets/images/client.png";
import farmer from "../assets/images/farmer.png";


const SignInSelection = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Choose Your Role</h1>
      
      <div className="flex space-x-10">
        {/* Customer Sign-In Option */}
        <Link to="/customer-signup" className="group flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
          <img src={client} alt="Customer" className="w-32 h-32 mb-4 rounded-full border-2 border-gray-300 group-hover:border-orange-500 transition" />
          <span className="text-xl font-semibold text-gray-800 group-hover:text-orange-500 transition">Customer</span>
        </Link>

        {/* Farmer Sign-In Option */}
        <Link to="/farmer-signup" className="group flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
          <img src={farmer} alt="Farmer" className="w-32 h-32 mb-4 rounded-full border-2 border-gray-300 group-hover:border-green-500 transition" />
          <span className="text-xl font-semibold text-gray-800 group-hover:text-green-500 transition">Farmer</span>
        </Link>
      </div>
    </div>
  );
};

export default SignInSelection;
