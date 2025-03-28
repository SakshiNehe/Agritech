// src/pages/FarmerDashboard.jsx
import { useNavigate } from "react-router-dom";

const FarmerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>शेतकरी डॅशबोर्ड</h1>
      <button onClick={() => navigate("/add-product")}>उत्पादन जोडा</button>
      <button onClick={() => navigate("/farmer-queries")}>सामान्य शंका</button>
    </div>
  );
};

export default FarmerDashboard;
