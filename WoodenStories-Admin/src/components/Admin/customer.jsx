import React, { useEffect, useState } from 'react';
import { Search, Download, Eye, MoreVertical } from 'lucide-react';

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/customers")
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
                        <button className="text-[#2c1910] hover:text-[#654f44] transition-colors duration-300">
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
    </div>
  );
}
