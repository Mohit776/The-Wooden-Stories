import express from "express";
import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import pool from "../db.js";

const router = express.Router();

// Create Razorpay order
router.post("/order", async (req, res) => {
  try {
    const { amount, currency = "INR", receipt, notes } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "amount is required" });
    }

    const options = {
      amount: Math.round(Number(amount) * 100),
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {},
    };

    const order = await razorpay.orders.create(options);
    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});

// Verify Razorpay payment
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing Razorpay payment details" });
    }

    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(payload)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // At this point, you can:
    // - mark order as paid in DB
    // - create entry in `orders` table, etc.

    try {
      const orderDetails = await razorpay.orders.fetch(razorpay_order_id);

      let amount = null;
      if (orderDetails && typeof orderDetails.amount === "number") {
        amount = orderDetails.amount / 100; // convert from paise to rupees
      }

      const customer = req.body.customer || "Online Customer";
      const status = "Order Recieved";
      const date = new Date();
      const items = req.body.items || null;

      await pool.query(
        "INSERT INTO orders (id, customer, amount, status, date, phone, items) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [razorpay_order_id, customer, amount ?? 0, status, date, req.body.customer || null, items]
      );
    } catch (dbOrFetchError) {
      console.error("Error saving verified order:", dbOrFetchError);
      // Even if saving fails, the payment itself was verified successfully
    }

    res.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error);
    res.status(500).json({ error: "Failed to verify payment" });
  }
});

export default router;
