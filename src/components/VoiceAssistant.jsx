import React, { useState, useEffect } from "react";
import { useLanguage } from '../context/LanguageContext';

const VoiceAssistant = () => {
  const { language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [synthesis, setSynthesis] = useState(null);
  const [recognition, setRecognition] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Initialize speech synthesis
    if (window.speechSynthesis) {
      setSynthesis(window.speechSynthesis);
    }

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'mr' ? 'mr-IN' : 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        handleCommand(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }
  }, [language]);

  const handleCommand = (command) => {
    const lowerCommand = command.toLowerCase();
    
    // Add command handling logic here
    if (lowerCommand.includes('search') || lowerCommand.includes('शोधा')) {
      // Handle search command
    } else if (lowerCommand.includes('add product') || lowerCommand.includes('उत्पादन जोडा')) {
      // Handle add product command
    }
    // Add more command handlers as needed
  };

  const speak = (text) => {
    if (synthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'mr' ? 'mr-IN' : 'en-US';
      synthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
    if (transcript) {
      setChatHistory([...chatHistory, { text: transcript, isUser: true }]);
      // Here you can add logic to process the transcript and get AI response
      const aiResponse = "This is a sample response"; // Replace with actual AI response
      setChatHistory(prev => [...prev, { text: aiResponse, isUser: false }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-3xl bg-yellow-100 shadow-xl rounded-xl p-6 text-center border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 flex justify-center items-center gap-2">
          🎙️ {language === "mr-IN" ? "आवाज सहाय्यक" : "Voice Assistant"}
        </h2>
        <p className="text-gray-600 mt-2">
          {language === "mr-IN" ? "बोलण्यासाठी बटण दाबा" : "Press button to speak"}
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            className={`px-6 py-3 rounded-lg text-white font-semibold transition ${
              isListening ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={isListening ? stopListening : startListening}
          >
            {language === "mr-IN" ? "❌ थांबा आणि जतन करा" : "❌ Stop and Save"}
          </button>
        </div>

        {transcript && (
          <p className="mt-4 text-gray-700 font-semibold">
            {language === "mr-IN" ? "🔹 ओळखलेले: " : "🔹 Recognized: "}{transcript}
          </p>
        )}

        <div className="mt-6 bg-white rounded-lg p-4 max-h-96 overflow-y-auto">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-3 rounded-lg ${
                message.isUser ? "bg-blue-100 ml-auto" : "bg-gray-100"
              }`}
            >
              <p className="text-gray-800">{message.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
