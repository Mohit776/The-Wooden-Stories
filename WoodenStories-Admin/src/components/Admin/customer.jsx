import React from 'react'
import { 
  LayoutDashboard, Package, ShoppingBag, Users, Settings, 
  TrendingUp, TrendingDown, DollarSign, Eye, Edit2, Trash2, 
  Plus, Search, Filter, Download, Menu, X, Bell, LogOut,
  ChevronDown, MoreVertical, Check, XCircle, Clock
} from 'lucide-react';

export default function Customer() {


     const customers = [
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', orders: 12, spent: 145890, joined: '2024-01-15' },
    { id: 2, name: 'Priya Sharma', email: 'priya@example.com', orders: 8, spent: 98750, joined: '2024-02-20' },
    { id: 3, name: 'Amit Patel', email: 'amit@example.com', orders: 15, spent: 189650, joined: '2023-12-10' },
    { id: 4, name: 'Sneha Singh', email: 'sneha@example.com', orders: 5, spent: 56890, joined: '2024-03-08' }
  ];

  
  return (


    <div>
      

       <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-3xl font-serif text-[#2c1910]">Customers Management</h1>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#654f44]" size={20} />
                    <input
                      type="text"
                      placeholder="Search customers..."
                      className="w-full pl-10 pr-4 py-2 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none"
                    />
                  </div>
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
                        <th className="text-left py-3 px-4 text-[#654f44] font-medium">Name</th>
                        <th className="text-left py-3 px-4 text-[#654f44] font-medium">Email</th>
                        <th className="text-left py-3 px-4 text-[#654f44] font-medium">Orders</th>
                        <th className="text-left py-3 px-4 text-[#654f44] font-medium">Total Spent</th>
                        <th className="text-left py-3 px-4 text-[#654f44] font-medium">Joined</th>
                        <th className="text-left py-3 px-4 text-[#654f44] font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr key={customer.id} className="border-b border-[#f3e9c6] hover:bg-[#f3e9c6] transition-colors duration-200">
                          <td className="py-3 px-4 text-[#2c1910] font-medium">{customer.name}</td>
                          <td className="py-3 px-4 text-[#654f44]">{customer.email}</td>
                          <td className="py-3 px-4 text-[#654f44]">{customer.orders}</td>
                          <td className="py-3 px-4 text-[#2c1910] font-medium">₹{customer.spent.toLocaleString()}</td>
                          <td className="py-3 px-4 text-[#654f44]">{customer.joined}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <button className="text-[#2c1910] hover:text-[#654f44] transition-colors duration-300">
                                <Eye size={18} />
                              </button>
                              <button className="text-[#2c1910] hover:text-[#654f44] transition-colors duration-300">
                                <MoreVertical size={18} />
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
