import React, { useEffect, useState } from 'react'
import { 
  Package, ShoppingBag, Users,
  TrendingUp, TrendingDown, DollarSign, Eye, Download,
  Check, XCircle, Clock
} from 'lucide-react';
import { API_URL } from '../../config';

export default function Dashboard() {
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [oRes, pRes, cRes] = await Promise.all([
          fetch(`${API_URL}/orders`),
          fetch(`${API_URL}/products`),
          fetch(`${API_URL}/customers`),
        ])
        const [o, p, c] = await Promise.all([oRes.json(), pRes.json(), cRes.json()])

        // Normalize orders response and sort so newest orders appear first
        const rawOrders = Array.isArray(o)
          ? o
          : Array.isArray(o?.orders)
          ? o.orders
          : Array.isArray(o?.data)
          ? o.data
          : []

        const sortedOrders = [...rawOrders].sort((a, b) => {
          const da = a.date ? new Date(a.date) : null
          const db = b.date ? new Date(b.date) : null

          if (da instanceof Date && db instanceof Date && !isNaN(da) && !isNaN(db)) {
            return db - da // newer date first
          }

          const idA = Number(a.id)
          const idB = Number(b.id)
          if (!isNaN(idA) && !isNaN(idB)) {
            return idB - idA // higher ID first
          }

          return 0
        })

        setOrders(sortedOrders)
        setProducts(Array.isArray(p) ? p : [])
        setCustomers(Array.isArray(c) ? c : [])
      } catch (e) {
        console.error('Error loading dashboard data:', e)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const totalRevenue = orders.reduce(
    (sum, it) => it.status === 'Delivered' ? sum + (Number(it.amount) || 0) : sum,
    0
  )
  const totalOrders = orders.length
  const totalProducts = products.length
  const totalCustomers = customers.length

  const stats = [
    { label: 'Delivered Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, change: '', trend: 'up', icon: DollarSign },
    { label: 'Total Orders', value: totalOrders.toLocaleString('en-IN'), change: '', trend: 'up', icon: ShoppingBag },
    { label: 'Total Products', value: totalProducts.toLocaleString('en-IN'), change: '', trend: 'up', icon: Package },
    { label: 'Total Customers', value: totalCustomers.toLocaleString('en-IN'), change: '', trend: 'up', icon: Users }
  ]

  const recentOrders = orders.slice(0, 5)

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700'
      case 'Shipped': return 'bg-blue-100 text-blue-700'
      case 'Processing': return 'bg-yellow-100 text-yellow-700'
      case 'Pending': return 'bg-orange-100 text-orange-700'
      case 'Cancelled': return 'bg-red-100 text-red-700'
      case 'Active': return 'bg-green-100 text-green-700'
      case 'Out of Stock': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <Check size={14} />
      case 'Shipped': return <Package size={14} />
      case 'Processing': return <Clock size={14} />
      case 'Pending': return <Clock size={14} />
      case 'Cancelled': return <XCircle size={14} />
      default: return null
    }
  }

  if (loading) {
    return (
      <div className="text-center py-10 text-[#654f44]">Loading dashboard...</div>
    )
  }

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
                    <td className="py-3 px-4 text-[#2c1910] font-medium">₹{Number(order.amount || 0).toLocaleString('en-IN')}</td>
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
