// src/pages/AddProduct.jsx
import { useState } from "react";
import React from "react";
import { db } from "../config/firebaseconfig";
import { collection, addDoc } from "firebase/firestore";
import VoiceAssistant from "../components/VoiceAssistant";

const AddProduct = () => {
  const [productData, setProductData] = useState({ name: "", price: "", quantity: "" });
  const [step, setStep] = useState(1);

  const handleVoiceInput = (text) => {
    if (step === 1) setProductData({ ...productData, name: text });
    else if (step === 2) setProductData({ ...productData, price: text });
    else if (step === 3) {
      setProductData({ ...productData, quantity: text });
      saveProduct({ ...productData, quantity: text });
    }
    setStep(step + 1);
  };

  const saveProduct = async (data) => {
    try {
      await addDoc(collection(db, "products"), data);
      alert("उत्पादन जोडले!");
    } catch (error) {
      console.error("त्रुटी: ", error);
    }
  };

  return (
    <div>
      <h1>उत्पादन जोडा</h1>
      <p>{step === 1 ? "उत्पादनाचे नाव सांगा" : step === 2 ? "किंमत सांगा" : "प्रमाण सांगा"}</p>
      <VoiceAssistant onTextReceived={handleVoiceInput} />
    </div>
  );
};

export default AddProduct;
