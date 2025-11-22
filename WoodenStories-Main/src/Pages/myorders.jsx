import React, { useEffect, useState } from 'react';
import { Package, MapPin, Calendar, ChevronDown, ChevronUp, Loader, AlertCircle, ShoppingBag } from 'lucide-react';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const backendBaseUrl = 'http://localhost:5000';

  const getUserPhone = () => {
    return (
      localStorage.getItem('userPhone') ||
      (document.cookie.match(/(?:^|; )userPhone=([^;]+)/)?.[1] || null)
    );
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const phone = getUserPhone();
        if (!phone) {
          setError('Please login and save your profile (phone number) to view your orders.');
          setLoading(false);
          return;
        }

        const res = await fetch(`${backendBaseUrl}/api/orders/customer/${phone}`);
        if (!res.ok) {
          console.error('Failed to fetch orders', await res.text());
          setError('Failed to load your orders. Please try again.');
          setLoading(false);
          return;
        }

        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        setOrders(list);
      } catch (err) {
        console.error('Error fetching my orders:', err);
        setError('Something went wrong while loading your orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatAddress = (address) => {
    if (!address) return 'Not available';
    try {
      const addr = typeof address === 'string' ? JSON.parse(address) : address;

      if (Array.isArray(addr)) {
        const a = addr[0] || {};
        return (
          `${a.houseDoorNo || ''} ${a.street || ''}, ` +
          `${a.area || ''}, ` +
          `${a.pincode || ''}, ${a.state || ''}`
        ).trim() || 'Not available';
      }

      return (
        `${addr.houseDoorNo || ''} ${addr.street || ''}, ` +
        `${addr.area || ''}, ` +
        `${addr.pincode || ''}, ${addr.state || ''}`
      ).trim() || 'Not available';
    } catch {
      return String(address);
    }
  };

  const parseItems = (items) => {
    if (!items) return [];
    try {
      const parsed = typeof items === 'string' ? JSON.parse(items) : items;
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'pending':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3e9c6] flex items-center justify-center">
        <div className="text-center">
          <Loader size={48} className="animate-spin text-[#2c1910] mx-auto mb-4" />
          <p className="text-[#654f44] text-lg">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f3e9c6] pt-20 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="flex items-start space-x-3 mb-4">
            <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={24} />
            <div>
              <p className="text-red-600 font-semibold mb-2">{error}</p>
              <p className="text-[#654f44] text-sm">
                Go to the Profile Settings page to save your phone number, then come back here.
              </p>
            </div>
          </div>
          <button
            onClick={() => window.location.href = '/profile'}
            className="w-full bg-[#2c1910] text-[#f3e9c6] py-3 rounded-lg hover:bg-[#654f44] transition-colors duration-300 font-medium"
          >
            Go to Profile Settings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-[#f3e9c6] pt-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-[#2c1910] rounded-t-lg shadow-lg p-6 mb-0">
          <div className="flex items-center space-x-3">
            <div className="bg-[#654f44] p-3 rounded-lg">
              <ShoppingBag className="text-[#d6c088]" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-serif text-[#f3e9c6]">My Orders</h1>
              <p className="text-[#d6c088] text-sm">
                {orders.length === 0
                  ? 'No orders yet'
                  : `${orders.length} ${orders.length === 1 ? 'order' : 'orders'} placed`}
              </p>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-b-lg shadow-lg p-6">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto mb-4 text-[#654f44]" size={64} />
              <h3 className="text-xl font-serif text-[#2c1910] mb-2">No orders yet</h3>
              <p className="text-[#654f44] mb-6">
                Browse our collection and place your first order!
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-[#2c1910] text-[#f3e9c6] px-8 py-3 rounded-lg hover:bg-[#654f44] transition-colors duration-300 font-medium"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const items = parseItems(order.items);
                const isExpanded = expandedId === order.id;

                return (
                  <div
                    key={order.id}
                    className="border-2 border-[#d6c088] rounded-lg hover:border-[#654f44] transition-all duration-300 overflow-hidden"
                  >
                    {/* Order Header */}
                    <div className="bg-[#f9f5e7] p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Order Info */}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Package className="text-[#654f44]" size={18} />
                            <span className="text-xs font-medium text-[#654f44] uppercase tracking-wide">
                              Order ID: {order.id}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-[#654f44]">
                            <Calendar size={16} />
                            <span>{new Date(order.date).toLocaleString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true,
                            })}</span>
                          </div>
                        </div>

                        {/* Amount & Status */}
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-xs text-[#654f44] mb-1">Total Amount</p>
                            <div className="flex items-center space-x-1">
                              <span className="text-2xl font-serif text-[#2c1910] font-semibold">
                                ₹{Number(order.amount).toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div>
                            <span className={`px-4 py-2 rounded-full text-sm font-medium border-2 ${getStatusColor(order.status)}`}>
                              {order.status || 'Pending'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Toggle Button */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : order.id)}
                      className="w-full bg-white hover:bg-[#f3e9c6] transition-colors duration-300 py-3 px-4 flex items-center justify-center space-x-2 text-[#2c1910] font-medium"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="bg-white border-t-2 border-[#d6c088] p-6 space-y-6">
                        {/* Delivery Address */}
                        <div>
                          <div className="flex items-center space-x-2 mb-3">
                            <MapPin className="text-[#654f44]" size={20} />
                            <h4 className="text-lg font-serif text-[#2c1910]">Delivery Address</h4>
                          </div>
                          <div className="bg-[#f9f5e7] border-2 border-[#d6c088] rounded-lg p-4">
                            <p className="text-[#654f44] leading-relaxed">
                              {formatAddress(order.address)}
                            </p>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div>
                          <div className="flex items-center space-x-2 mb-3">
                            <Package className="text-[#654f44]" size={20} />
                            <h4 className="text-lg font-serif text-[#2c1910]">Order Items</h4>
                          </div>
                          {items.length === 0 ? (
                            <p className="text-[#654f44] text-sm italic">No item details available</p>
                          ) : (
                            <div className="bg-[#f9f5e7] border-2 border-[#d6c088] rounded-lg overflow-hidden">
                              <div className="overflow-x-auto">
                                <table className="w-full">
                                  <thead className="bg-[#2c1910]">
                                    <tr>
                                      <th className="text-left py-3 px-4 text-[#f3e9c6] font-medium">Product</th>
                                      <th className="text-center py-3 px-4 text-[#f3e9c6] font-medium">Quantity</th>
                                      <th className="text-right py-3 px-4 text-[#f3e9c6] font-medium">Price</th>
                                      <th className="text-right py-3 px-4 text-[#f3e9c6] font-medium">Subtotal</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {items.map((item, index) => {
                                      const qty = item.qty || item.quantity || 1;
                                      const price = Number(item.price) || 0;
                                      const subtotal = qty * price;

                                      return (
                                        <tr key={index} className="border-b border-[#d6c088] last:border-0">
                                          <td className="py-3 px-4 text-[#2c1910]">
                                            {item.name || item.productName || item.product || item.title || `Item ${index + 1}`}
                                          </td>
                                          <td className="text-center py-3 px-4 text-[#654f44] font-medium">
                                            {qty}
                                          </td>
                                          <td className="text-right py-3 px-4 text-[#654f44]">
                                            ₹{price.toLocaleString()}
                                          </td>
                                          <td className="text-right py-3 px-4 text-[#2c1910] font-semibold">
                                            ₹{subtotal.toLocaleString()}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                  <tfoot className="bg-[#2c1910]">
                                    <tr>
                                      <td colSpan="3" className="py-3 px-4 text-right text-[#f3e9c6] font-medium">
                                        Total:
                                      </td>
                                      <td className="py-3 px-4 text-right text-[#d6c088] font-serif text-lg font-semibold">
                                        ₹{Number(order.amount).toLocaleString()}
                                      </td>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                    
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}