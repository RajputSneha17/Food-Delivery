import express from "express";
import {
  createOrder,
  verifyPayment,
  placeOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/create-order", createOrder);
orderRouter.post("/verify", verifyPayment);
orderRouter.post("/place", placeOrder);

export default orderRouter;
