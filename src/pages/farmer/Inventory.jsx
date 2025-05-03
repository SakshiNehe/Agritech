import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Inventory = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    search: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filters, products]);

  const fetchProducts = async () => {
    try {
      // Replace with actual API call
      const mockProducts = [
        {
          id: 1,
          name: 'Organic Tomatoes',
          category: 'vegetables',
          price: 40,
          stock: 100,
          unit: 'kg',
          status: 'active',
          image: '/assets/products/tomatoes.jpg',
        },
        // Add more mock products
      ];
      setProducts(mockProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(product => product.status === filters.status);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower)
      );
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const categories = [
    { value: 'all', label: t('allCategories') },
    { value: 'vegetables', label: t('vegetables') },
    { value: 'fruits', label: t('fruits') },
    { value: 'grains', label: t('grains') },
  ];

  const statuses = [
    { value: 'all', label: t('allStatuses') },
    { value: 'active', label: t('active') },
    { value: 'outOfStock', label: t('outOfStock') },
    { value: 'draft', label: t('draft') },
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
            {t('inventory')}
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            to="/farmer/add-product"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <span className="mr-2">➕</span>
            {t('addProduct')}
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            {t('category')}
          </label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            {t('status')}
          </label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            {t('search')}
          </label>
          <input
            type="text"
            name="search"
            id="search"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder={t('searchProducts')}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : product.status === 'outOfStock'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {t(product.status)}
                </span>
              </div>
              <div className="mt-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover rounded-md"
                />
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">{t(product.category)}</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  ₹{product.price}/{product.unit}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  {t('inStock')}: {product.stock} {product.unit}
                </p>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <span className="mr-1">✏️</span>
                  {t('edit')}
                </button>
                <button
                  className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <span className="mr-1">🗑️</span>
                  {t('delete')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="mt-8 text-center">
          <span className="text-4xl">🌱</span>
          <h3 className="mt-2 text-sm font-medium text-gray-900">{t('noProducts')}</h3>
          <p className="mt-1 text-sm text-gray-500">{t('startByAddingProducts')}</p>
          <div className="mt-6">
            <Link
              to="/farmer/add-product"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <span className="mr-2">➕</span>
              {t('addProduct')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory; 