import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Orders = () => {
  const { t } = useLanguage();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [filters, orders]);

  const fetchOrders = async () => {
    try {
      // Replace with actual API call
      const mockOrders = [
        {
          id: 1,
          customerName: 'John Doe',
          products: [
            { name: 'Organic Tomatoes', quantity: 5, unit: 'kg', price: 40 },
            { name: 'Fresh Onions', quantity: 3, unit: 'kg', price: 30 },
          ],
          total: 350,
          status: 'pending',
          date: '2024-03-20',
          deliveryAddress: 'ABC Street, XYZ City',
          phone: '9876543210',
        },
        // Add more mock orders as needed
      ];
      setOrders(mockOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    if (filters.status !== 'all') {
      filtered = filtered.filter(order => order.status === filters.status);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(order =>
        order.customerName.toLowerCase().includes(searchLower) ||
        order.id.toString().includes(searchLower)
      );
    }

    setFilteredOrders(filtered);
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
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
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {t('orders')}
          </h2>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            <option value="all">{t('allStatuses')}</option>
            <option value="pending">{t('pending')}</option>
            <option value="processing">{t('processing')}</option>
            <option value="completed">{t('completed')}</option>
            <option value="cancelled">{t('cancelled')}</option>
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
            placeholder={t('searchOrders')}
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="mt-8 space-y-6">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow overflow-hidden sm:rounded-lg"
          >
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {t('orderNumber')}: #{order.id}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {order.date}
                  </p>
                </div>
                <div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {t(order.status)}
                  </span>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">{t('customer')}</dt>
                  <dd className="mt-1 text-sm text-gray-900">{order.customerName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">{t('phone')}</dt>
                  <dd className="mt-1 text-sm text-gray-900">{order.phone}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">{t('deliveryAddress')}</dt>
                  <dd className="mt-1 text-sm text-gray-900">{order.deliveryAddress}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">{t('products')}</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <ul className="divide-y divide-gray-200">
                      {order.products.map((product, index) => (
                        <li key={index} className="py-2">
                          <div className="flex justify-between">
                            <span>{product.name}</span>
                            <span>
                              {product.quantity} {product.unit} × ₹{product.price}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">{t('total')}</dt>
                  <dd className="mt-1 text-sm text-gray-900">₹{order.total}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">{t('status')}</dt>
                  <dd className="mt-1">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                    >
                      <option value="pending">{t('pending')}</option>
                      <option value="processing">{t('processing')}</option>
                      <option value="completed">{t('completed')}</option>
                      <option value="cancelled">{t('cancelled')}</option>
                    </select>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="mt-8 text-center">
          <span className="text-4xl">📦</span>
          <h3 className="mt-2 text-sm font-medium text-gray-900">{t('noOrders')}</h3>
          <p className="mt-1 text-sm text-gray-500">{t('noOrdersMessage')}</p>
        </div>
      )}
    </div>
  );
};

export default Orders; 