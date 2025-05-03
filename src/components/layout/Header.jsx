import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Header = ({ isFarmerRoute }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const farmerNavItems = [
    { path: '/farmer/dashboard', label: t('dashboard') },
    { path: '/farmer/inventory', label: t('inventory') },
    { path: '/farmer/add-product', label: t('addProduct') },
    { path: '/farmer/orders', label: t('orders') },
    { path: '/farmer/profile', label: t('profile') },
  ];

  const shopNavItems = [
    { path: '/shop', label: 'Shop' },
    { path: '/shop/products', label: t('products') },
    { path: '/shop/cart', label: 'Cart' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/assets/logo.svg" alt="AgriTech" className="h-10" />
            <span className="text-2xl font-bold text-green-600">AgriTech</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {isFarmerRoute ? (
              // Farmer Navigation
              <>
                {farmerNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-gray-600 hover:text-green-600 transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </>
            ) : (
              // Shop Navigation
              <>
                {shopNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-gray-600 hover:text-green-600 transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition"
            >
              {language === 'mr' ? '🌐 English' : '🌐 मराठी'}
            </button>

            {/* Auth Buttons */}
            {!isFarmerRoute && (
              <div className="flex items-center gap-3">
                <Link
                  to="/farmer/login"
                  className="text-gray-600 hover:text-green-600 transition"
                >
                  {t('farmerLogin')}
                </Link>
                <Link
                  to="/customer/login"
                  className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
                >
                  {t('login')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 