import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader, UploadCloud, ArrowLeft, Package } from "lucide-react";
import axios from "axios";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000/api";

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    stock_quantity: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/products/${id}`);
        const product = res.data;

        setForm({
          title: product.title,
          price: product.price,
          category: product.category,
          stock_quantity: product.stock_quantity,
          description: product.description,
        });

        // Parse Cloudinary image URLs
        const existingImages =
          typeof product.images === "string"
            ? JSON.parse(product.images || "[]")
            : product.images || [];
        setPreview(existingImages);
      } catch (err) {
        console.error(err);
        setError("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Handle new image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + preview.length > 5) {
      alert("You can upload up to 5 images total.");
      return;
    }

    setImages(files);
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setPreview((prev) => [...prev, ...newPreviews]);
  };

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Submit updated product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);

      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      images.forEach((img) => formData.append("images", img));

      const res = await axios.put(`${API_URL}/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        alert("Product updated successfully!");
        navigate("/products");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update product.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3e9c6] flex items-center justify-center">
        <Loader size={48} className="animate-spin text-[#2c1910]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3e9c6] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-[#2c1910] rounded-t-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-[#654f44] p-3 rounded-lg">
                <Package className="text-[#d6c088]" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-serif text-[#f3e9c6]">Edit Product</h1>
                <p className="text-[#d6c088] text-sm">Update product details</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/products")}
              className="flex items-center space-x-2 text-[#f3e9c6] hover:text-[#d6c088] transition-colors duration-300"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-b-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Title */}
            <div>
              <label className="block text-[#654f44] font-medium mb-2">
                Product Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g., Walnut Wall Panel"
                required
                className="w-full px-4 py-3 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none transition-colors duration-300"
              />
            </div>

            {/* Price and Category */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#654f44] font-medium mb-2">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g., 8999"
                  required
                  className="w-full px-4 py-3 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-[#654f44] font-medium mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="e.g., Wall Art"
                  required
                  className="w-full px-4 py-3 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none transition-colors duration-300"
                />
              </div>
            </div>

            {/* Stock Quantity */}
            <div>
              <label className="block text-[#654f44] font-medium mb-2">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock_quantity"
                value={form.stock_quantity}
                onChange={handleChange}
                placeholder="e.g., 45"
                required
                className="w-full px-4 py-3 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none transition-colors duration-300"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-[#654f44] font-medium mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={6}
                placeholder="Enter product description..."
                required
                className="w-full px-4 py-3 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none transition-colors duration-300 resize-none"
              />
            </div>

            {/* Product Images */}
            <div>
              <label className="block text-[#654f44] font-medium mb-2">
                Product Images <span className="text-red-500">*</span>
              </label>
              <p className="text-[#654f44] text-sm mb-3">Maximum 5 images allowed</p>

              {/* Image Previews */}
              {preview.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
                  {preview.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={img}
                        alt={`Preview ${idx + 1}`}
                        className="w-full h-24 object-cover rounded-lg border-2 border-[#d6c088]"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Area */}
              <div className="border-2 border-dashed border-[#d6c088] rounded-lg p-8 text-center hover:border-[#654f44] transition-colors duration-300">
                <UploadCloud className="mx-auto text-[#654f44] mb-3" size={40} />
                <p className="text-[#654f44] font-medium mb-2">Click to upload images</p>
                <p className="text-[#654f44] text-sm mb-4">
                  {preview.length > 0 
                    ? `${preview.length} image(s) uploaded - ${5 - preview.length} more allowed`
                    : "Drag and drop or click to browse"}
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block cursor-pointer bg-[#2c1910] text-[#f3e9c6] px-6 py-3 rounded-lg hover:bg-[#654f44] transition-colors duration-300"
                >
                  Select Images
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-[#d6c088]">
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[#2c1910] text-[#f3e9c6] py-4 rounded-lg hover:bg-[#654f44] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving && <Loader size={20} className="animate-spin" />}
                <span>{saving ? "Updating Product..." : "Update Product"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}