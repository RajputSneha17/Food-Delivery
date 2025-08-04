# 🍽️ Order Food – Full-Stack MERN Application

A complete **food ordering web application** built with the **MERN stack** (MongoDB, Express, React, Node.js). This project allows users to browse food items, add them to the cart, make payments using **Razorpay**, and track their orders in real time. An admin panel is also included to manage food items and order statuses.

---

## 🔗 Live Links

- 🧑‍🍳 [Frontend – Live Demo](https://food-delivery-ten-mocha.vercel.app/)  
- 🛠️ [Admin Panel – Live Demo](https://food-delivery-gz9p.vercel.app/)  
- 💻 [Backend - Live Demo ](https://find-hotels-o82u.onrender.com/)

---

## 🔐 User Features

- 🔑 Secure Signup and Login
- 🍔 Browse a list of available food items
- 🛒 Add items to cart and place orders
- 💳 Make online payments via **Razorpay**
- 🔄 Live order status tracking:  
  - Processing → Out for Delivery → Delivered
- 📱 Fully responsive and smooth user interface

---

## ⚙️ Admin Panel Features

- 🔄 Change the status of any order in real-time  
- ➕ Add new food items to the menu  
- ❌ Delete food items (auto-updated on the frontend)

---

## 💻 Tech Stack

### **Frontend**
- React JS  
- Axios  
- React Router DOM  
- Razorpay integration  
- CSS / Bootstrap

### **Backend**
- Node.js  
- Express.js  
- MongoDB (with Mongoose)  
- Razorpay Payment Gateway  
- JSON Web Token (JWT) for authentication  
- CORS + dotenv + other backend middleware

---

## 🧑‍💻 Getting Started Locally

1. Clone the repository:

```bash
git clone https://github.com/RajputSneha17/Food-Delivery.git
cd Food-Delivery
```

###Frontend

```bash
cd frontend 
npm install
npm run dev
```

###backend
```bash
cd backend
npm install 
nodemon server.js
```

###Admin
```bash
cd admin
npm install
npm run dev
