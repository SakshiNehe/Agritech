import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const AddProduct = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [product, setProduct] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    unit: 'kg',
    stock: '',
    images: [],
    organic: false,
    harvestDate: '',
    expiryDate: '',
  });

  const categories = [
    { value: '', label: t('selectCategory') },
    { value: 'vegetables', label: t('vegetables') },
    { value: 'fruits', label: t('fruits') },
    { value: 'grains', label: t('grains') },
    { value: 'dairy', label: t('dairy') },
  ];

  const units = [
    { value: 'kg', label: t('kilogram') },
    { value: 'g', label: t('gram') },
    { value: 'l', label: t('liter') },
    { value: 'piece', label: t('piece') },
    { value: 'dozen', label: t('dozen') },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const imageFiles = Array.from(files);
      const imageUrls = imageFiles.map(file => URL.createObjectURL(file));
      setProduct(prev => ({
        ...prev,
        images: [...prev.images, ...imageUrls],
      }));
    } else {
      setProduct(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const removeImage = (index) => {
    setProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!product.name.trim()) {
      newErrors.name = t('nameRequired');
    }

    if (!product.category) {
      newErrors.category = t('categoryRequired');
    }

    if (!product.description.trim()) {
      newErrors.description = t('descriptionRequired');
    }

    if (!product.price) {
      newErrors.price = t('priceRequired');
    } else if (isNaN(product.price) || Number(product.price) <= 0) {
      newErrors.price = t('invalidPrice');
    }

    if (!product.stock) {
      newErrors.stock = t('stockRequired');
    } else if (isNaN(product.stock) || Number(product.stock) < 0) {
      newErrors.stock = t('invalidStock');
    }

    if (product.images.length === 0) {
      newErrors.images = t('imagesRequired');
    }

    if (!product.harvestDate) {
      newErrors.harvestDate = t('harvestDateRequired');
    }

    if (!product.expiryDate) {
      newErrors.expiryDate = t('expiryDateRequired');
    } else if (new Date(product.expiryDate) <= new Date(product.harvestDate)) {
      newErrors.expiryDate = t('invalidExpiryDate');
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

    setIsSubmitting(true);
    try {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/farmer/inventory');
    } catch (error) {
      setErrors({
        submit: t('addProductError'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {t('addProduct')}
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              {t('addProductDescription')}
            </p>
          </div>
        </div>

        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    {t('productName')}
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={product.name}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>
                </div>

                {/* Category Field */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    {t('category')}
                  </label>
                  <div className="mt-1">
                    <select
                      id="category"
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-2 text-sm text-red-600">{errors.category}</p>
                    )}
                  </div>
                </div>

                {/* Description Field */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    {t('description')}
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={product.description}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors.description && (
                      <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                    )}
                  </div>
                </div>

                {/* Price and Unit Fields */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      {t('price')}
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">₹</span>
                      </div>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        min="0"
                        step="0.01"
                        value={product.price}
                        onChange={handleChange}
                        className="focus:ring-green-500 focus:border-green-500 block w-full pl-7 sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    {errors.price && (
                      <p className="mt-2 text-sm text-red-600">{errors.price}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                      {t('unit')}
                    </label>
                    <select
                      id="unit"
                      name="unit"
                      value={product.unit}
                      onChange={handleChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                    >
                      {units.map(unit => (
                        <option key={unit.value} value={unit.value}>
                          {unit.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Stock Field */}
                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                    {t('stock')}
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="stock"
                      id="stock"
                      min="0"
                      value={product.stock}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors.stock && (
                      <p className="mt-2 text-sm text-red-600">{errors.stock}</p>
                    )}
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('productImages')}
                  </label>
                  <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="images"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                        >
                          <span>{t('uploadImages')}</span>
                          <input
                            id="images"
                            name="images"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleChange}
                            className="sr-only"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">{t('imageUploadHint')}</p>
                    </div>
                  </div>
                  {errors.images && (
                    <p className="mt-2 text-sm text-red-600">{errors.images}</p>
                  )}
                  {product.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                      {product.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="h-24 w-24 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-100 rounded-full p-1 text-red-600 hover:bg-red-200"
                          >
                            <span className="sr-only">{t('remove')}</span>
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Organic Checkbox */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="organic"
                      name="organic"
                      type="checkbox"
                      checked={product.organic}
                      onChange={handleChange}
                      className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="organic" className="font-medium text-gray-700">
                      {t('organic')}
                    </label>
                    <p className="text-gray-500">{t('organicDescription')}</p>
                  </div>
                </div>

                {/* Harvest and Expiry Dates */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="harvestDate" className="block text-sm font-medium text-gray-700">
                      {t('harvestDate')}
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="harvestDate"
                        id="harvestDate"
                        value={product.harvestDate}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      {errors.harvestDate && (
                        <p className="mt-2 text-sm text-red-600">{errors.harvestDate}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                      {t('expiryDate')}
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="expiryDate"
                        id="expiryDate"
                        value={product.expiryDate}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      {errors.expiryDate && (
                        <p className="mt-2 text-sm text-red-600">{errors.expiryDate}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="button"
                  onClick={() => navigate('/farmer/inventory')}
                  className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? t('adding') : t('addProduct')}
                </button>
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

export default AddProduct; 