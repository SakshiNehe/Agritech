import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FarmerLandingPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [farmerName, setFarmerName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Check if the farmer is logged in
    const farmerAuth = localStorage.getItem("farmerLoggedIn");
    const name = localStorage.getItem("farmerName");
    setIsLoggedIn(farmerAuth === "true");
    if (name) setFarmerName(name);

    // Check for success message
    const message = localStorage.getItem("successMessage");
    if (message) {
      setSuccessMessage(message);
      setTimeout(() => {
        setSuccessMessage("");
        localStorage.removeItem("successMessage");
      }, 3000);
    }
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-green-100 p-6">
      {/* Top-right corner user info & dropdown */}
      {isLoggedIn && (
        <div className="absolute top-4 right-4">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-green-700 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-green-800"
            >
              {farmerName} ⬇️
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md overflow-hidden">
                <button
                  onClick={() => navigate("/farmer-blogs")}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  📜 शेतकरी ब्लॉग्स
                </button>
                <button
                  onClick={() => navigate("/farmer-profile")}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  👤 माझी माहिती
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("farmerLoggedIn");
                    localStorage.removeItem("farmerName");
                    setIsLoggedIn(false);
                    setFarmerName("");
                    navigate("/");
                  }}
                  className="block px-4 py-2 text-red-600 hover:bg-gray-200 w-full text-left"
                >
                  🚪 लॉगआउट
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <h1 className="text-4xl font-bold text-green-700 mb-4">🌾 शेतकरी डॅशबोर्ड</h1>
      <p className="text-lg text-gray-700 mb-6">कृपया खालील पर्याय निवडा</p>

      {successMessage && (
        <div className="bg-green-500 text-white px-4 py-2 rounded-md mb-4">
          ✅ {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add Product Button - Only if logged in */}
        <button
          onClick={() => (isLoggedIn ? navigate("/add-product") : alert("कृपया लॉगिन करा"))}
          className={`flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 border ${
            isLoggedIn ? "border-green-400" : "border-gray-400 opacity-50 cursor-not-allowed"
          }`}
          disabled={!isLoggedIn}
        >
          <span className="text-2xl font-semibold text-green-800">🛒 उत्पादन जोडा</span>
          <p className="text-gray-600 mt-2">तुमची उत्पादने सूचीबद्ध करा</p>
        </button>

        {/* Regular Queries Button */}
        <button
          onClick={() => navigate("/voice-assistant")}
          className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 border border-blue-400"
        >
          <span className="text-2xl font-semibold text-blue-800">🔊 नियमित प्रश्न</span>
          <p className="text-gray-600 mt-2">आपल्या प्रश्नांसाठी व्हॉईस असिस्टंट वापरा</p>
        </button>
      </div>
    </div>
  );
};

export default FarmerLandingPage;
