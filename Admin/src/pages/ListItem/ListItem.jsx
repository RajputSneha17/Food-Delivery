import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ListItem = ({url}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="container mt-4" style={{ overflow: "hidden" }}>
      <h5>All Foods List</h5>

      <div
        className="mt-3"
        style={{
          overflowX: "auto",
          maxWidth: "100%",
          border: "1px solid #dee2e6",
          borderRadius: "4px",
        }}
      >
        <table
          className="table table-bordered table-hover text-center align-middle"
          style={{
            minWidth: "100%",
            width: "max-content",
            marginBottom: "0",
          }}
        >
          <thead className="table-light">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={`${url}/images/` + item.image}
                    alt={item.name}
                    width="60"
                    height="50"
                    style={{ objectFit: "cover" }}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>₹{item.price}</td>
                <td
                  onClick={() => removeFood(item._id)}
                  style={{ cursor: "pointer", color: "red" }}
                >
                  X
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListItem;
