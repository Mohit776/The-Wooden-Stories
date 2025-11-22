import React from 'react'
import { 
  LayoutDashboard, Package, ShoppingBag, Users, Settings, 
  TrendingUp, TrendingDown, DollarSign, Eye, Edit2, Trash2, 
  Plus, Search, Filter, Download, Menu, X, Bell, LogOut,
  ChevronDown, MoreVertical, Check, XCircle, Clock
} from 'lucide-react';

export default function Order() {

  
   const recentOrders = [
     { id: 'ORD-001', customer: 'Rajesh Kumar', amount: 33998, status: 'Delivered', date: '2024-11-04' },
     { id: 'ORD-002', customer: 'Priya Sharma', amount: 12999, status: 'Shipped', date: '2024-11-04' },
     { id: 'ORD-003', customer: 'Amit Patel', amount: 45997, status: 'Processing', date: '2024-11-03' },
     { id: 'ORD-004', customer: 'Sneha Singh', amount: 8999, status: 'Pending', date: '2024-11-03' },
     { id: 'ORD-005', customer: 'Vikram Gupta', amount: 24999, status: 'Cancelled', date: '2024-11-02' }
   ];


      const getStatusColor = (status) => {
          switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-700';
            case 'Shipped': return 'bg-blue-100 text-blue-700';
            case 'Processing': return 'bg-yellow-100 text-yellow-700';
            case 'Pending': return 'bg-orange-100 text-orange-700';
            case 'Cancelled': return 'bg-red-100 text-red-700';
            case 'Active': return 'bg-green-100 text-green-700';
            case 'Out of Stock': return 'bg-red-100 text-red-700';
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
    <div>


            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-3xl font-serif text-[#2c1910]">Orders Management</h1>
              </div>

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
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-[#f3e9c6] hover:bg-[#f3e9c6] transition-colors duration-200">
                          <td className="py-3 px-4 text-[#2c1910] font-medium">{order.id}</td>
                          <td className="py-3 px-4 text-[#654f44]">{order.customer}</td>
                          <td className="py-3 px-4 text-[#2c1910] font-medium">₹{order.amount.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 w-fit ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span>{order.status}</span>
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[#654f44]">{order.date}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <button className="text-[#2c1910] hover:text-[#654f44] transition-colors duration-300">
                                <Eye size={18} />
                              </button>
                              <button className="text-[#2c1910] hover:text-[#654f44] transition-colors duration-300">
                                <Edit2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
      
    </div>
  )
}
