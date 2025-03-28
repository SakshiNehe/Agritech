import React from "react";

const Spinner = () => {
  return (
    <>
      {/* Spinner Component */}
      <div className="flex items-center justify-center min-h-screen">
        {/* Spinner Animation */}
        <div
          id="spinner"
          className="hidden opacity-0 transition-opacity duration-500 ease-out visible:opacity-100 z-[99999] animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"
        ></div>
      </div>

      {/* Button Styles with Tailwind */}
      <div className="flex justify-center space-x-4 mt-6">
        <button className="btn btn-primary bg-blue-500 text-white font-medium px-4 py-2 rounded-md transition duration-500 hover:bg-blue-700">
          Primary Button
        </button>
        <button className="btn btn-secondary bg-gray-500 text-white font-medium px-4 py-2 rounded-md transition duration-500 hover:bg-gray-700">
          Secondary Button
        </button>
        <button className="btn btn-outline-primary border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition duration-500">
          Outline Primary
        </button>
        <button className="btn btn-outline-secondary border border-gray-500 text-gray-500 px-4 py-2 rounded-md hover:bg-gray-500 hover:text-white transition duration-500">
          Outline Secondary
        </button>
      </div>

      {/* Square Buttons */}
      <div className="flex justify-center space-x-4 mt-6">
        <button className="btn btn-square w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300">
          S
        </button>
        <button className="btn btn-sm-square w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-300">
          M
        </button>
        <button className="btn btn-lg-square w-12 h-12 flex items-center justify-center bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-300">
          L
        </button>
      </div>
    </>
  );
};

export default Spinner;
