import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const ProductInventory = () => {
  const { t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const filters = [
    { id: 'all', name: t('allProducts'), count: 12 },
    { id: 'vegetables', name: t('vegetables'), count: 5 },
    { id: 'fruits', name: t('fruits'), count: 3 },
    { id: 'grains', name: t('grains'), count: 4 },
    { id: 'organic', name: t('organic'), count: 6 },
    { id: 'lowStock', name: t('lowStock'), count: 2 },
  ];

  useEffect(() => {
    // Simulated API call to fetch products
    const fetchProducts = async () => {
      setLoading(true);
      // Replace with actual API call
      const mockProducts = [
        {
          id: 1,
          name: 'टोमॅटो',
          category: 'vegetables',
          stock: 200,
          unit: 'kg',
          price: 40,
          status: 'available',
          image: '/assets/products/tomatoes.jpg',
          type: 'organic',
          createdAt: '2024-03-15',
          sales: 150,
        },
        {
          id: 2,
          name: 'आंबा',
          category: 'fruits',
          stock: 10,
          unit: 'dozen',
          price: 400,
          status: 'lowStock',
          image: '/assets/products/mangoes.jpg',
          type: 'regular',
          createdAt: '2024-03-14',
          sales: 85,
        },
        {
          id: 3,
          name: 'तांदूळ',
          category: 'grains',
          stock: 500,
          unit: 'kg',
          price: 80,
          status: 'available',
          image: '/assets/products/rice.jpg',
          type: 'organic',
          createdAt: '2024-03-13',
          sales: 300,
        },
      ];

      setTimeout(() => {
        setProducts(mockProducts);
        setLoading(false);
      }, 1000);
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const handleDelete = (productId) => {
    if (window.confirm(t('deleteConfirmation'))) {
      setProducts(products.filter((p) => p.id !== productId));
    }
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesFilter =
        selectedFilter === 'all' ||
        product.category === selectedFilter ||
        (selectedFilter === 'organic' && product.type === 'organic') ||
        (selectedFilter === 'lowStock' && product.status === 'lowStock');

      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return b.price - a.price;
        case 'stock':
          return b.stock - a.stock;
        case 'sales':
          return b.sales - a.sales;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {t('myProducts')}
            </h1>
            <p className="text-gray-600">{t('manageYourProducts')}</p>
          </div>
          <Link
            to="/farmer/add-product"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2 self-start"
          >
            <span>➕</span> {t('addNewProduct')}
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder={t('searchProducts')}
                value={searchQuery}
                onChange={handleSearch}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={sortBy}
                onChange={handleSort}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="name">{t('sortByName')}</option>
                <option value="price">{t('sortByPrice')}</option>
                <option value="stock">{t('sortByStock')}</option>
                <option value="sales">{t('sortBySales')}</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 mt-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  selectedFilter === filter.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.name} ({filter.count})
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">{t('loading')}</p>
          </div>
        ) : (
          <>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {product.type === 'organic' && (
                        <span className="absolute top-2 right-2 bg-green-100 text-green-700 text-sm px-2 py-1 rounded-full">
                          🌱 {t('organic')}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {product.name}
                        </h3>
                        <span className="text-green-600 font-bold">
                          ₹{product.price}/{product.unit}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <span>
                          📦 {t('stock')}: {product.stock} {product.unit}
                        </span>
                        <span>•</span>
                        <span>
                          📈 {t('sales')}: {product.sales} {product.unit}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            product.status === 'available'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {t(product.status)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(product.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to={`/farmer/edit-product/${product.id}`}
                          className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-center"
                        >
                          {t('edit')}
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                        >
                          {t('delete')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">{t('noProductsFound')}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductInventory; 