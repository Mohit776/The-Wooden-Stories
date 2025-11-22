import React from 'react'
import { 
  LayoutDashboard, Package, ShoppingBag, Users, Settings, 
  TrendingUp, TrendingDown, DollarSign, Eye, Edit2, Trash2, 
  Plus, Search, Filter, Download, Menu, X, Bell, LogOut,
  ChevronDown, MoreVertical, Check, XCircle, Clock
} from 'lucide-react';
 


export default function dashboard() {


     const stats = [
    { label: 'Total Revenue', value: '₹12,45,890', change: '+12.5%', trend: 'up', icon: DollarSign },
    { label: 'Total Orders', value: '1,234', change: '+8.2%', trend: 'up', icon: ShoppingBag },
    { label: 'Total Products', value: '156', change: '+5', trend: 'up', icon: Package },
    { label: 'Total Customers', value: '892', change: '+15.3%', trend: 'up', icon: Users }
  ];


  
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
                    <h1 className="text-3xl font-serif text-[#2c1910]">Dashboard</h1>
                    <button className="mt-4 sm:mt-0 bg-[#2c1910] text-[#f3e9c6] px-6 py-2 rounded-lg hover:bg-[#654f44] transition-colors duration-300 flex items-center space-x-2">
                        <Download size={18} />
                        <span>Export Report</span>
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-[#2c1910] p-3 rounded-lg">
                                    <stat.icon className="text-[#d6c088]" size={24} />
                                </div>
                                <div className={`flex items-center space-x-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                    <span className="text-sm font-medium">{stat.change}</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-serif text-[#2c1910] font-semibold mb-1">{stat.value}</h3>
                            <p className="text-[#654f44] text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-serif text-[#2c1910]">Recent Orders</h2>
                        <button className="text-[#2c1910] hover:text-[#654f44] text-sm font-medium transition-colors duration-300">
                            View All
                        </button>
                    </div>
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
                                            <button className="text-[#2c1910] hover:text-[#654f44] transition-colors duration-300">
                                                <Eye size={18} />
                                            </button>
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
