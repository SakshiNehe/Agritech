import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const CustomerProfile = () => {
  const { t } = useLanguage();
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    image: null,
    preferences: {
      notifications: true,
      newsletter: false,
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // Replace with actual API call
      const mockProfile = {
        name: 'John Doe',
        phone: '9876543210',
        email: 'john.doe@example.com',
        address: '123 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        image: '/assets/profiles/customer.jpg',
        preferences: {
          notifications: true,
          newsletter: false,
        },
      };
      setProfile(mockProfile);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'file') {
      const file = e.target.files[0];
      if (file) {
        setProfile(prev => ({ ...prev, image: URL.createObjectURL(file) }));
      }
    } else if (type === 'checkbox') {
      setProfile(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [name]: checked,
        },
      }));
    } else {
      setProfile(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!profile.name.trim()) {
      newErrors.name = t('nameRequired');
    }

    if (!profile.phone) {
      newErrors.phone = t('phoneRequired');
    } else if (!/^\d{10}$/.test(profile.phone)) {
      newErrors.phone = t('invalidPhone');
    }

    if (!profile.email) {
      newErrors.email = t('emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = t('invalidEmail');
    }

    if (!profile.address.trim()) {
      newErrors.address = t('addressRequired');
    }

    if (!profile.city.trim()) {
      newErrors.city = t('cityRequired');
    }

    if (!profile.state.trim()) {
      newErrors.state = t('stateRequired');
    }

    if (!profile.pincode.trim()) {
      newErrors.pincode = t('pincodeRequired');
    } else if (!/^\d{6}$/.test(profile.pincode)) {
      newErrors.pincode = t('invalidPincode');
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);
    try {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
    } catch (error) {
      setErrors({
        submit: t('updateProfileError'),
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {t('profile')}
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              {t('profileDescription')}
            </p>
          </div>
        </div>

        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                {/* Profile Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('photo')}
                  </label>
                  <div className="mt-2 flex items-center">
                    <span className="inline-block h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                      {profile.image ? (
                        <img
                          src={profile.image}
                          alt={profile.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )}
                    </span>
                    {isEditing && (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      />
                    )}
                  </div>
                </div>

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    {t('fullName')}
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={profile.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    {t('phoneNumber')}
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t('email')}
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={profile.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Address Field */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    {t('address')}
                  </label>
                  <div className="mt-1">
                    <textarea
                      name="address"
                      id="address"
                      rows={3}
                      value={profile.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                    {errors.address && (
                      <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                    )}
                  </div>
                </div>

                {/* City, State, and Pincode Fields */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      {t('city')}
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={profile.city}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          !isEditing ? 'bg-gray-50' : ''
                        }`}
                      />
                      {errors.city && (
                        <p className="mt-2 text-sm text-red-600">{errors.city}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      {t('state')}
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="state"
                        id="state"
                        value={profile.state}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          !isEditing ? 'bg-gray-50' : ''
                        }`}
                      />
                      {errors.state && (
                        <p className="mt-2 text-sm text-red-600">{errors.state}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                      {t('pincode')}
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="pincode"
                        id="pincode"
                        value={profile.pincode}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          !isEditing ? 'bg-gray-50' : ''
                        }`}
                      />
                      {errors.pincode && (
                        <p className="mt-2 text-sm text-red-600">{errors.pincode}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-4">
                    {t('preferences')}
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="notifications"
                          name="notifications"
                          type="checkbox"
                          checked={profile.preferences.notifications}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="notifications" className="font-medium text-gray-700">
                          {t('orderNotifications')}
                        </label>
                        <p className="text-gray-500">{t('orderNotificationsDesc')}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="newsletter"
                          name="newsletter"
                          type="checkbox"
                          checked={profile.preferences.newsletter}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="newsletter" className="font-medium text-gray-700">
                          {t('newsletter')}
                        </label>
                        <p className="text-gray-500">{t('newsletterDesc')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                {isEditing ? (
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      {t('cancel')}
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                        isSaving ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSaving ? t('saving') : t('save')}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    {t('edit')}
                  </button>
                )}
              </div>

              {/* General Error Message */}
              {errors.submit && (
                <div className="px-4 py-3 bg-red-50">
                  <p className="text-sm text-red-600 text-center">{errors.submit}</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile; 