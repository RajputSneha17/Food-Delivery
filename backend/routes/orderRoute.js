import express from "express";
import {
  createOrder,
  verifyPayment,
  placeOrder,
  userOrder,
  allOrder,
  updateStatus,
  
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/create-order", createOrder);
orderRouter.post("/verify", verifyPayment);
orderRouter.post("/place", placeOrder);
orderRouter.post("/userorders", authMiddleware, userOrder );
orderRouter.get("/list", allOrder ); 
orderRouter.post("/status", updateStatus ); 

export default orderRouter;
