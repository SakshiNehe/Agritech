
import { useNavigate } from "react-router-dom";
import React from "react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>कृषीमार्टमध्ये तुमचे स्वागत आहे</h1>
      <button onClick={() => navigate("/farmer-signup")}>शेतकरी</button>
      <button onClick={() => navigate("/customer-home")}>ग्राहक</button>
    </div>
  );
};

export default Home;
