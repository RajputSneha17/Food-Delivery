import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AddItem = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "salad",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const responce = await axios.post(`${url}/api/food/add`, formData);
    if (responce.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "salad",
      });
      setImage(false);
      toast.success(responce.data.message);
    } else {
      toast.error(responce.data.message);
    }
  };
  return (
    <div className="container mt-5">
      <form
        className="border p-4 rounded shadow-sm bg-light"
        onSubmit={onSubmitHandler}
      >
        <div className="mb-4">
          <p className="form-label fw-semibold">Upload Image</p>
          <label htmlFor="image" className="d-block">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              style={{ cursor: "pointer", maxWidth: "150px" }}
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            hidden
            required
            id="image"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Product Name</label>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            required
            placeholder="Type here"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Product Description</label>
          <textarea
            name="description"
            rows="4"
            onChange={onChangeHandler}
            value={data.description}
            placeholder="Write content here"
            required
            className="form-control"
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Product Category</label>
          <select
            name="category"
            onChange={onChangeHandler}
            className="form-select"
            value={data.category}
          >
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Product Price</label>
          <input
            type="number"
            onChange={onChangeHandler}
            value={data.price}
            name="price"
            placeholder="₹20"
            required
            className="form-control"
          />
        </div>

        <button
          type="submit"
          className="btn w-100"
          style={{ background: "tomato", color: "white" }}
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddItem;
