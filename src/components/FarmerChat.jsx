import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const FarmerChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const categories = [
    { id: 'general', name: 'सामान्य सल्ला', icon: '🌱' },
    { id: 'crop', name: 'पीक व्यवस्थापन', icon: '🌾' },
    { id: 'weather', name: 'हवामान माहिती', icon: '🌤️' },
    { id: 'market', name: 'बाजार भाव', icon: '💰' },
  ];

  const quickQuestions = [
    'माझ्या पिकांसाठी योग्य खते कोणती?',
    'आजचा बाजार भाव काय आहे?',
    'पावसाचा अंदाज काय आहे?',
    'रोगांपासून संरक्षण कसे करावे?',
  ];

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      console.error('Browser does not support speech recognition.');
    }
  }, []);

  useEffect(() => {
    if (transcript) {
      handleSendMessage(transcript);
      resetTranscript();
    }
  }, [transcript]);

  const handleSendMessage = (text = inputMessage) => {
    if (text.trim()) {
      const newMessage = {
        text: text.trim(),
        isUser: true,
        timestamp: new Date().toLocaleTimeString(),
        category: selectedCategory,
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
      
      // Simulate AI response (replace with actual AI integration)
      setTimeout(() => {
        const aiResponse = {
          text: "नमस्कार! मी तुमच्या प्रश्नाचे उत्तर देतो. तुम्ही विचारलेल्या प्रश्नासाठी माझी शिफारस अशी आहे की...",
          isUser: false,
          timestamp: new Date().toLocaleTimeString(),
          category: selectedCategory,
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const startListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: false, language: 'mr-IN' });
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">श्रेणी निवडा</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition ${
                      selectedCategory === category.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">द्रुत प्रश्न</h3>
                <div className="space-y-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(question)}
                      className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 bg-green-600 text-white">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span>🤖</span> कृषी सल्लागार
                </h2>
                <p className="text-green-100">तुमच्या कृषी प्रश्नांसाठी आमचा AI सहाय्यक तत्पर आहे</p>
              </div>

              {/* Messages Area */}
              <div className="h-[60vh] overflow-y-auto p-6 space-y-4 bg-gray-50">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        message.isUser
                          ? 'bg-green-600 text-white'
                          : 'bg-white shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm opacity-75">
                          {message.isUser ? '👨‍🌾' : '🤖'}
                        </span>
                        <span className="text-xs opacity-75">{message.timestamp}</span>
                      </div>
                      <p className="text-base">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="तुमचा प्रश्न टाइप करा..."
                    className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition flex items-center gap-2"
                  >
                    <span>पाठवा</span>
                    <span>➤</span>
                  </button>
                  <button
                    onClick={isListening ? stopListening : startListening}
                    className={`p-3 rounded-xl transition flex items-center justify-center w-14 ${
                      isListening
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {isListening ? '⏹️' : '🎤'}
                  </button>
                </div>
                {isListening && (
                  <div className="mt-2 text-sm text-gray-600">
                    बोलत आहे... {transcript}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerChat; 