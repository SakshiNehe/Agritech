import React, { createContext, useState, useContext } from "react";

// Define translations
const translations = {
  en: {
    // Common
    search: 'Search',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    
    // Navigation
    dashboard: 'Dashboard',
    products: 'Products',
    inventory: 'Inventory',
    orders: 'Orders',
    profile: 'Profile',
    
    // Product related
    addProduct: 'Add Product',
    productName: 'Product Name',
    category: 'Category',
    price: 'Price',
    stock: 'Stock',
    
    // Categories
    vegetables: 'Vegetables',
    fruits: 'Fruits',
    grains: 'Grains',
    
    // Status
    available: 'Available',
    lowStock: 'Low Stock',
    outOfStock: 'Out of Stock',
  },
  mr: {
    // Common
    search: 'शोधा',
    add: 'जोडा',
    edit: 'संपादित करा',
    delete: 'काढून टाका',
    save: 'जतन करा',
    cancel: 'रद्द करा',
    
    // Navigation
    dashboard: 'डॅशबोर्ड',
    products: 'उत्पादने',
    inventory: 'साठा',
    orders: 'ऑर्डर',
    profile: 'प्रोफाइल',
    
    // Product related
    addProduct: 'उत्पादन जोडा',
    productName: 'उत्पादनाचे नाव',
    category: 'श्रेणी',
    price: 'किंमत',
    stock: 'साठा',
    
    // Categories
    vegetables: 'भाज्या',
    fruits: 'फळे',
    grains: 'धान्य',
    
    // Status
    available: 'उपलब्ध',
    lowStock: 'कमी साठा',
    outOfStock: 'साठा संपला',
  },
};

// Create context
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("mr"); // Default Marathi

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "mr" ? "en" : "mr"));
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
