import express from "express";
import pool from "../db.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// 🧾 Get all products
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// 🧾 Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [req.params.id]);
    if (!rows || rows.length === 0) return res.status(404).json({ error: "Product not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// ➕ Add new product (with image upload)
// Add new product (with images)
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    const { title, price, category, stock_quantity, description } = req.body;

    // Safely map uploaded images (if any)
    const imagePaths = req.files && req.files.length > 0
      ? req.files.map((f) => f.path)
      : [];

    const [result] = await pool.query(
      "INSERT INTO products (title, price, category, stock_quantity, description, images) VALUES (?, ?, ?, ?, ?, ?)",
      [title, price, category, stock_quantity, description, JSON.stringify(imagePaths)]
    );

    res.status(201).json({
      id: result.insertId,
      message: "✅ Product created successfully",
      images: imagePaths
    });

  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Failed to create product" });
  }
});

// ✏️ Update product
router.put("/:id", upload.array("images", 5), async (req, res) => {
  try {
    const { title, price, category, stock_quantity, description } = req.body;
    const hasNewImages = req.files && req.files.length > 0;
    const newImages = hasNewImages ? req.files.map((f) => f.path) : null;

    if (hasNewImages) {
      await pool.query(
        "UPDATE products SET title=?, price=?, category=?, stock_quantity=?, description=?, images=? WHERE id=?",
        [title, price, category, stock_quantity, description, JSON.stringify(newImages), req.params.id]
      );
    } else {
      await pool.query(
        "UPDATE products SET title=?, price=?, category=?, stock_quantity=?, description=? WHERE id=?",
        [title, price, category, stock_quantity, description, req.params.id]
      );
    }

    res.json({ message: "✅ Product updated successfully" });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// 🗑 Delete product
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM products WHERE id=?", [req.params.id]);
    res.json({ message: "🗑 Product deleted" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;
