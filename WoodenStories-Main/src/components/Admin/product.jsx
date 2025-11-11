import React from 'react'
import { 
  LayoutDashboard, Package, ShoppingBag, Users, Settings, 
  TrendingUp, TrendingDown, DollarSign, Eye, Edit2, Trash2, 
  Plus, Search, Filter, Download, Menu, X, Bell, LogOut,
  ChevronDown, MoreVertical, Check, XCircle, Clock
} from 'lucide-react';

export default function Product() {



     const products = [
    { id: 1, name: 'Walnut Wall Panel', category: 'Wall Art', price: 8999, stock: 45, status: 'Active' },
    { id: 2, name: 'Teak Coffee Table', category: 'Furniture', price: 24999, stock: 12, status: 'Active' },
    { id: 3, name: 'Carved Wall Accent', category: 'Decor', price: 6499, stock: 0, status: 'Out of Stock' },
    { id: 4, name: 'Oak Display Shelf', category: 'Storage', price: 12999, stock: 28, status: 'Active' },
    { id: 5, name: 'Mahogany Side Table', category: 'Furniture', price: 15999, stock: 18, status: 'Active' }
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
 

     
  return (
    <div>

          <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-3xl font-serif text-[#2c1910]">Products Management</h1>
                <button className="mt-4 sm:mt-0 bg-[#2c1910] text-[#f3e9c6] px-6 py-2 rounded-lg hover:bg-[#654f44] transition-colors duration-300 flex items-center space-x-2">
                  <Plus size={20} />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#654f44]" size={20} />
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full pl-10 pr-4 py-2 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 border-2 border-[#d6c088] rounded-lg hover:bg-[#f3e9c6] transition-colors duration-300">
                    <Filter size={20} className="text-[#654f44]" />
                    <span className="text-[#654f44]">Filter</span>
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="h-48 bg-[#654f44] relative">
                      <div className="w-full h-full bg-gradient-to-br from-[#f3e9c6] to-[#d6c088] opacity-20"></div>
                      <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="text-[#654f44] text-sm uppercase tracking-wide">{product.category}</p>
                      <h3 className="text-[#2c1910] font-serif text-lg mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[#2c1910] font-serif text-xl font-semibold">₹{product.price.toLocaleString()}</span>
                        <span className="text-[#654f44] text-sm">Stock: {product.stock}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-[#2c1910] text-[#f3e9c6] rounded-lg hover:bg-[#654f44] transition-colors duration-300">
                          <Edit2 size={16} />
                          <span>Edit</span>
                        </button>
                        <button className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors duration-300">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
      
    </div>
  )
}
