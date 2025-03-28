import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { db } from "../utils/firebaseconfig";
import { collection, addDoc } from "firebase/firestore";
import VoiceAssistant from "../components/VoiceAssistant";

const FarmerSignup = () => {
  const [farmerData, setFarmerData] = useState({ name: "", phone: "", location: "" });
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVoiceInput = (text) => {
    if (step === 1) {
      setFarmerData({ ...farmerData, name: text });
    } else if (step === 2) {
      const cleanedPhone = text.replace(/\D/g, ""); // Remove non-numeric characters
      if (/^\d{10}$/.test(cleanedPhone)) {
        setFarmerData({ ...farmerData, phone: cleanedPhone });
        setError("");
      } else {
        setError("❌ कृपया फक्त १० अंकी मोबाईल नंबर सांगा.");
        return;
      }
    } else if (step === 3) {
      setFarmerData({ ...farmerData, location: text });
      saveFarmerData({ ...farmerData, location: text });
    }
    setStep(step + 1);
  };

  const saveFarmerData = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "farmers"), data);
      console.log("✅ शेतकरी नोंदणी यशस्वी! ID:", docRef.id);

      // 🔄 Store farmer data in localStorage
      localStorage.setItem("farmerLoggedIn", "true");
      localStorage.setItem("farmerName", data.name);
      localStorage.setItem("farmerPhone", data.phone);

      alert("🎉 नोंदणी यशस्वी!");

      // 🔄 Redirect to the Farmer Dashboard
      navigate("/farmer-dashboard", { state: { user: data } });
    } catch (error) {
      console.error("⚠️ त्रुटी:", error);
      setError("❌ नोंदणीमध्ये समस्या आली आहे.");
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-2xl text-center max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-green-700 mb-4">🌱 शेतकरी नोंदणी</h1>
      <p className="text-lg text-gray-600 mt-3">
        {step === 1 ? "🔹 तुमचे नाव सांगा" : step === 2 ? "🔹 तुमचा फोन नंबर सांगा" : "🔹 तुमचे गाव सांगा"}
      </p>

      {error && <p className="mt-3 text-red-600 font-bold">{error}</p>}

      <VoiceAssistant onTextReceived={handleVoiceInput} />

      {step > 3 && (
        <button
          onClick={() => navigate("/farmer-dashboard")}
          className="mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition duration-300"
        >
          🏡 डॅशबोर्डला जा
        </button>
      )}
    </div>
  );
};

export default FarmerSignup;
