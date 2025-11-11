import express from "express";
import pool from "../db.js"; // MySQL connection pool

const router = express.Router();


// ✅ 1. Add a new order (Admin)
router.post("/", async (req, res) => {
  try {
    const { id, customer, amount, status, date } = req.body;

    if (!id || !customer || !amount) {
      return res.status(400).json({ error: "id, customer, and amount are required" });
    }

    const [result] = await pool.query(
      "INSERT INTO orders (id, customer, amount, status, date) VALUES (?, ?, ?, ?, ?)",
      [id, customer, amount, status || "Pending", date || new Date()]
    );

    res.status(201).json({ message: "✅ Order added successfully", result });
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).json({ error: "Failed to add order" });
  }
});


// ✅ 2. Get all orders
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM orders ORDER BY date DESC");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});


// ✅ 3. Update order status only (Admin)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status field is required" });
    }

    const [result] = await pool.query(
      "UPDATE orders SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "✅ Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Failed to update order status" });
  }
});

export default router;
