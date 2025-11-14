// ==================== PROFILE BACKEND API (No Authentication) ====================
// Add these routes to your existing server.js


import express from "express";
import mysql from mysql2/promise.js;

const router = express.Router();

// Database connection (use your existing connection)
const db = require('./db'); // Your MySQL connection

// ==================== USER ROUTES ====================

// Get User Profile by Phone Number
router.get('/profile/:phone', async (req, res) => {
  try {
    const { phone } = req.params;

    const [customers] = await db.query(
      'SELECT name, phone, email, addresses FROM customers WHERE phone = ?',
      [phone]
    );

    if (customers.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const customer = customers[0];

    // Parse addresses JSON
    let addresses = [];
    if (customer.addresses) {
      addresses = typeof customer.addresses === 'string' 
        ? JSON.parse(customer.addresses) 
        : customer.addresses;
    }

    // Split name into first and last name
    const nameParts = customer.name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    res.json({
      firstName,
      lastName,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      addresses: addresses
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update User Profile
router.put('/profile/:phone', async (req, res) => {
  try {
    const { phone } = req.params;
    const { firstName, lastName, email, addresses } = req.body;

    const fullName = `${firstName} ${lastName}`.trim();
    const addressesJson = addresses ? JSON.stringify(addresses) : null;

    await db.query(
      'UPDATE customers SET name = ?, email = ?, addresses = ? WHERE phone = ?',
      [fullName, email, addressesJson, phone]
    );

    res.json({ 
      message: 'Profile updated successfully',
      profile: {
        firstName,
        lastName,
        name: fullName,
        email,
        phone,
        addresses: addresses || []
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get User Orders by Phone Number
router.get('/orders/:phone', async (req, res) => {
  try {
    const { phone } = req.params;
    const { status, limit = 50, offset = 0 } = req.query;

    let query = `
      SELECT id, customer, amount, status, date, phone
      FROM orders 
      WHERE phone = ?
    `;
    const params = [phone];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY date DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [orders] = await db.query(query, params);

    // Calculate total items per order (if you have order_items table)
    const ordersWithItems = orders.map((order) => ({
      ...order,
      items: 1, // Replace with actual count from order_items table if available
      total: parseFloat(order.amount)
    }));

    res.json(ordersWithItems);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get Single Order Details
router.get('/orders/:phone/:orderId', async (req, res) => {
  try {
    const { phone, orderId } = req.params;

    const [orders] = await db.query(
      'SELECT * FROM orders WHERE id = ? AND phone = ?',
      [orderId, phone]
    );

    if (orders.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(orders[0]);
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ error: 'Failed to fetch order details' });
  }
});

// Add/Update Address
router.post('/profile/:phone/addresses', async (req, res) => {
  try {
    const { phone } = req.params;
    const newAddress = req.body;

    // Get current addresses
    const [customers] = await db.query(
      'SELECT addresses FROM customers WHERE phone = ?',
      [phone]
    );

    if (customers.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    let addresses = [];
    if (customers[0].addresses) {
      addresses = typeof customers[0].addresses === 'string'
        ? JSON.parse(customers[0].addresses)
        : customers[0].addresses;
    }

    // Add new address with unique ID
    const addressWithId = {
      ...newAddress,
      id: Date.now()
    };
    addresses.push(addressWithId);

    // Update database
    await db.query(
      'UPDATE customers SET addresses = ? WHERE phone = ?',
      [JSON.stringify(addresses), phone]
    );

    res.json({ 
      message: 'Address added successfully',
      addresses 
    });
  } catch (error) {
    console.error('Error adding address:', error);
    res.status(500).json({ error: 'Failed to add address' });
  }
});

// Delete Address
router.delete('/profile/:phone/addresses/:addressId', async (req, res) => {
  try {
    const { phone, addressId } = req.params;

    // Get current addresses
    const [customers] = await db.query(
      'SELECT addresses FROM customers WHERE phone = ?',
      [phone]
    );

    if (customers.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    let addresses = [];
    if (customers[0].addresses) {
      addresses = typeof customers[0].addresses === 'string'
        ? JSON.parse(customers[0].addresses)
        : customers[0].addresses;
    }

    // Remove address
    addresses = addresses.filter(addr => addr.id !== parseInt(addressId));

    // Update database
    await db.query(
      'UPDATE customers SET addresses = ? WHERE phone = ?',
      [JSON.stringify(addresses), phone]
    );

    res.json({ 
      message: 'Address deleted successfully',
      addresses 
    });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ error: 'Failed to delete address' });
  }
});

// Update Default Address
router.put('/profile/:phone/addresses/:addressId/default', async (req, res) => {
  try {
    const { phone, addressId } = req.params;

    // Get current addresses
    const [customers] = await db.query(
      'SELECT addresses FROM customers WHERE phone = ?',
      [phone]
    );

    if (customers.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    let addresses = [];
    if (customers[0].addresses) {
      addresses = typeof customers[0].addresses === 'string'
        ? JSON.parse(customers[0].addresses)
        : customers[0].addresses;
    }

    // Update default status
    addresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === parseInt(addressId)
    }));

    // Update database
    await db.query(
      'UPDATE customers SET addresses = ? WHERE phone = ?',
      [JSON.stringify(addresses), phone]
    );

    res.json({ 
      message: 'Default address updated successfully',
      addresses 
    });
  } catch (error) {
    console.error('Error updating default address:', error);
    res.status(500).json({ error: 'Failed to update default address' });
  }
});

module.exports = router;

// ==================== USAGE IN SERVER.JS ====================
/*
const profileRoutes = require('./routes/profile');
app.use('/api', profileRoutes);

// API Endpoints:
// GET    /api/profile/:phone - Get user profile
// PUT    /api/profile/:phone - Update user profile
// GET    /api/orders/:phone - Get user orders
// GET    /api/orders/:phone/:orderId - Get single order details
// POST   /api/profile/:phone/addresses - Add new address
// DELETE /api/profile/:phone/addresses/:addressId - Delete address
// PUT    /api/profile/:phone/addresses/:addressId/default - Set default address
*/