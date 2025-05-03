import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Cart = () => {
  const { t } = useLanguage();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      // Replace with actual API call
      const mockCartItems = [
        {
          id: 1,
          name: 'Fresh Tomatoes',
          price: 40,
          quantity: 2,
          unit: 'kg',
          image: '/assets/products/tomatoes.jpg',
          farmer: 'Ramesh Patil',
        },
        // Add more mock items
      ];
      setCartItems(mockCartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateDeliveryFee = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 500 ? 0 : 40;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateDeliveryFee();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <span className="text-6xl">🛒</span>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            {t('cartEmpty')}
          </h2>
          <p className="mt-2 text-gray-600">{t('cartEmptyMessage')}</p>
          <div className="mt-6">
            <Link
              to="/shop/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {t('startShopping')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900">{t('shoppingCart')}</h1>

      <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-7">
          {/* Cart Items */}
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.id} className="py-6">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-base font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{item.farmer}</p>
                      </div>
                      <p className="text-base font-medium text-gray-900">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border rounded-md">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-gray-600 hover:text-gray-700"
                        >
                          -
                        </button>
                        <span className="px-4 text-gray-900">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-gray-600 hover:text-gray-700"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-sm font-medium text-red-600 hover:text-red-500"
                      >
                        {t('remove')}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Summary */}
        <div className="mt-8 lg:mt-0 lg:col-span-5">
          <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">{t('orderSummary')}</h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">{t('subtotal')}</p>
                <p className="text-sm font-medium text-gray-900">₹{calculateSubtotal()}</p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">{t('deliveryFee')}</p>
                <p className="text-sm font-medium text-gray-900">
                  {calculateDeliveryFee() === 0 ? t('free') : `₹${calculateDeliveryFee()}`}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <p className="text-base font-medium text-gray-900">{t('total')}</p>
                <p className="text-base font-medium text-gray-900">₹{calculateTotal()}</p>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {t('proceedToCheckout')}
              </button>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500">
                {calculateSubtotal() < 500 && (
                  <span>
                    {t('freeDeliveryMessage', { amount: 500 - calculateSubtotal() })}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 