import React, { useEffect, useState } from 'react';
import { Search, Download, Eye, MoreVertical, XCircle } from 'lucide-react';
import { API_URL } from '../../config';

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/customers`)
      .then(res => res.json())
      .then(data => {
        setCustomers(data);
        setLoading(false);
      })
      .catch(err => console.error("Error fetching customers:", err));
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone && c.phone.toString().includes(search))
  );

  if (loading) return <div className="text-center py-10 text-[#654f44]">Loading customers...</div>;

  return (
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
              placeholder="Search customers by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
                <th className="text-left py-3 px-4 text-[#654f44] font-medium">Phone</th>
                <th className="text-left py-3 px-4 text-[#654f44] font-medium">Orders</th>
                <th className="text-left py-3 px-4 text-[#654f44] font-medium">Total Spent</th>
                <th className="text-left py-3 px-4 text-[#654f44] font-medium">Joined</th>
                <th className="text-left py-3 px-4 text-[#654f44] font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-[#654f44] italic">
                    No customers found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#f3e9c6] hover:bg-[#f3e9c6] transition-colors duration-200"
                  >
                    <td className="py-3 px-4 text-[#2c1910] font-medium">{customer.name}</td>
                    <td className="py-3 px-4 text-[#654f44]">{customer.phone || "N/A"}</td>
                    <td className="py-3 px-4 text-[#654f44]">{customer.orders}</td>
                    <td className="py-3 px-4 text-[#2c1910] font-medium">₹{customer.spent?.toLocaleString()}</td>
                    <td className="py-3 px-4 text-[#654f44]">{customer.joined}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-[#2c1910] hover:text-[#654f44] transition-colors duration-300"
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          <Eye size={18} />
                        </button>
                        <button className="text-[#2c1910] hover:text-[#654f44] transition-colors duration-300">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full mx-4 p-6 relative border border-[#f3e9c6]">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-serif text-[#2c1910]">Customer Details</h2>
                <p className="text-xs text-gray-500 mt-1">Phone: {selectedCustomer.phone || 'N/A'}</p>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-500 hover:text-[#2c1910] transition-colors duration-200"
                aria-label="Close details"
              >
                <XCircle size={22} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm text-[#2c1910] max-h-80 overflow-y-auto pr-1">
              <div className="space-y-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Name</p>
                  <p className="font-semibold">{selectedCustomer.name}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Phone</p>
                  <p>{selectedCustomer.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Email</p>
                  <p>{selectedCustomer.email || 'N/A'}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Total Orders</p>
                  <p>{selectedCustomer.orders ?? 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Total Spent</p>
                  <p className="font-semibold">₹{selectedCustomer.spent?.toLocaleString?.() || '0'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Joined</p>
                  <p>{selectedCustomer.joined || 'N/A'}</p>
                </div>
              </div>

              <div className="md:col-span-2 mt-2">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Address</p>
                <div className="bg-[#f9f5e7] border border-[#f3e9c6] rounded-md p-3 text-xs whitespace-pre-wrap break-words">
                  {selectedCustomer.addresses
                    ? (() => {
                        try {
                          const addr =
                            typeof selectedCustomer.addresses === 'string'
                              ? JSON.parse(selectedCustomer.addresses)
                              : selectedCustomer.addresses;

                          if (Array.isArray(addr)) {
                            const a = addr[0] || {};
                            return `${a.houseDoorNo || ''} ${a.street || ''}\n${a.area || ''}\n${a.pincode || ''} ${a.state || ''}`.trim() || 'N/A';
                          }

                          return `${addr.houseDoorNo || ''} ${addr.street || ''}\n${addr.area || ''}\n${addr.pincode || ''} ${addr.state || ''}`.trim() || 'N/A';
                        } catch {
                          return String(selectedCustomer.addresses);
                        }
                      })()
                    : 'N/A'}
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
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
