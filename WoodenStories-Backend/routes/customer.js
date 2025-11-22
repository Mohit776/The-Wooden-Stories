import express from "express";
import db from "../db.js";

const router = express.Router();

// ✅ GET all customers (combined from customers table and orders table)
router.get("/", async (req, res) => {
  try {
    // First get all customers from customers table
    const [customers] = await db.query(
      "SELECT name, phone, email, addresses FROM customers"
    );

    // Then get order statistics for each customer
    const customersWithOrders = await Promise.all(
      customers.map(async (customer) => {
        const [orderStats] = await db.query(
          `SELECT 
            COUNT(*) AS orders,
            COALESCE(SUM(amount), 0) AS spent,
            MIN(date) AS joined
          FROM orders 
          WHERE phone = ?`,
          [customer.phone]
        );

        return {
          ...customer,
          orders: orderStats[0]?.orders || 0,
          spent: orderStats[0]?.spent || 0,
          joined: orderStats[0]?.joined || customer.created_at || new Date()
        };
      })
    );

    return res.json(customersWithOrders);
  } catch (err) {
    console.error("DB Error:", err);
    return res.status(500).json({ 
      error: "Database query failed", 
      message: err?.message 
    });
  }
});

// ✅ GET customer by phone
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

// ✅ CREATE new customer
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, addresses } = req.body;

    // Validate required fields
    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone are required" });
    }

    // Validate phone number (10 digits)
    if (phone.length !== 10) {
      return res.status(400).json({ error: "Phone number must be 10 digits" });
    }

    // Check if customer already exists
    const [existing] = await db.query(
      "SELECT phone FROM customers WHERE phone = ?", 
      [phone]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({ error: "Phone number already registered" });
    }

    // Insert new customer
    const [result] = await db.query(
      "INSERT INTO customers (name, phone, email, addresses) VALUES (?, ?, ?, ?)",
      [name, phone, email || '', addresses || null]
    );

    res.status(201).json({ 
      message: "Customer created successfully",
      customer: { 
        id: result.insertId,
        name, 
        phone, 
        email: email || '', 
        addresses 
      }
    });
  } catch (err) {
    console.error("Error creating customer:", err);
    res.status(500).json({ 
      error: "Failed to create customer",
      message: err?.message 
    });
  }
});

// ✅ UPDATE customer by phone
router.put("/:phone", async (req, res) => {
  try {
    const { phone } = req.params;
    const { name, email, addresses } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    // Check if customer exists
    const [existing] = await db.query(
      "SELECT phone FROM customers WHERE phone = ?", 
      [phone]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Update customer
    await db.query(
      "UPDATE customers SET name = ?, email = ?, addresses = ? WHERE phone = ?",
      [name, email || '', addresses || null, phone]
    );

    res.json({ 
      message: "Customer updated successfully",
      customer: { name, phone, email: email || '', addresses }
    });
  } catch (err) {
    console.error("Error updating customer:", err);
    res.status(500).json({ 
      error: "Failed to update customer",
      message: err?.message 
    });
  }
});

// ✅ DELETE customer by phone
router.delete("/:phone", async (req, res) => {
  try {
    const { phone } = req.params;

    // Check if customer exists
    const [existing] = await db.query(
      "SELECT phone FROM customers WHERE phone = ?", 
      [phone]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Delete customer
    await db.query("DELETE FROM customers WHERE phone = ?", [phone]);

    res.json({ 
      message: "Customer deleted successfully",
      phone 
    });
  } catch (err) {
    console.error("Error deleting customer:", err);
    res.status(500).json({ 
      error: "Failed to delete customer",
      message: err?.message 
    });
  }
});

export default router;


// ## 🔑 **Key Changes:**

// 1. **Fixed GET all customers** - Now properly combines data from both `customers` and `orders` tables
// 2. **Added validation** - Checks for required fields and proper phone format
// 3. **Better error handling** - Returns proper error messages
// 4. **Added DELETE route** - For deleting customers if needed
// 5. **Proper async/await** - All database queries properly awaited
// 6. **COALESCE** - Handles null values in order statistics
// 7. **Fixed syntax** - Removed the typo in the comment (missing `//`)

// ## 📋 **API Endpoints:**
// ```
// GET    /api/customers          - Get all customers with order stats
// GET    /api/customers/:phone   - Get single customer by phone
// POST   /api/customers          - Create new customer
// PUT    /api/customers/:phone   - Update customer
// DELETE /api/customers/:phone   - Delete customer