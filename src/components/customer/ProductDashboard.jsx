// src/components/ProductDashboard.js
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebaseconfig"; 
import { collection, getDocs, query, where } from "firebase/firestore";

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const farmerId = localStorage.getItem("farmerId"); // Get current farmer ID
        if (!farmerId) {
          alert("No farmer ID found! Redirecting...");
          window.location.href = "/";
          return;
        }

        const q = query(collection(db, "products"), where("farmerId", "==", farmerId));
        const querySnapshot = await getDocs(q);
        const productsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h2 className="text-center mt-12">Loading products...</h2>;
  }

  if (products.length === 0) {
    return <h2 className="text-center mt-12">❗ No products available.</h2>;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">🌾 Product Dashboard</h1>
      {products.map((product) => (
        <div key={product.id} className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="w-full md:w-1/3">
            <img src={product.imgUrl} alt={product.name} className="w-full h-64 object-cover" />
          </div>
          <div className="w-full md:w-2/3 p-6">
            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mt-2">
              <strong>💸 Price:</strong> ₹{product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>📍 Location:</strong> {product.location}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDashboard;
