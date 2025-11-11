import React, { useEffect, useState } from 'react';
import {
  Package, Search, Filter, Download, Eye, Edit2, Check, XCircle, Clock
} from 'lucide-react';

export default function Order() {

  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

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

    setOrders(list);
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
                      <button className="text-[#2c1910] hover:text-[#654f44] transition-colors duration-300">
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
    </div>
  );
}
