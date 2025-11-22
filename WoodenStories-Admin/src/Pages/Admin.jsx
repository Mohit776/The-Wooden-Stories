import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut } from 'lucide-react';
import Dashboard from '../components/Admin/dashboard';
import Order from '../components/Admin/order';
import Setting from '../components/Admin/setting';
import Customer from '../components/Admin/customer';
import Products from '../components/Admin/product';
import Navbar from '../components/Navbar';


export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        let title = 'Admin Dashboard | The Wooden Stories';
        if (activeTab === 'orders') {
            title = 'Admin Orders | The Wooden Stories';
        } else if (activeTab === 'products') {
            title = 'Admin Products | The Wooden Stories';
        } else if (activeTab === 'customers') {
            title = 'Admin Customers | The Wooden Stories';
        } else if (activeTab === 'settings') {
            title = 'Admin Settings | The Wooden Stories';
        }
        document.title = title;
    }, [activeTab]);

    return (
        <div className="bg-[#f3e9c6] min-h-screen">

            <div className='absolute z-100'>
                <Navbar onToggleSidebar={() => setSidebarOpen(true)} />

            </div>
            {/* Top Navigation */}

            <div className="flex pt-20">
                {/*  Sidebar */}
                
                <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } mt-20 lg:mt-0`}>
                    <div className="h-full overflow-y-auto p-4">
                        <nav className="space-y-2">
                            <button
                                onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${activeTab === 'dashboard' ? 'bg-[#2c1910] text-[#f3e9c6]' : 'text-[#654f44] hover:bg-[#f3e9c6]'
                                    }`}
                            >
                                <LayoutDashboard size={20} />
                                <span>Dashboard</span>
                            </button>

                            <button
                                onClick={() => { setActiveTab('orders'); setSidebarOpen(false); }}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${activeTab === 'orders' ? 'bg-[#2c1910] text-[#f3e9c6]' : 'text-[#654f44] hover:bg-[#f3e9c6]'
                                    }`} >

                                <ShoppingBag size={20} />
                                <span>Orders</span>
                            </button>

                            <button
                                onClick={() => { setActiveTab('products'); setSidebarOpen(false); }}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${activeTab === 'products' ? 'bg-[#2c1910] text-[#f3e9c6]' : 'text-[#654f44] hover:bg-[#f3e9c6]'
                                    }`}
                            >
                                <Package size={20} />
                                <span>Products</span>
                            </button>

                            <button
                                onClick={() => { setActiveTab('customers'); setSidebarOpen(false); }}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${activeTab === 'customers' ? 'bg-[#2c1910] text-[#f3e9c6]' : 'text-[#654f44] hover:bg-[#f3e9c6]'
                                    }`}
                            >
                                <Users size={20} />
                                <span>Customers</span>
                            </button>

                            <button
                                onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${activeTab === 'settings' ? 'bg-[#2c1910] text-[#f3e9c6]' : 'text-[#654f44] hover:bg-[#f3e9c6]'
                                    }`}
                            >
                                <Settings size={20} />
                                <span>Settings</span>
                            </button>

                            <div className="pt-4 border-t border-[#d6c088] mt-4">
                            
                            </div>
                        </nav>
                    </div>
                </aside>
             


                {/* Overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}

                {/* Main Content */}
                <main className="flex-1 p-6 overflow-auto">
                    {/* Dashboard Tab */}
                    {activeTab === 'dashboard' && (
                        <Dashboard />
                    )}

                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <Order />
                    )}

                    {/* Products Tab */}
                    {activeTab === 'products' && (
                        <Products />
                    )}

                    {/* Customers Tab */}
                    {activeTab === 'customers' && (
                        <Customer />
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                        <Setting />
                    )}
                </main>
            </div>
        </div>
    );
}
