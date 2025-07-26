import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      setData(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">My Orders</h2>

      <div className="row">
        {data.map((order, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={assets.parcel_icon}
                    alt="parcel icon"
                    style={{ width: "40px", marginRight: "10px" }}
                  />
                  <h5 className="mb-0">Order #{index + 1}</h5>
                </div>

                <p className="mb-2">
                  <strong>Items:</strong>{" "}
                  {order.items.map((item, i) =>
                    i === order.items.length - 1
                      ? `${item.name} × ${item.quantity}`
                      : `${item.name} × ${item.quantity}, `
                  )}
                </p>

                <p className="mb-2">
                  <strong>Total Amount:</strong> ₹{order.amount}
                </p>

                <p className="mb-2">
                  <strong>Item Count:</strong> {order.items.length}
                </p>

                <p className="mb-3">
                  <strong>Status:</strong>{" "}
                  <span className="text-primary">&#x25cf;</span>{" "}
                  <span className="text-capitalize">{order.status}</span>
                </p>

                <button
                  className="btn w-100 trackOrderButton"
                  style={{ border: "1px solid tomato", color: "tomato" }}
                  onClick={fetchOrders}
                >
                  Track Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
