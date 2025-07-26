import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// 🔹 Create Razorpay order
export const createOrder = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt_" + Date.now(),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Order creation failed", error);
    res.status(500).json({ message: "Failed to create Razorpay order" });
  }
};

// 🔹 Verify Razorpay payment
export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderData, // Contains userId, items, address, amount
  } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(sign)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    try {
      const newOrder = new Order({
        ...orderData,
        payment: true,
        razorpay_order_id,
        razorpay_payment_id,
      });

      await newOrder.save();

      return res.status(200).json({
        success: true,
        message: "Payment verified and order saved!",
        orderId: newOrder._id,
      });
    } catch (err) {
      console.error("DB Save Failed:", err);
      return res.status(500).json({
        success: false,
        message: "Payment verified but failed to save order.",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid signature. Payment verification failed.",
    });
  }
};

export const placeOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    // Clear cart after placing order
    await User.findByIdAndUpdate(req.body.userId, {
      cartData: {},
    });

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to place order",
    });
  }
};

//user orders for frontend

export const userOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to access order",
    });
  }
};

export const allOrder = async (req, res) => {
  try {
    const allOrders = await orderModel.find({});
    res.json({ success: true, data: allOrders });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to access order",
    });
  }
};

//api for updating order status
export const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Update" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};
