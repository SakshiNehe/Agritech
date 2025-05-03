import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const SignInSelection = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-16 w-auto"
          src="/assets/logo.svg"
          alt="AgriTech"
        />
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          {t('selectLoginType')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('chooseAccountType')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            {/* Farmer Login Option */}
            <Link
              to="/farmer/login"
              className="w-full flex justify-center items-center gap-3 px-4 py-4 border border-green-300 rounded-md shadow-sm text-lg font-medium text-green-700 bg-green-50 hover:bg-green-100 transition"
            >
              <span className="text-2xl">👨‍🌾</span>
              {t('loginAsFarmer')}
            </Link>

            {/* Customer Login Option */}
            <Link
              to="/customer/login"
              className="w-full flex justify-center items-center gap-3 px-4 py-4 border border-blue-300 rounded-md shadow-sm text-lg font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition"
            >
              <span className="text-2xl">🛒</span>
              {t('loginAsCustomer')}
            </Link>

            {/* Guest Shopping Option */}
            <Link
              to="/shop"
              className="w-full flex justify-center items-center gap-3 px-4 py-4 border border-gray-300 rounded-md shadow-sm text-lg font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition"
            >
              <span className="text-2xl">🏪</span>
              {t('continueAsGuest')}
            </Link>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {t('newToAgritech')}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Link
                to="/farmer/register"
                className="flex justify-center items-center px-4 py-2 border border-green-300 rounded-md shadow-sm text-sm font-medium text-green-700 bg-white hover:bg-green-50 transition"
              >
                {t('registerAsFarmer')}
              </Link>
              <Link
                to="/customer/register"
                className="flex justify-center items-center px-4 py-2 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 transition"
              >
                {t('registerAsCustomer')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInSelection; 