import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, X, ShoppingBag, Heart, Package, Settings, Bell, Shield, CreditCard, LogOut } from 'lucide-react';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    firstName: 'Rajesh',
    lastName: 'Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 98765 43210',
    address: '123 Artisan Street',
    city: 'Faridabad',
    state: 'Haryana',
    pincode: '121001'
  });

  const [editData, setEditData] = useState({ ...profileData });

  const orders = [
    { id: 'ORD-2024-001', date: '2024-10-15', items: 2, total: 33998, status: 'Delivered' },
    { id: 'ORD-2024-002', date: '2024-10-28', items: 1, total: 12999, status: 'Shipped' },
    { id: 'ORD-2024-003', date: '2024-11-02', items: 3, total: 45997, status: 'Processing' }
  ];

  const addresses = [
    {
      id: 1,
      type: 'Home',
      name: 'Rajesh Kumar',
      address: '123 Artisan Street, Heritage Market',
      city: 'Faridabad',
      state: 'Haryana',
      pincode: '121001',
      phone: '+91 98765 43210',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      name: 'Rajesh Kumar',
      address: '456 Business Hub, Sector 15',
      city: 'Faridabad',
      state: 'Haryana',
      pincode: '121007',
      phone: '+91 98765 43211',
      isDefault: false
    }
  ];

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-100';
      case 'Shipped': return 'text-blue-600 bg-blue-100';
      case 'Processing': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-[#f3e9c6] min-h-screen pt-9">
      {/* Navigation */}
   

      {/* Hero Section */}
      <section className="bg-[#2c1910] pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 bg-[#654f44] rounded-full flex items-center justify-center">
              <User className="text-[#f3e9c6]" size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-[#f3e9c6] mb-1">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="text-[#d6c088]">{profileData.email}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-4 space-y-2 sticky top-24">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === 'profile' ? 'bg-[#2c1910] text-[#f3e9c6]' : 'text-[#654f44] hover:bg-[#f3e9c6]'
                  }`}
                >
                  <User size={20} />
                  <span>Profile</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === 'orders' ? 'bg-[#2c1910] text-[#f3e9c6]' : 'text-[#654f44] hover:bg-[#f3e9c6]'
                  }`}
                >
                  <Package size={20} />
                  <span>Orders</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === 'addresses' ? 'bg-[#2c1910] text-[#f3e9c6]' : 'text-[#654f44] hover:bg-[#f3e9c6]'
                  }`}
                >
                  <MapPin size={20} />
                  <span>Addresses</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === 'wishlist' ? 'bg-[#2c1910] text-[#f3e9c6]' : 'text-[#654f44] hover:bg-[#f3e9c6]'
                  }`}
                >
                  <Heart size={20} />
                  <span>Wishlist</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === 'settings' ? 'bg-[#2c1910] text-[#f3e9c6]' : 'text-[#654f44] hover:bg-[#f3e9c6]'
                  }`}
                >
                  <Settings size={20} />
                  <span>Settings</span>
                </button>

                <div className="pt-4 border-t border-[#d6c088]">
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300">
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-serif text-[#2c1910]">Personal Information</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 text-[#2c1910] hover:text-[#654f44] transition-colors duration-300"
                      >
                        <Edit2 size={18} />
                        <span>Edit</span>
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSave}
                          className="flex items-center space-x-2 bg-[#2c1910] text-[#f3e9c6] px-4 py-2 rounded-lg hover:bg-[#654f44] transition-colors duration-300"
                        >
                          <Save size={18} />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center space-x-2 text-[#654f44] hover:text-red-500 transition-colors duration-300"
                        >
                          <X size={18} />
                          <span>Cancel</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#654f44] font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={isEditing ? editData.firstName : profileData.firstName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none disabled:bg-gray-50 transition-colors duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-[#654f44] font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={isEditing ? editData.lastName : profileData.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none disabled:bg-gray-50 transition-colors duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-[#654f44] font-medium mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={isEditing ? editData.email : profileData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none disabled:bg-gray-50 transition-colors duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-[#654f44] font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={isEditing ? editData.phone : profileData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none disabled:bg-gray-50 transition-colors duration-300"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[#654f44] font-medium mb-2">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={isEditing ? editData.address : profileData.address}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none disabled:bg-gray-50 transition-colors duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-[#654f44] font-medium mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={isEditing ? editData.city : profileData.city}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none disabled:bg-gray-50 transition-colors duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-[#654f44] font-medium mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={isEditing ? editData.state : profileData.state}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none disabled:bg-gray-50 transition-colors duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-[#654f44] font-medium mb-2">Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        value={isEditing ? editData.pincode : profileData.pincode}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none disabled:bg-gray-50 transition-colors duration-300"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-serif text-[#2c1910] mb-6">My Orders</h2>
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-serif text-[#2c1910] mb-1">Order {order.id}</h3>
                          <p className="text-[#654f44] text-sm">Placed on {order.date}</p>
                        </div>
                        <span className={`mt-2 md:mt-0 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-[#d6c088]">
                        <div className="flex items-center space-x-6 text-[#654f44] text-sm mb-3 sm:mb-0">
                          <span>{order.items} {order.items === 1 ? 'item' : 'items'}</span>
                          <span className="text-[#2c1910] font-serif text-xl font-semibold">₹{order.total.toLocaleString()}</span>
                        </div>
                        <button className="bg-[#2c1910] text-[#f3e9c6] px-6 py-2 rounded-lg hover:bg-[#654f44] transition-colors duration-300">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-serif text-[#2c1910]">Saved Addresses</h2>
                    <button className="bg-[#2c1910] text-[#f3e9c6] px-6 py-2 rounded-lg hover:bg-[#654f44] transition-colors duration-300">
                      Add New Address
                    </button>
                  </div>
                  
                  {addresses.map((address) => (
                    <div key={address.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-[#2c1910] p-2 rounded-lg">
                            <MapPin className="text-[#d6c088]" size={20} />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-lg font-serif text-[#2c1910]">{address.type}</h3>
                              {address.isDefault && (
                                <span className="px-2 py-1 bg-[#d6c088] text-[#2c1910] text-xs rounded-full">Default</span>
                              )}
                            </div>
                            <p className="text-[#654f44] font-medium">{address.name}</p>
                          </div>
                        </div>
                        <button className="text-[#654f44] hover:text-[#2c1910] transition-colors duration-300">
                          <Edit2 size={18} />
                        </button>
                      </div>
                      
                      <div className="pl-11 text-[#654f44]">
                        <p>{address.address}</p>
                        <p>{address.city}, {address.state} - {address.pincode}</p>
                        <p className="mt-2">Phone: {address.phone}</p>
                      </div>

                      <div className="flex space-x-3 mt-4 pl-11">
                        {!address.isDefault && (
                          <button className="text-[#2c1910] hover:text-[#654f44] text-sm font-medium transition-colors duration-300">
                            Set as Default
                          </button>
                        )}
                        <button className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-300">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                  <Heart className="mx-auto mb-4 text-[#654f44]" size={48} />
                  <h2 className="text-2xl font-serif text-[#2c1910] mb-4">Your Wishlist</h2>
                  <p className="text-[#654f44] mb-6">You have 6 items in your wishlist</p>
                  <button className="bg-[#2c1910] text-[#f3e9c6] px-8 py-3 rounded-lg hover:bg-[#654f44] transition-colors duration-300">
                    View Wishlist
                  </button>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-serif text-[#2c1910] mb-6">Account Settings</h2>
                  
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Bell className="text-[#654f44]" size={24} />
                        <div>
                          <h3 className="text-lg font-medium text-[#2c1910]">Notifications</h3>
                          <p className="text-[#654f44] text-sm">Manage your notification preferences</p>
                        </div>
                      </div>
                      <button className="text-[#2c1910] hover:text-[#654f44] transition-colors duration-300">
                        <Edit2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Shield className="text-[#654f44]" size={24} />
                        <div>
                          <h3 className="text-lg font-medium text-[#2c1910]">Security</h3>
                          <p className="text-[#654f44] text-sm">Change password and security settings</p>
                        </div>
                      </div>
                      <button className="text-[#2c1910] hover:text-[#654f44] transition-colors duration-300">
                        <Edit2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="text-[#654f44]" size={24} />
                        <div>
                          <h3 className="text-lg font-medium text-[#2c1910]">Payment Methods</h3>
                          <p className="text-[#654f44] text-sm">Manage your saved payment methods</p>
                        </div>
                      </div>
                      <button className="text-[#2c1910] hover:text-[#654f44] transition-colors duration-300">
                        <Edit2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

   
    </div>
  );
}