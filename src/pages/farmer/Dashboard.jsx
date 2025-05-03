import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Dashboard = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeListings: 0,
    totalOrders: 0,
    revenue: 0,
  });
  const [weatherInfo, setWeatherInfo] = useState({
    temperature: '',
    condition: '',
    forecast: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // Replace with actual API calls
        await Promise.all([
          fetchStats(),
          fetchWeatherInfo(),
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const fetchStats = async () => {
    // Replace with actual API call
    const mockStats = {
      totalProducts: 15,
      activeListings: 8,
      totalOrders: 25,
      revenue: 45000,
    };
    setStats(mockStats);
  };

  const fetchWeatherInfo = async () => {
    // Replace with actual weather API call
    const mockWeather = {
      temperature: '28°C',
      condition: 'Partly Cloudy',
      forecast: 'Light rain expected tomorrow',
    };
    setWeatherInfo(mockWeather);
  };

  const quickActions = [
    {
      title: t('addProduct'),
      icon: '🌾',
      link: '/farmer/add-product',
      color: 'bg-green-100 text-green-800',
    },
    {
      title: t('viewInventory'),
      icon: '📦',
      link: '/farmer/inventory',
      color: 'bg-blue-100 text-blue-800',
    },
    {
      title: t('manageOrders'),
      icon: '📋',
      link: '/farmer/orders',
      color: 'bg-purple-100 text-purple-800',
    },
    {
      title: t('viewAnalytics'),
      icon: '📊',
      link: '/farmer/analytics',
      color: 'bg-orange-100 text-orange-800',
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {t('welcomeBack')}
          </h2>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-3xl">🌾</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{t('totalProducts')}</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalProducts}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-3xl">📦</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{t('activeListings')}</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.activeListings}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-3xl">📋</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{t('totalOrders')}</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalOrders}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-3xl">💰</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{t('totalRevenue')}</dt>
                  <dd className="text-lg font-medium text-gray-900">₹{stats.revenue}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Card */}
      <div className="mt-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <span className="text-2xl mr-2">🌤️</span>
              {t('weatherUpdate')}
            </h3>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="flex items-center">
                <span className="text-xl mr-2">🌡️</span>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('temperature')}</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{weatherInfo.temperature}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-xl mr-2">☁️</span>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('condition')}</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{weatherInfo.condition}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-xl mr-2">📅</span>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('forecast')}</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{weatherInfo.forecast}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {t('quickActions')}
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.link}
              className={`${action.color} overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow`}
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-3xl">{action.icon}</span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <div className="text-sm font-medium truncate">{action.title}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 