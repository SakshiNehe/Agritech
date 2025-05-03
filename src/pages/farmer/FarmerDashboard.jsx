import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import VoiceAssistant from '../../components/VoiceAssistant';

const FarmerDashboard = () => {
  const { t } = useLanguage();
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  // Simulated data - Replace with actual API calls
  const stats = {
    totalProducts: 15,
    activeListings: 12,
    totalOrders: 45,
    revenue: '₹25,000',
    pendingOrders: 3,
    lowStockItems: 2,
  };

  const recentOrders = [
    { id: 1, product: 'टोमॅटो', quantity: '10kg', price: '₹400', status: 'pending' },
    { id: 2, product: 'आंबा', quantity: '5 dozen', price: '₹2000', status: 'delivered' },
    { id: 3, product: 'कांदा', quantity: '15kg', price: '₹600', status: 'processing' },
  ];

  useEffect(() => {
    // Simulated weather API call
    const fetchWeatherData = async () => {
      // Replace with actual weather API call
      setWeatherData({
        temperature: '28°C',
        condition: 'Sunny',
        humidity: '65%',
        rainfall: '0mm',
        forecast: [
          { day: 'Mon', temp: '28°C', condition: '☀️' },
          { day: 'Tue', temp: '27°C', condition: '🌤️' },
          { day: 'Wed', temp: '29°C', condition: '☀️' },
          { day: 'Thu', temp: '26°C', condition: '🌧️' },
          { day: 'Fri', temp: '25°C', condition: '🌧️' },
        ],
      });
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-green-600 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                नमस्कार, रमेश पाटील 👋
              </h1>
              <p className="text-green-100">
                आजचा दिवस आपल्या शेतीसाठी चांगला आहे!
              </p>
            </div>
            <button
              onClick={() => setShowVoiceAssistant(true)}
              className="bg-white text-green-600 px-4 py-2 rounded-full font-semibold hover:bg-green-50 transition flex items-center gap-2"
            >
              <span>🎤</span> आवाज सहाय्यक
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('products')}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">{t('totalProducts')}</p>
                <p className="text-2xl font-bold text-green-600">{stats.totalProducts}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('activeListings')}</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeListings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('orders')}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">{t('totalOrders')}</p>
                <p className="text-2xl font-bold text-green-600">{stats.totalOrders}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('revenue')}</p>
                <p className="text-2xl font-bold text-green-600">{stats.revenue}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('alerts')}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">{t('pendingOrders')}</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('lowStock')}</p>
                <p className="text-2xl font-bold text-red-600">{stats.lowStockItems}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('quickActions')}</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/farmer/add-product"
                className="flex items-center gap-2 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition"
              >
                <span className="text-2xl">➕</span>
                <span className="text-green-700">{t('addProduct')}</span>
              </Link>
              <Link
                to="/farmer/inventory"
                className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
              >
                <span className="text-2xl">📦</span>
                <span className="text-blue-700">{t('manageInventory')}</span>
              </Link>
              <Link
                to="/farmer/orders"
                className="flex items-center gap-2 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
              >
                <span className="text-2xl">📋</span>
                <span className="text-purple-700">{t('viewOrders')}</span>
              </Link>
              <Link
                to="/farmer/profile"
                className="flex items-center gap-2 p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition"
              >
                <span className="text-2xl">👤</span>
                <span className="text-yellow-700">{t('editProfile')}</span>
              </Link>
            </div>
          </div>

          {/* Weather Widget */}
          {weatherData && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('weather')}</h3>
              <div className="flex items-center gap-6 mb-6">
                <div className="text-5xl">{weatherData.condition === 'Sunny' ? '☀️' : '🌤️'}</div>
                <div>
                  <p className="text-3xl font-bold text-gray-800">{weatherData.temperature}</p>
                  <p className="text-gray-600">{weatherData.condition}</p>
                </div>
                <div className="ml-auto">
                  <p className="text-sm text-gray-600">
                    {t('humidity')}: {weatherData.humidity}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t('rainfall')}: {weatherData.rainfall}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {weatherData.forecast.map((day) => (
                  <div key={day.day} className="text-center">
                    <p className="text-sm font-medium text-gray-600">{day.day}</p>
                    <p className="text-xl my-1">{day.condition}</p>
                    <p className="text-sm text-gray-600">{day.temp}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('recentOrders')}</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">{t('product')}</th>
                  <th className="text-left py-3 px-4">{t('quantity')}</th>
                  <th className="text-left py-3 px-4">{t('price')}</th>
                  <th className="text-left py-3 px-4">{t('status')}</th>
                  <th className="text-left py-3 px-4">{t('action')}</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-3 px-4">{order.product}</td>
                    <td className="py-3 px-4">{order.quantity}</td>
                    <td className="py-3 px-4">{order.price}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {t(order.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800 transition">
                        {t('viewDetails')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Voice Assistant Modal */}
      {showVoiceAssistant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold">आवाज सहाय्यक</h3>
              <button
                onClick={() => setShowVoiceAssistant(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <VoiceAssistant />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard; 