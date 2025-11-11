import React from 'react'
import { 
  LayoutDashboard, Package, ShoppingBag, Users, Settings, 
  TrendingUp, TrendingDown, DollarSign, Eye, Edit2, Trash2, 
  Plus, Search, Filter, Download, Menu, X, Bell, LogOut,
  ChevronDown, MoreVertical, Check, XCircle, Clock
} from 'lucide-react';

export default function Setting() {
  return (
    <div>


          <div className="space-y-6">
              <h1 className="text-3xl font-serif text-[#2c1910]">Settings</h1>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-serif text-[#2c1910] mb-6">Store Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#654f44] font-medium mb-2">Store Name</label>
                    <input
                      type="text"
                      defaultValue="The Wooden Stories"
                      className="w-full px-4 py-3 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#654f44] font-medium mb-2">Store Email</label>
                    <input
                      type="email"
                      defaultValue="info@thewoodenstories.com"
                                            className="w-full px-4 py-3 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#654f44] font-medium mb-2">Store Contact Number</label>
                    <input
                      type="text"
                      defaultValue="+91 98765 43210"
                      className="w-full px-4 py-3 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#654f44] font-medium mb-2">Store Address</label>
                    <textarea
                      defaultValue="123, MG Road, Jaipur, Rajasthan - 302001"
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none resize-none"
                    ></textarea>
                  </div>
                  <div className="flex items-center justify-end space-x-4 pt-4">
                    <button className="px-6 py-2 border-2 border-[#654f44] text-[#654f44] rounded-lg hover:bg-[#f3e9c6] transition-colors duration-300">
                      Cancel
                    </button>
                    <button className="px-6 py-2 bg-[#2c1910] text-[#f3e9c6] rounded-lg hover:bg-[#654f44] transition-colors duration-300">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-serif text-[#2c1910] mb-6">Admin Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#654f44] font-medium">Enable Notifications</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#2c1910]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#654f44] font-medium">Dark Mode</span>
                    <input type="checkbox" className="w-5 h-5 accent-[#2c1910]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#654f44] font-medium">Auto Backup Data</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#2c1910]" />
                  </div>
                </div>
              </div>
            </div>
      
    </div>
  )
}
