import React, { useState, useEffect } from 'react';
import { User, Phone, MapPin, Save, Loader, AlertCircle, CheckCircle, Mail } from 'lucide-react';
import axios from 'axios';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    email: '',
    houseDoorNo: '',
    street: '',
    area: '',
    pincode: '',
    state: ''
  });

  const API_URL = 'http://localhost:5000/api';

  // Get phone from localStorage
  const getUserPhone = () => {
    return localStorage.getItem('userPhone');
  };

  // Fetch existing profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const phone = getUserPhone();

        if (!phone) {
          setError('Phone number not found. Please login first.');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_URL}/customers/${phone}`);
        
        if (response.data) {
          // Parse addresses JSON
          let addressData = {};
          if (response.data.addresses) {
            const addresses = typeof response.data.addresses === 'string' 
              ? JSON.parse(response.data.addresses) 
              : response.data.addresses;
            
            const primaryAddress = Array.isArray(addresses) 
              ? addresses[0] || {} 
              : addresses;
            
            addressData = {
              houseDoorNo: primaryAddress.houseDoorNo || '',
              street: primaryAddress.street || '',
              area: primaryAddress.area || '',
              pincode: primaryAddress.pincode || '',
              state: primaryAddress.state || ''
            };
          }

          setProfileData({
            name: response.data.name || '',
            phone: response.data.phone || '',
            email: response.data.email || '',
            ...addressData
          });
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        if (err.response && err.response.status === 404) {
          // Profile doesn't exist yet
          const phone = getUserPhone();
          setProfileData({ ...profileData, phone: phone });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          alert(`Location detected: Lat ${position.coords.latitude}, Long ${position.coords.longitude}`);
        },
        (error) => {
          alert('Unable to get location. Please enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const validateForm = () => {
    if (!profileData.name.trim()) {
      setError('Name is required');
      return false;
    }

    if (!profileData.phone || profileData.phone.length !== 10) {
      setError('Valid 10-digit phone number is required');
      return false;
    }

    if (profileData.email && !profileData.email.includes('@')) {
      setError('Valid email is required');
      return false;
    }

    if (!profileData.houseDoorNo.trim()) {
      setError('House/Door No. is required');
      return false;
    }

    if (!profileData.street.trim()) {
      setError('Street is required');
      return false;
    }

    if (!profileData.area.trim()) {
      setError('Area is required');
      return false;
    }

    if (!profileData.pincode || profileData.pincode.length !== 6) {
      setError('Valid 6-digit Pincode is required');
      return false;
    }

    if (!profileData.state.trim()) {
      setError('State is required');
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Prepare address object
      const addressObj = {
        houseDoorNo: profileData.houseDoorNo,
        street: profileData.street,
        area: profileData.area,
        pincode: profileData.pincode,
        state: profileData.state
      };

      const dataToSave = {
        name: profileData.name,
        phone: profileData.phone,
        email: profileData.email,
        addresses: JSON.stringify(addressObj)
      };

      // Check if customer exists
      let customerExists = false;
      try {
        await axios.get(`${API_URL}/customers/${profileData.phone}`);
        customerExists = true;
      } catch (err) {
        customerExists = false;
      }

      if (customerExists) {
        // Update existing profile
        await axios.put(`${API_URL}/customers/${profileData.phone}`, dataToSave);
      } else {
        // Create new customer
        await axios.post(`${API_URL}/customers`, dataToSave);
      }

      setSuccess('Profile saved successfully!');
      
      // Store phone in localStorage
      localStorage.setItem('userPhone', profileData.phone);
      document.cookie = `userPhone=${profileData.phone}; path=/; max-age=31536000`;

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Failed to save profile. Please try again.');
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
    <div className="min-h-screen bg-[#f3e9c6] pt-24 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-lg shadow-lg p-6 border-b-2 border-[#f3e9c6]">
          <div className="flex items-center space-x-3">
            <div className="bg-[#2c1910] p-3 rounded-lg">
              <User className="text-[#d6c088]" size={28} />
            </div>
            <h1 className="text-3xl font-serif text-[#2c1910]">Profile Settings</h1>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 flex items-start space-x-2">
            <CheckCircle size={20} className="shrink-0 mt-0.5" />
            <p className="font-medium">{success}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 flex items-start space-x-2">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-b-lg shadow-lg p-8">
          <div className="space-y-6">
            {/* Name and Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#1f2937] font-semibold mb-2">User Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2c1910] focus:outline-none transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-[#1f2937] font-semibold mb-2">Mobile</label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  placeholder="Enter 10-digit mobile number"
                  maxLength="10"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2c1910] focus:outline-none transition-colors duration-300"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#1f2937] font-semibold mb-2">Email (Optional)</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2c1910] focus:outline-none transition-colors duration-300"
                />
              </div>
            </div>

            {/* Address Header with Use My Location Button */}
            <div className="flex justify-between items-center pt-4">
              <h2 className="text-xl font-semibold text-[#1f2937]">Address</h2>
              <button
                onClick={handleUseMyLocation}
                className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                <MapPin size={18} />
                <span>Use My Location</span>
              </button>
            </div>

            {/* House/Door No. and Street */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#1f2937] font-semibold mb-2">House / Door No.</label>
                <input
                  type="text"
                  name="houseDoorNo"
                  value={profileData.houseDoorNo}
                  onChange={handleChange}
                  placeholder="Enter house/door number"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2c1910] focus:outline-none transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-[#1f2937] font-semibold mb-2">Street</label>
                <input
                  type="text"
                  name="street"
                  value={profileData.street}
                  onChange={handleChange}
                  placeholder="Enter street name"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2c1910] focus:outline-none transition-colors duration-300"
                />
              </div>
            </div>

            {/* Area and Pincode */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#1f2937] font-semibold mb-2">Area</label>
                <input
                  type="text"
                  name="area"
                  value={profileData.area}
                  onChange={handleChange}
                  placeholder="Enter area"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2c1910] focus:outline-none transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-[#1f2937] font-semibold mb-2">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={profileData.pincode}
                  onChange={handleChange}
                  placeholder="Enter 6-digit pincode"
                  maxLength="6"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2c1910] focus:outline-none transition-colors duration-300"
                />
              </div>
            </div>

            {/* State */}
            <div>
              <label className="block text-[#1f2937] font-semibold mb-2">State</label>
              <input
                type="text"
                name="state"
                value={profileData.state}
                onChange={handleChange}
                placeholder="Enter state"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#2c1910] focus:outline-none transition-colors duration-300"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              {saving ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== BACKEND API ROUTES (Updated for 4 fields only) ====================
/*
Add these routes to your Express backend:

import express from "express";
import db from "../db.js";

const router = express.Router();

// GET customer by phone
router.get("/:phone", async (req, res) => {
  try {
    const { phone } = req.params;
    const [rows] = await db.query(
      "SELECT name, phone, email, addresses FROM customers WHERE phone = ?",
      [phone]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching customer:", err);
    res.status(500).json({ error: "Failed to fetch customer" });
  }
});

// CREATE new customer
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, addresses } = req.body;

    // Check if customer exists
    const [existing] = await db.query("SELECT phone FROM customers WHERE phone = ?", [phone]);
    if (existing.length > 0) {
      return res.status(400).json({ error: "Phone number already registered" });
    }

    // Insert new customer
    await db.query(
      "INSERT INTO customers (name, phone, email, addresses) VALUES (?, ?, ?, ?)",
      [name, phone, email || '', addresses]
    );

    res.status(201).json({ 
      message: "Customer created successfully",
      customer: { name, phone, email, addresses }
    });
  } catch (err) {
    console.error("Error creating customer:", err);
    res.status(500).json({ error: "Failed to create customer" });
  }
});

// UPDATE customer by phone
router.put("/:phone", async (req, res) => {
  try {
    const { phone } = req.params;
    const { name, email, addresses } = req.body;

    await db.query(
      "UPDATE customers SET name = ?, email = ?, addresses = ? WHERE phone = ?",
      [name, email || '', addresses, phone]
    );

    res.json({ 
      message: "Customer updated successfully",
      customer: { name, phone, email, addresses }
    });
  } catch (err) {
    console.error("Error updating customer:", err);
    res.status(500).json({ error: "Failed to update customer" });
  }
});

export default router;

// In your main server.js:
import customerRoutes from "./routes/customers.js";
app.use("/api/customers", customerRoutes);
*/

// ==================== DATABASE STRUCTURE ====================
/*
CREATE TABLE customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(10) UNIQUE NOT NULL,
  email VARCHAR(255),
  addresses TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

// addresses field stores JSON:
{
  "houseDoorNo": "123",
  "street": "Main Street",
  "area": "Downtown",
  "pincode": "121001",
  "state": "Haryana"
}
*/