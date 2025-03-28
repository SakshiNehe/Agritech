import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebaseconfig";

const FarmerLogin = () => {
  const navigate = useNavigate();
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [spokenText, setSpokenText] = useState(""); // Shows real-time speech input
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Store logged-in user data

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("तुमच्या ब्राउझरमध्ये आवाज ओळखण्याची सुविधा उपलब्ध नाही.");
      return;
    }
    startListening();
  }, []);

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: "mr-IN" });
    speak("लॉगिनसाठी तुमचा १० अंकी मोबाईल नंबर सांगा.");
  };

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "mr-IN";
    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    let cleanedNumber = transcript.trim().replace(/\D/g, ""); // Remove non-numeric characters
    setSpokenText(transcript); // Display what farmer is saying
    if (/^\d{10}$/.test(cleanedNumber)) {
      setPhoneNumber(cleanedNumber);
    }
  }, [transcript]);

  const checkFarmerExists = async () => {
    const cleanedNumber = phoneNumber.trim();

    // ✅ Ensure the input is exactly 10 digits before querying Firebase
    if (!/^\d{10}$/.test(cleanedNumber)) {
      speak("कृपया फक्त १० अंकी मोबाईल नंबर बोला.");
      setError("❌ वैध १० अंकी मोबाईल नंबर आवश्यक आहे.");
      return;
    }

    setLoading(true);
    try {
      const farmersRef = collection(db, "farmers");
      const q = query(farmersRef, where("phone", "==", cleanedNumber)); // 🔍 Ensuring Exact Match
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const farmerData = querySnapshot.docs[0].data();
        setCurrentUser(farmerData);
        console.log("✅ Current Logged-in User:", farmerData.name);

        speak(`लॉगिन यशस्वी! स्वागत आहे, ${farmerData.name}.`);

        // 🔄 Store farmer login info in localStorage for persistence
        localStorage.setItem("farmerLoggedIn", "true");
        localStorage.setItem("farmerName", farmerData.name);
        localStorage.setItem("farmerPhone", farmerData.phone);

        setTimeout(() => {
          navigate("/farmer-landing-page", { state: { user: farmerData } });
        }, 2000);
      } else {
        speak("हा नंबर नोंदणीकृत नाही. कृपया प्रथम नोंदणी करा.");
        setError("❌ तुमचा नंबर आमच्या डेटाबेसमध्ये नाही.");
      }
    } catch (error) {
      console.error("Error checking farmer:", error);
      speak("काहीतरी चूक झाली आहे. कृपया पुन्हा प्रयत्न करा.");
      setError("❌ लॉगिनमध्ये समस्या आहे.");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-2xl text-center max-w-lg mx-auto transition-transform transform scale-100 hover:scale-105 duration-300 ease-in-out">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">🔊 लॉगिन</h1>
      <p className="text-lg text-gray-600 mt-3">📞 {phoneNumber || " फोननंबर सांगा..."}</p>
      <p className="text-sm text-gray-500 italic">🎤 तुम्ही म्हणालात: {spokenText}</p> {/* Shows spoken text */}
      
      {error && <p className="mt-3 text-red-600 font-bold">{error}</p>}

      <button
        onClick={checkFarmerExists}
        className="mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition duration-300 animate-pulse"
        disabled={loading}
      >
        {loading ? "⏳ तपासत आहे..." : "🔍 लॉगिन तपासा"}
      </button>

      <button
        onClick={() => navigate("/farmer-signup")}
        className="mt-3 px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition duration-300"
      >
        📝 नोंदणी करा
      </button>

      {currentUser && (
        <div className="mt-5 p-4 bg-green-100 text-green-800 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">👋 नमस्कार, {currentUser.name}!</h2>
          <p className="text-md">✅ लॉगिन यशस्वी! तुमच्या सेवेसाठी आम्ही सदैव तयार आहोत! 🌱🚜</p>
        </div>
      )}
    </div>
  );
};

export default FarmerLogin;
