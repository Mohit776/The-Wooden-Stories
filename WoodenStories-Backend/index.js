import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

import products from "./routes/products.js";
import customer from "./routes/customer.js";
import orders from "./routes/order.js";
import payments from "./routes/payment.js";
//import dashboard from "./routes/dashboard.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.json());

// Static upload folder
const uploadDir = process.env.UPLOAD_DIR || "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
app.use("/uploads", express.static(path.resolve(uploadDir)));


// For Testing purposes
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from Express backend mohit 👋' });
});

// Routes
app.use("/api/products", products);
app.use("/api/customers", customer);
app.use("/api/orders", orders);
app.use("/api/payments", payments);
//app.use("/api/dashboard", dashboard);


// Start
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
