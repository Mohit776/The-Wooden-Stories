import React, { useState } from 'react';
import { Package, Save, X, Upload, Trash2, AlertCircle } from 'lucide-react';

export default function AddProductForm() {
  const API_URL = 'http://localhost:5000/api';
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    stock_quantity: '',
    description: ''
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const categories = [
    { id: 'Wall Art', name: 'Wall Art' },
    { id: 'Furniture', name: 'Furniture' },
    { id: 'Decor', name: 'Decor' },
    { id: 'Storage', name: 'Storage' }
  ];

  // ✅ Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  // ✅ Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert('You can upload a maximum of 5 images.');
      e.target.value = '';
      return;
    }
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages(previews);
  };

  // ✅ Remove selected image
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // ✅ Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.stock_quantity || formData.stock_quantity < 0) newErrors.stock_quantity = 'Valid stock quantity is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (images.length === 0) newErrors.images = 'At least one image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      const fd = new FormData();
      fd.append('title', formData.title);
      fd.append('price', formData.price);
      fd.append('category', formData.category);
      fd.append('stock_quantity', formData.stock_quantity);
      fd.append('description', formData.description);

      images.forEach((img) => fd.append('images', img.file));

      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        body: fd, // ✅ Don’t set Content-Type manually
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMessage('✅ Product added successfully!');
        resetForm();
      } else {
        setErrors({ submit: data.error || 'Failed to add product' });
      }
    } catch (err) {
      console.error('Error submitting product:', err);
      setErrors({ submit: 'Failed to add product. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      price: '',
      category: '',
      stock_quantity: '',
      description: ''
    });
    setImages([]);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-[#f3e9c6] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-[#2c1910] rounded-t-lg p-6 flex items-center space-x-3">
          <div className="bg-[#654f44] p-3 rounded-lg">
            <Package className="text-[#d6c088]" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-serif text-[#f3e9c6]">Add New Product</h1>
            <p className="text-[#d6c088] text-sm">Fill in the details to add a new product</p>
          </div>
        </div>

        {/* Success */}
        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4">
            {successMessage}
          </div>
        )}

        {/* Error */}
        {errors.submit && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 flex items-start space-x-2">
            <AlertCircle size={20} className="mt-0.5" />
            <p>{errors.submit}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-b-lg shadow-lg p-8 space-y-6" encType="multipart/form-data">
          {/* Title */}
          <div>
            <label className="block text-[#654f44] font-medium mb-2">
              Product Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Oak Wooden Table"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${errors.title ? 'border-red-500' : 'border-[#d6c088] focus:border-[#654f44]'}`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Price & Images */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#654f44] font-medium mb-2">
                Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 4999"
                min="0"
                step="0.01"
                className={`w-full px-4 py-3 border-2 rounded-lg ${errors.price ? 'border-red-500' : 'border-[#d6c088] focus:border-[#654f44]'}`}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-[#654f44] font-medium mb-2">
                Product Images <span className="text-red-500">*</span>
              </label>
              <div className={`border-2 rounded-lg ${errors.images ? 'border-red-500' : 'border-[#d6c088] focus-within:border-[#654f44]'}`}>
                <label className="flex flex-col items-center justify-center w-full h-full p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-[#faf6eb] text-[#654f44] border-[#d6c088]">
                  <Upload size={24} className="mb-2 text-[#d6c088]" />
                  <span className="text-sm font-medium">Click to upload images</span>
                  <span className="text-xs text-[#8a7565] mt-1">Max 5 images</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
            </div>
          </div>

          {/* Image Previews */}
          {images.length > 0 && (
            <div>
              <label className="block text-[#654f44] font-medium mb-3">
                Image Previews ({images.length}/5)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img.url}
                      alt={`preview-${index}`}
                      className="w-full h-32 object-cover rounded-lg border-2 border-[#d6c088] shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category & Stock */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#654f44] font-medium mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg ${errors.category ? 'border-red-500' : 'border-[#d6c088] focus:border-[#654f44]'}`}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-[#654f44] font-medium mb-2">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock_quantity"
                value={formData.stock_quantity}
                onChange={handleChange}
                placeholder="e.g., 50"
                min="0"
                className={`w-full px-4 py-3 border-2 rounded-lg ${errors.stock_quantity ? 'border-red-500' : 'border-[#d6c088] focus:border-[#654f44]'}`}
              />
              {errors.stock_quantity && <p className="text-red-500 text-sm mt-1">{errors.stock_quantity}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[#654f44] font-medium mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description..."
              rows={6}
              className={`w-full px-4 py-3 border-2 rounded-lg resize-none ${errors.description ? 'border-red-500' : 'border-[#d6c088] focus:border-[#654f44]'}`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[#d6c088]">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#2c1910] text-[#f3e9c6] py-4 rounded-lg hover:bg-[#654f44] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Save size={20} />
              <span>{isSubmitting ? 'Adding...' : 'Add Product'}</span>
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="flex-1 border-2 border-[#654f44] text-[#654f44] py-4 rounded-lg hover:bg-[#f3e9c6] transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <X size={20} />
              <span>Clear Form</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
