import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Profile = () => {
  const { t } = useLanguage();
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    farmDetails: {
      size: '',
      type: '',
      crops: [],
      certifications: [],
    },
    bankDetails: {
      accountHolder: '',
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      branch: '',
    },
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const farmTypes = [
    { value: '', label: t('selectFarmType') },
    { value: 'organic', label: t('organic') },
    { value: 'conventional', label: t('conventional') },
    { value: 'mixed', label: t('mixed') },
  ];

  const certifications = [
    { value: 'organic', label: t('organicCertification') },
    { value: 'gapCertified', label: t('gapCertified') },
    { value: 'fairtrade', label: t('fairtrade') },
  ];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // Replace with actual API call
      const mockProfile = {
        name: 'Rajesh Patil',
        phone: '9876543210',
        email: 'rajesh.patil@example.com',
        address: '123 Farm Road',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411001',
        farmDetails: {
          size: '5',
          type: 'organic',
          crops: ['tomatoes', 'onions', 'potatoes'],
          certifications: ['organic', 'gapCertified'],
        },
        bankDetails: {
          accountHolder: 'Rajesh Patil',
          accountNumber: 'XXXX-XXXX-1234',
          ifscCode: 'BANK0001234',
          bankName: 'State Bank of India',
          branch: 'Pune Main Branch',
        },
        image: '/assets/profiles/farmer.jpg',
      };
      setProfile(mockProfile);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const file = e.target.files[0];
      if (file) {
        setProfile(prev => ({ ...prev, image: URL.createObjectURL(file) }));
      }
    } else if (name.includes('.')) {
      const [section, field] = name.split('.');
      setProfile(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    } else if (type === 'checkbox') {
      const [section, field] = name.split('_');
      if (section === 'certifications') {
        setProfile(prev => ({
          ...prev,
          farmDetails: {
            ...prev.farmDetails,
            certifications: checked
              ? [...prev.farmDetails.certifications, field]
              : prev.farmDetails.certifications.filter(cert => cert !== field),
          },
        }));
      }
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

    if (!profile.farmDetails.size) {
      newErrors['farmDetails.size'] = t('farmSizeRequired');
    }

    if (!profile.farmDetails.type) {
      newErrors['farmDetails.type'] = t('farmTypeRequired');
    }

    // Bank Details Validation
    if (!profile.bankDetails.accountHolder.trim()) {
      newErrors['bankDetails.accountHolder'] = t('accountHolderRequired');
    }

    if (!profile.bankDetails.accountNumber.trim()) {
      newErrors['bankDetails.accountNumber'] = t('accountNumberRequired');
    }

    if (!profile.bankDetails.ifscCode.trim()) {
      newErrors['bankDetails.ifscCode'] = t('ifscCodeRequired');
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(profile.bankDetails.ifscCode)) {
      newErrors['bankDetails.ifscCode'] = t('invalidIfscCode');
    }

    if (!profile.bankDetails.bankName.trim()) {
      newErrors['bankDetails.bankName'] = t('bankNameRequired');
    }

    if (!profile.bankDetails.branch.trim()) {
      newErrors['bankDetails.branch'] = t('branchRequired');
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
              {t('farmerProfile')}
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              {t('farmerProfileDescription')}
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

                {/* Personal Information */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      {t('fullName')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={profile.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      {t('phoneNumber')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      {t('email')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={profile.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    {t('address')}
                  </label>
                  <textarea
                    name="address"
                    id="address"
                    rows={3}
                    value={profile.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                      !isEditing ? 'bg-gray-50' : ''
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      {t('city')}
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={profile.city}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                    {errors.city && (
                      <p className="mt-2 text-sm text-red-600">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      {t('state')}
                    </label>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      value={profile.state}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                    {errors.state && (
                      <p className="mt-2 text-sm text-red-600">{errors.state}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                      {t('pincode')}
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      id="pincode"
                      value={profile.pincode}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                    {errors.pincode && (
                      <p className="mt-2 text-sm text-red-600">{errors.pincode}</p>
                    )}
                  </div>
                </div>

                {/* Farm Details */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">
                    {t('farmDetails')}
                  </h4>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="farmDetails.size" className="block text-sm font-medium text-gray-700">
                        {t('farmSize')} (acres)
                      </label>
                      <input
                        type="number"
                        name="farmDetails.size"
                        id="farmDetails.size"
                        value={profile.farmDetails.size}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                          !isEditing ? 'bg-gray-50' : ''
                        }`}
                      />
                      {errors['farmDetails.size'] && (
                        <p className="mt-2 text-sm text-red-600">{errors['farmDetails.size']}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="farmDetails.type" className="block text-sm font-medium text-gray-700">
                        {t('farmType')}
                      </label>
                      <select
                        id="farmDetails.type"
                        name="farmDetails.type"
                        value={profile.farmDetails.type}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                          !isEditing ? 'bg-gray-50' : ''
                        }`}
                      >
                        {farmTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {errors['farmDetails.type'] && (
                        <p className="mt-2 text-sm text-red-600">{errors['farmDetails.type']}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('certifications')}
                    </label>
                    <div className="space-y-4">
                      {certifications.map(cert => (
                        <div key={cert.value} className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id={`certifications_${cert.value}`}
                              name={`certifications_${cert.value}`}
                              type="checkbox"
                              checked={profile.farmDetails.certifications.includes(cert.value)}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor={`certifications_${cert.value}`} className="font-medium text-gray-700">
                              {cert.label}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bank Details */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">
                    {t('bankDetails')}
                  </h4>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="bankDetails.accountHolder" className="block text-sm font-medium text-gray-700">
                        {t('accountHolder')}
                      </label>
                      <input
                        type="text"
                        name="bankDetails.accountHolder"
                        id="bankDetails.accountHolder"
                        value={profile.bankDetails.accountHolder}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                          !isEditing ? 'bg-gray-50' : ''
                        }`}
                      />
                      {errors['bankDetails.accountHolder'] && (
                        <p className="mt-2 text-sm text-red-600">{errors['bankDetails.accountHolder']}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="bankDetails.accountNumber" className="block text-sm font-medium text-gray-700">
                        {t('accountNumber')}
                      </label>
                      <input
                        type="text"
                        name="bankDetails.accountNumber"
                        id="bankDetails.accountNumber"
                        value={profile.bankDetails.accountNumber}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                          !isEditing ? 'bg-gray-50' : ''
                        }`}
                      />
                      {errors['bankDetails.accountNumber'] && (
                        <p className="mt-2 text-sm text-red-600">{errors['bankDetails.accountNumber']}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="bankDetails.ifscCode" className="block text-sm font-medium text-gray-700">
                        {t('ifscCode')}
                      </label>
                      <input
                        type="text"
                        name="bankDetails.ifscCode"
                        id="bankDetails.ifscCode"
                        value={profile.bankDetails.ifscCode}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                          !isEditing ? 'bg-gray-50' : ''
                        }`}
                      />
                      {errors['bankDetails.ifscCode'] && (
                        <p className="mt-2 text-sm text-red-600">{errors['bankDetails.ifscCode']}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="bankDetails.bankName" className="block text-sm font-medium text-gray-700">
                        {t('bankName')}
                      </label>
                      <input
                        type="text"
                        name="bankDetails.bankName"
                        id="bankDetails.bankName"
                        value={profile.bankDetails.bankName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                          !isEditing ? 'bg-gray-50' : ''
                        }`}
                      />
                      {errors['bankDetails.bankName'] && (
                        <p className="mt-2 text-sm text-red-600">{errors['bankDetails.bankName']}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="bankDetails.branch" className="block text-sm font-medium text-gray-700">
                        {t('branch')}
                      </label>
                      <input
                        type="text"
                        name="bankDetails.branch"
                        id="bankDetails.branch"
                        value={profile.bankDetails.branch}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                          !isEditing ? 'bg-gray-50' : ''
                        }`}
                      />
                      {errors['bankDetails.branch'] && (
                        <p className="mt-2 text-sm text-red-600">{errors['bankDetails.branch']}</p>
                      )}
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

export default Profile; 