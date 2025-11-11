import express from "express";
import db from "../db.js";

const router = express.Router();

// ✅ GET all customers from orders table
router.get("/", async (req, res) => {
  const query = `
    SELECT 
      o.customer AS name,
      (
        SELECT o2.phone 
        FROM orders o2 
        WHERE o2.customer = o.customer 
        ORDER BY o2.date DESC 
        LIMIT 1
      ) AS phone,
      COUNT(*) AS orders,
      SUM(o.amount) AS spent,
      MIN(o.date) AS joined
    FROM orders o
    GROUP BY o.customer
    ORDER BY joined DESC
  `;

  try {
    const [rows] = await db.query(query);
    return res.json(rows);
  } catch (err) {
    console.error("DB Error:", err);
    return res.status(500).json({ error: "Database query failed", message: err?.message });
  }
});

export default router;
