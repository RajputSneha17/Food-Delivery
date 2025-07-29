import express from "express";
import cors from "cors";
import { connectDb } from "./Config/db.js";
import foodRouter from "./routes/FoodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import dotenv from "dotenv";
import cron from 'node-cron';
import axios from 'axios';
dotenv.config();

cron.schedule('*/10 * * * *', async () => { 
  try {
    await axios.get('https://food-delivery-5nzz.onrender.com'); 
    console.log('server start again');
  } catch (error) {
    console.error('Error:', error.message);
  }
});

//add config
const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDb();

//api endpoint
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
