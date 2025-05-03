import React from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import Header from './Header';
import Footer from './Footer';
import VoiceAssistant from '../VoiceAssistant';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const { t } = useLanguage();
  
  // Determine if the current route is a farmer route
  const isFarmerRoute = location.pathname.startsWith('/farmer');
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header isFarmerRoute={isFarmerRoute} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      <VoiceAssistant />
      <Footer />
    </div>
  );
};

export default MainLayout; 