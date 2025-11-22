import React, { useState, useEffect } from 'react';
import {
  Edit2, Trash2, Plus, Search, Filter, AlertCircle, Loader
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL, API_URL } from '../../config';

export default function Product() {
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete product');

      setProducts(products.filter(p => p.id !== productId));
      setShowDeleteModal(false);
      setDeleteProductId(null);
      alert('Product deleted successfully!');
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product. Please try again.');
    }
  };

  // Edit product
  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const confirmDelete = (productId) => {
    setDeleteProductId(productId);
    setShowDeleteModal(true);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Inactive': return 'bg-gray-100 text-gray-700';
      case 'Out of Stock': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-serif text-[#2c1910]">Products Management</h1>
        <button 
          onClick={() => navigate("/add-product")}
          className="mt-4 sm:mt-0 bg-[#2c1910] text-[#f3e9c6] px-6 py-2 rounded-lg hover:bg-[#654f44] transition-colors duration-300 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 flex items-start space-x-2">
          <AlertCircle size={20} className="mt-0.5" />
          <div>
            <p className="font-medium">{error}</p>
            <button onClick={fetchProducts} className="text-sm underline mt-1 hover:text-red-800">
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Search + Filters */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#654f44]" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none text-[#654f44]"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>

          <button 
            onClick={fetchProducts}
            className="flex items-center space-x-2 px-4 py-2 border-2 border-[#d6c088] rounded-lg hover:bg-[#f3e9c6] transition-colors duration-300"
          >
            <Filter size={20} className="text-[#654f44]" />
            <span className="text-[#654f44]">Refresh</span>
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader className="animate-spin text-[#2c1910]" size={48} />
        </div>
      )}

      {/* Empty */}
      {!loading && products.length === 0 && (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <p className="text-[#654f44] text-lg mb-4">No products found</p>
          <button 
            onClick={() => navigate("/add-product")}
            className="bg-[#2c1910] text-[#f3e9c6] px-6 py-2 rounded-lg hover:bg-[#654f44] transition-colors duration-300"
          >
            Add Your First Product
          </button>
        </div>
      )}

      {/* Product Cards */}
      {!loading && products.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            let images = [];
            try {
              if (Array.isArray(product.images)) {
                images = product.images;
              } else if (typeof product.images === 'string') {
                const s = product.images.trim();
                if (s.startsWith('[')) {
                  images = JSON.parse(s);
                } else if (s.startsWith('http')) {
                  images = [s];
                } else if (s.startsWith('/')) {
                  images = [`${BACKEND_BASE_URL}${s}`];
                }
              }
            } catch (_) {
              images = [];
            }

            const firstImage = images.length > 0
              ? (typeof images[0] === 'string' && (images[0].startsWith('http') ? images[0] : `${BACKEND_BASE_URL}${images[0]}`))
              : null;

            return (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-[#654f44] relative">
                  {firstImage ? (
                    <img src={firstImage} alt={product.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to from-[#f3e9c6] to-[#d6c088] opacity-20"></div>
                  )}
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {product.category || 'Uncategorized'}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-[#2c1910] font-serif text-lg mb-2">{product.title}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#2c1910] font-serif text-xl font-semibold">
                      ₹{parseFloat(product.price).toLocaleString()}
                    </span>
                    <span className="text-[#654f44] text-sm">
                      Stock: {product.stock_quantity}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(product.id)}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-[#2c1910] text-[#f3e9c6] rounded-lg hover:bg-[#654f44] transition-colors duration-300"
                    >
                      <Edit2 size={16} />
                      <span>Edit</span>
                    </button>
                    <button 
                      onClick={() => confirmDelete(product.id)}
                      className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors duration-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-serif text-[#2c1910] mb-4">Delete Product?</h3>
            <p className="text-[#654f44] mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => handleDelete(deleteProductId)}
                className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteProductId(null);
                }}
                className="flex-1 border-2 border-[#654f44] text-[#654f44] py-3 rounded-lg hover:bg-[#f3e9c6] transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
