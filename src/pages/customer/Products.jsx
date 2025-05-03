import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Products = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    priceRange: 'all',
    sortBy: 'name',
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
          name: 'Fresh Tomatoes',
          category: 'vegetables',
          price: 40,
          unit: 'kg',
          image: '/assets/products/tomatoes.jpg',
          farmer: 'Ramesh Patil',
          rating: 4.5,
          reviews: 128,
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

    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        const price = Number(product.price);
        return price >= min && (max ? price <= max : true);
      });
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.farmer.toLowerCase().includes(searchLower)
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'category') {
      setSearchParams({ category: value });
    }
  };

  const categories = [
    { value: 'all', label: t('allCategories') },
    { value: 'vegetables', label: t('vegetables') },
    { value: 'fruits', label: t('fruits') },
    { value: 'grains', label: t('grains') },
  ];

  const priceRanges = [
    { value: 'all', label: t('allPrices') },
    { value: '0-50', label: '₹0 - ₹50' },
    { value: '51-100', label: '₹51 - ₹100' },
    { value: '101-200', label: '₹101 - ₹200' },
    { value: '201', label: '₹201+' },
  ];

  const sortOptions = [
    { value: 'name', label: t('sortByName') },
    { value: 'price-low', label: t('sortByPriceLow') },
    { value: 'price-high', label: t('sortByPriceHigh') },
    { value: 'rating', label: t('sortByRating') },
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
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {t('products')}
        </h1>
      </div>

      <div className="flex items-center justify-between pt-6 pb-4">
        {/* Search */}
        <div className="flex-1 max-w-lg">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder={t('searchProducts')}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        {/* Sort */}
        <div className="ml-4">
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-10">
        {/* Filters */}
        <div className="hidden md:block">
          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">{t('category')}</h3>
              <div className="mt-4 space-y-4">
                {categories.map((category) => (
                  <div key={category.value} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={filters.category === category.value}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <label className="ml-3 text-sm text-gray-600">
                      {category.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">{t('priceRange')}</h3>
              <div className="mt-4 space-y-4">
                {priceRanges.map((range) => (
                  <div key={range.value} className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      value={range.value}
                      checked={filters.priceRange === range.value}
                      onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                      className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <label className="ml-3 text-sm text-gray-600">
                      {range.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="mt-4">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/shop/products/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.farmer}</p>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-900">
                      ₹{product.price}/{product.unit}
                    </p>
                    <div className="flex items-center">
                      <span className="text-yellow-400">⭐</span>
                      <span className="ml-1 text-sm text-gray-500">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-4 w-full bg-green-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <span className="mr-2">🛒</span>
                    {t('addToCart')}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <span className="text-4xl">🌱</span>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {t('noProductsFound')}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {t('tryDifferentFilters')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products; 