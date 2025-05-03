import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      // Replace with actual API call
      const mockProducts = [
        {
          id: 1,
          name: 'Fresh Tomatoes',
          category: 'vegetables',
          price: 40,
          unit: 'kg',
          image: '/assets/products/tomatoes.jpg',
          farmer: 'Ramesh Patil',
        },
        // Add more mock products
      ];
      setFeaturedProducts(mockProducts);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    {
      id: 'vegetables',
      name: t('vegetables'),
      icon: '🥬',
      color: 'bg-green-100 text-green-800',
    },
    {
      id: 'fruits',
      name: t('fruits'),
      icon: '🍎',
      color: 'bg-red-100 text-red-800',
    },
    {
      id: 'grains',
      name: t('grains'),
      icon: '🌾',
      color: 'bg-yellow-100 text-yellow-800',
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
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">{t('freshFromFarms')}</span>
                  <span className="block text-green-600">{t('directToYou')}</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  {t('heroDescription')}
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/shop/products"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
                    >
                      {t('shopNow')}
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900">{t('categories')}</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shop/products?category=${category.id}`}
              className={`${category.color} group relative rounded-lg p-6 hover:shadow-lg transition`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{category.icon}</span>
                <h3 className="text-lg font-medium">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900">{t('featuredProducts')}</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/shop/products/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{t(product.category)}</p>
                  <p className="mt-1 text-sm text-gray-500">{product.farmer}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ₹{product.price}/{product.unit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900">{t('whyChooseUs')}</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-6">
            <div className="text-3xl mb-4">🌱</div>
            <h3 className="text-lg font-medium text-gray-900">{t('freshProduce')}</h3>
            <p className="mt-2 text-base text-gray-500">{t('freshProduceDesc')}</p>
          </div>
          <div className="p-6">
            <div className="text-3xl mb-4">👨‍🌾</div>
            <h3 className="text-lg font-medium text-gray-900">{t('supportFarmers')}</h3>
            <p className="mt-2 text-base text-gray-500">{t('supportFarmersDesc')}</p>
          </div>
          <div className="p-6">
            <div className="text-3xl mb-4">🚚</div>
            <h3 className="text-lg font-medium text-gray-900">{t('fastDelivery')}</h3>
            <p className="mt-2 text-base text-gray-500">{t('fastDeliveryDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 