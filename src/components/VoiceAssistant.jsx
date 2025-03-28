import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Browser does not support voice recognition.");
    }
  }, []);

  const startListening = () => {
    setIsListening(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false, language: "mr-IN" });
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-3xl bg-yellow-100 shadow-xl rounded-xl p-6 text-center border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 flex justify-center items-center gap-2">
          🎙️ आवाज सहाय्यक
        </h2>
        <p className="text-gray-600 mt-2">बोलण्यासाठी बटण दाबा</p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            className={`px-6 py-3 rounded-lg text-white font-semibold transition ${
              listening ? "bg-green-500" : "bg-green-600 hover:bg-green-700"
            }`}
            onClick={startListening}
            disabled={listening}
          >
            ✅ ऐकायला सुरू करा
          </button>

          <button
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
            onClick={stopListening}
            disabled={!listening}
          >
            ❌ थांबा आणि जतन करा
          </button>
        </div>

        {transcript && (
          <p className="mt-4 text-gray-700 font-semibold">🔹 ओळखलेले: {transcript}</p>
        )}
      </div>
    </div>
  );
};

export default VoiceAssistant;
