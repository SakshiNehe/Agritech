import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const ShopHome = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Simulated data - Replace with API calls
  const categories = [
    { id: 1, name: t('vegetables'), icon: '🥬', count: 45 },
    { id: 2, name: t('fruits'), icon: '🍎', count: 32 },
    { id: 3, name: t('grains'), icon: '🌾', count: 28 },
    { id: 4, name: t('dairy'), icon: '🥛', count: 15 },
    { id: 5, name: t('spices'), icon: '🌶️', count: 20 },
    { id: 6, name: t('organic'), icon: '🌱', count: 25 },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'टोमॅटो',
      price: '₹40/kg',
      image: '/assets/products/tomatoes.jpg',
      farmer: 'राजेश पाटील',
      rating: 4.5,
      organic: true,
    },
    {
      id: 2,
      name: 'आंबा',
      price: '₹400/dozen',
      image: '/assets/products/mangoes.jpg',
      farmer: 'सुनीता मोरे',
      rating: 4.8,
      organic: true,
    },
    {
      id: 3,
      name: 'तांदूळ',
      price: '₹60/kg',
      image: '/assets/products/rice.jpg',
      farmer: 'विजय शिंदे',
      rating: 4.3,
      organic: false,
    },
    {
      id: 4,
      name: 'कांदा',
      price: '₹35/kg',
      image: '/assets/products/onions.jpg',
      farmer: 'प्रकाश जाधव',
      rating: 4.6,
      organic: true,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-green-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('shopHeroTitle')}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-green-100">
              {t('shopHeroSubtitle')}
            </p>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="absolute right-2 top-2 bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800 transition">
                {t('search')}
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-1/3 h-full hidden md:block">
          {/* Add decorative image or pattern */}
        </div>
      </div>

      {/* Categories */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">{t('categories')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/shop/products?category=${category.id}`}
                className="bg-white rounded-xl p-6 text-center hover:shadow-md transition group"
              >
                <span className="text-4xl mb-4 block transform group-hover:scale-110 transition">
                  {category.icon}
                </span>
                <h3 className="font-medium text-gray-800 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">
                  {category.count} {t('items')}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">{t('featuredProducts')}</h2>
            <Link
              to="/shop/products"
              className="text-green-600 hover:text-green-700 transition"
            >
              {t('viewAll')} →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/shop/product/${product.id}`}
                className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">{product.name}</h3>
                    <span className="text-green-600 font-bold">{product.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{product.farmer}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                    {product.organic && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        🌱 {t('organic')}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-12">
            {t('whyChooseUs')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <span className="text-4xl mb-4 block">🌱</span>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t('freshAndOrganic')}
              </h3>
              <p className="text-gray-600">{t('freshAndOrganicDesc')}</p>
            </div>
            <div className="text-center">
              <span className="text-4xl mb-4 block">👨‍🌾</span>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t('supportLocalFarmers')}
              </h3>
              <p className="text-gray-600">{t('supportLocalFarmersDesc')}</p>
            </div>
            <div className="text-center">
              <span className="text-4xl mb-4 block">🚚</span>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t('fastDelivery')}
              </h3>
              <p className="text-gray-600">{t('fastDeliveryDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHome; 