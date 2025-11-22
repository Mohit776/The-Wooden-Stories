import React, { useEffect, useState } from 'react';
import {
  Package, Search, Filter, Download, Eye, Edit2, Check, XCircle, Clock
} from 'lucide-react';

export default function Order() {

  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // ✅ Fetch orders from backend
const fetchOrders = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/orders");
    const data = await res.json();

    // handle multiple possible response formats safely
    const list = Array.isArray(data)
      ? data
      : Array.isArray(data.orders)
      ? data.orders
      : Array.isArray(data.data)
      ? data.data
      : [];

    // Sort orders so the most recent appears at the top
    const sorted = [...list].sort((a, b) => {
      const da = a.date ? new Date(a.date) : null;
      const db = b.date ? new Date(b.date) : null;

      if (da instanceof Date && db instanceof Date && !isNaN(da) && !isNaN(db)) {
        return db - da; // newer date first
      }

      const idA = Number(a.id);
      const idB = Number(b.id);
      if (!isNaN(idA) && !isNaN(idB)) {
        return idB - idA; // higher ID first
      }

      return 0;
    });

    setOrders(sorted);
  } catch (err) {
    console.error("Error fetching orders:", err);
    setOrders([]); // fallback to empty list on error
  }
};


  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Update status of a specific order
  const updateStatus = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEditingOrder(null);
        fetchOrders(); // refresh table
      }
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  // ✅ Status styling helpers
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      case 'Processing': return 'bg-yellow-100 text-yellow-700';
      case 'Pending': return 'bg-orange-100 text-orange-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <Check size={14} />;
      case 'Shipped': return <Package size={14} />;
      case 'Processing': return <Clock size={14} />;
      case 'Pending': return <Clock size={14} />;
      case 'Cancelled': return <XCircle size={14} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-serif text-[#2c1910]">Orders Management</h1>
      </div>

      {/* Search / Filter */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#654f44]" size={20} />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border-2 border-[#d6c088] rounded-lg hover:bg-[#f3e9c6] transition-colors duration-300">
            <Filter size={20} className="text-[#654f44]" />
            <span className="text-[#654f44]">Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#2c1910] text-[#f3e9c6] rounded-lg hover:bg-[#654f44] transition-colors duration-300">
            <Download size={20} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#d6c088]">
                <th className="text-left py-3 px-4 text-[#654f44] font-medium">Order ID</th>
                <th className="text-left py-3 px-4 text-[#654f44] font-medium">Customer</th>
                <th className="text-left py-3 px-4 text-[#654f44] font-medium">Amount</th>
                <th className="text-left py-3 px-4 text-[#654f44] font-medium">Status</th>
                <th className="text-left py-3 px-4 text-[#654f44] font-medium">Date</th>
                <th className="text-left py-3 px-4 text-[#654f44] font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-[#f3e9c6] hover:bg-[#f3e9c6] transition-colors duration-200">
                  <td className="py-3 px-4 text-[#2c1910] font-medium">{order.id}</td>
                  <td className="py-3 px-4 text-[#654f44]">{order.customer}</td>
                  <td className="py-3 px-4 text-[#2c1910] font-medium">₹{Number(order.amount).toLocaleString()}</td>
                  <td className="py-3 px-4">
                    {editingOrder === order.id ? (
                      <div className="flex items-center space-x-2">
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value)}
                          className="border rounded-lg px-2 py-1 text-sm"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={() => updateStatus(order.id)}
                          className="px-2 py-1 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingOrder(null)}
                          className="px-2 py-1 bg-gray-400 text-white rounded-lg text-xs hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 w-fit ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-[#654f44]">{order.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-[#2c1910] hover:text-[#654f44] transition-colors duration-300"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="text-[#2c1910] hover:text-[#654f44] transition-colors duration-300"
                        onClick={() => {
                          setEditingOrder(order.id);
                          setNewStatus(order.status);
                        }}
                      >
                        <Edit2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <p className="text-center text-gray-500 py-6">No orders found.</p>
          )}
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full mx-4 p-6 relative border border-[#f3e9c6]">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-serif text-[#2c1910]">Order Details</h2>
                <p className="text-xs text-gray-500 mt-1">ID: {selectedOrder.id}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-[#2c1910] transition-colors duration-200"
                aria-label="Close details"
              >
                <XCircle size={22} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm text-[#2c1910] max-h-80 overflow-y-auto pr-1">
              <div className="space-y-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Customer</p>
                  <p className="font-semibold">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Phone</p>
                  <p>{selectedOrder.phone || selectedOrder.customer_phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Email</p>
                  <p>{selectedOrder.customer_email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Status</p>
                  <p>{selectedOrder.status}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Amount</p>
                  <p className="font-semibold">₹{Number(selectedOrder.amount).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Date</p>
                  <p>{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Payment ID</p>
                  <p className="break-all">{selectedOrder.payment_id || 'N/A'}</p>
                </div>
              </div>

              <div className="md:col-span-2 mt-2 space-y-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Address</p>
                  <div className="bg-[#f9f5e7] border border-[#f3e9c6] rounded-md p-3 text-xs whitespace-pre-wrap">
                    {selectedOrder.address
                      ? (() => {
                          try {
                            const addr =
                              typeof selectedOrder.address === 'string'
                                ? JSON.parse(selectedOrder.address)
                                : selectedOrder.address;

                            if (Array.isArray(addr)) {
                              const a = addr[0] || {};
                              return `${a.houseDoorNo || ''} ${a.street || ''}\n${a.area || ''}\n${a.pincode || ''} ${a.state || ''}`.trim() || 'N/A';
                            }

                            return `${addr.houseDoorNo || ''} ${addr.street || ''}\n${addr.area || ''}\n${addr.pincode || ''} ${addr.state || ''}`.trim() || 'N/A';
                          } catch {
                            return String(selectedOrder.address);
                          }
                        })()
                      : 'N/A'}
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Items</p>
                  <div className="bg-[#f9f5e7] border border-[#f3e9c6] rounded-md p-3 text-xs">
                    {selectedOrder.items
                      ? (() => {
                          try {
                            const parsedItems = typeof selectedOrder.items === 'string'
                              ? JSON.parse(selectedOrder.items)
                              : selectedOrder.items;

                            if (Array.isArray(parsedItems)) {
                              return (
                                <table className="w-full border-collapse">
                                  <thead>
                                    <tr className="border-b border-[#d6c088]">
                                      <th className="text-left py-1 px-2">Product</th>
                                      <th className="text-left py-1 px-2">Qty</th>
                                      <th className="text-right py-1 px-2">Price</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {parsedItems.map((item, index) => (
                                      <tr key={index} className="border-b border-[#f3e9c6]">
                                        <td className="py-1 px-2">{item.name || item.productName || item.product || item.title || item.id || 'Item'}</td>
                                        <td className="py-1 px-2">{item.qty || item.quantity || 1}</td>
                                        <td className="text-right py-1 px-2">₹{Number(item.price).toLocaleString()}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              );
                            }

                            return (
                              <pre className="whitespace-pre-wrap">{JSON.stringify(parsedItems, null, 2)}</pre>
                            );
                          } catch (e) {
                            return <pre className="whitespace-pre-wrap">{String(selectedOrder.items)}</pre>;
                          }
                        })()
                      : 'N/A'}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-[#2c1910] text-[#f3e9c6] rounded-lg hover:bg-[#654f44] transition-colors duration-300 text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
