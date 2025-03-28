import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebaseconfig";

const SignupVoiceChat = () => {
  const navigate = useNavigate();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [step, setStep] = useState(0);
  const [signupData, setSignupData] = useState({ name: "", phone: "", location: "" });
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const questions = [
    "तुमचे संपूर्ण नाव सांगा",
    "तुमचा मोबाईल नंबर सांगा",
    "तुमचे गावाचे नाव सांगा",
  ];

  useEffect(() => {
    if (!listening && transcript.trim()) {
      processTranscript();
    }
  }, [listening]);

  const speak = (text, callback) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "mr-IN";
    speech.onstart = () => setIsSpeaking(true);
    speech.onend = () => {
      setIsSpeaking(false);
      if (callback) callback();
    };
    window.speechSynthesis.speak(speech);
  };

  const startListening = () => {
    if (!isSpeaking) {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: "mr-IN" });
      speak(questions[step]);
    }
  };

  const processTranscript = () => {
    if (!transcript.trim()) {
      speak("कृपया योग्य माहिती द्या.");
      return;
    }

    const newData = { ...signupData };
    if (step === 0) newData.name = transcript;
    if (step === 1) newData.phone = transcript.replace(/\s/g, "");
    if (step === 2) newData.location = transcript;

    setSignupData(newData);
    speak(`"${transcript}" नोंदवले गेले.`, () => {
      if (step < questions.length - 1) {
        setStep(step + 1);
        startListening();
      } else {
        speak("आपली सर्व माहिती नोंद झाली आहे. कृपया पुष्टी करा.");
        setIsConfirming(true);
      }
    });
  };

  const confirmSignup = async () => {
    try {
      const farmersRef = collection(db, "farmers");
      const q = query(farmersRef, where("phone", "==", signupData.phone));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        speak("तुम्ही आधीच नोंदणीकृत आहात. तुम्हाला थेट डॅशबोर्डकडे वळवले जात आहे.", () => {
          navigate("/farmer-landing");
        });
      } else {
        await addDoc(farmersRef, signupData);
        speak("तुमचे साइनअप पूर्ण झाले! धन्यवाद!", () => {
          navigate("/farmer-landing");
        });
      }
    } catch (error) {
      console.error("Error checking farmer data:", error);
      speak("क्षमा करा, काही समस्या उद्भवली आहे. कृपया पुन्हा प्रयत्न करा.");
    }
  };

  const clearData = () => {
    resetTranscript();
    setSignupData({ name: "", phone: "", location: "" });
    setStep(0);
    setIsConfirming(false);
    speak("माहिती पुसली गेली.", startListening);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-2xl text-center max-w-lg mx-auto border border-gray-200 w-full sm:w-3/4 md:w-1/2">
      <h1 className="text-3xl font-bold text-green-700 mb-4">🔊साइनअप</h1>

      {!isConfirming ? (
        <>
          <p className="text-xl font-medium text-gray-700">{questions[step]}</p>

          <div className="mt-6 space-x-4 flex flex-wrap justify-center">
            <button
              onClick={startListening}
              className={`px-6 py-3 rounded-lg transition ${
                listening ? "bg-gray-400" : "bg-green-600 hover:bg-green-700 text-white"
              }`}
              disabled={listening}
            >
              🎤 {listening ? "ऐकते आहे..." : "बोलायला सुरुवात करा"}
            </button>

            <button
              onClick={processTranscript}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              disabled={!transcript.trim()}
            >
              ⏭️ पुढे जा
            </button>

            <button
              onClick={clearData}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              ❌ साफ करा
            </button>
          </div>

          <p className="mt-3 text-lg text-gray-600">🔹 {transcript}</p>

          <button
            onClick={() => navigate("/login")}
            className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            ⚡ आधीपासून खाते आहे? लॉगिन करा
          </button>
        </>
      ) : (
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-800">✅ पुष्टी करा</h2>
          <p className="text-gray-700">
            नाव: <b>{signupData.name}</b> <br />
            फोन नंबर: <b>{signupData.phone}</b> <br />
            गाव: <b>{signupData.location}</b>
          </p>

          <button
            onClick={confirmSignup}
            className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            📝 साठवा आणि पुढे जा
          </button>

          <button
            onClick={clearData}
            className="mt-4 ml-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            ❌ साफ करा
          </button>
        </div>
      )}
    </div>
  );
};

export default SignupVoiceChat;
