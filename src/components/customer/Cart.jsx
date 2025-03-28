// src/components/Cart.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  // Load Cart Data from localStorage
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItems);

    // Calculate Total Price
    calculateTotal(cartItems);
  }, []);

  // Calculate Total Price
  const calculateTotal = (cartItems) => {
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  };

  // Increment Quantity
  const incrementQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  // Decrement Quantity
  const decrementQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem("Cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  // Remove Item from Cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  // Proceed to Buy Individual Product
  const goToBuyPage = (item) => {
    localStorage.setItem("selectedProduct", JSON.stringify(item));
    navigate("/BuyNow");
  };

  // Buy All Items in Cart
  const proceedToBuyAll = () => {
    if (cart.length === 0) {
      alert("🛑 Your cart is empty! Add items before proceeding.");
      return;
    }
    localStorage.setItem("cartToBuy", JSON.stringify(cart));
    navigate("/BuyNow");
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          🛑 Your cart is empty. Add items to continue!
        </p>
      ) : (
        <div className="space-y-6">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden"
            >
              {/* Product Image */}
              <img
                src={item.imgUrl}
                alt={item.name}
                className="w-full md:w-1/3 h-48 object-cover"
              />

              {/* Product Details */}
              <div className="w-full md:w-2/3 p-6">
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-gray-500 mb-4">
                  ₹{item.price.toFixed(2)} x {item.quantity} = ₹
                  {(item.price * item.quantity).toFixed(2)}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-4 mb-4">
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
                  >
                    ➖
                  </button>
                  <span className="text-lg font-bold">{item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
                  >
                    ➕
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => goToBuyPage(item)}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300"
                  >
                    🛒 Buy Now
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300"
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Total Price Section */}
          <div className="text-center mt-8">
            <h2 className="text-2xl font-bold text-green-700">
              🧾 Total Amount: ₹{total.toFixed(2)}
            </h2>
          </div>

          {/* Buy All Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={proceedToBuyAll}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition duration-300"
            >
              🛍️ Buy All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
