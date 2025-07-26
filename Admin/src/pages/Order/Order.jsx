import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets.js";

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      setOrders(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container py-4">
      <h3 className="mb-4">All Orders</h3>
      {orders.map((order, index) => (
        <div key={index} className="card mb-4 shadow-sm">
          <div className="card-body d-flex align-items-start gap-3">
            <img
              src={assets.parcel_icon}
              alt=""
              style={{ width: "60px", height: "60px" }}
            />

            <div className="flex-grow-1 d-flex flex-column flex-md-row justify-content-between gap-3">
              {/* Left block: Order & Address */}
              <div>
                <p className="fw-bold mb-2">
                  {order.items.map((item, idx) => {
                    return `${item.name} x ${item.quantity}${
                      idx !== order.items.length - 1 ? ", " : ""
                    }`;
                  })}
                </p>
                <p className="mb-1">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <p className="mb-1">{order.address.street}</p>
                <p className="mb-1">
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country} - {order.address.zipcode}
                </p>
                <p className="mb-1">📞 {order.address.phone}</p>
              </div>

              {/* Right block: Amount + Status */}
              <div className="text-end d-lg-flex gap-4">
                <p className="mb-1">🧾 Items: {order.items.length}</p>
                <p className="mb-2">💰 ₹{order.amount}</p>

                <select
                  className="custom-select-pink"
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                >
                  <option
                    value="Food Processing"
                    selected={order.status === "Food Processing"}
                  >
                    Food Processing
                  </option>
                  <option
                    value="Out for delivery"
                    selected={order.status === "Out for delivery"}
                  >
                    Out for delivery
                  </option>
                  <option
                    value="Deliverd"
                    selected={order.status === "Deliverd"}
                  >
                    Delivered
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
