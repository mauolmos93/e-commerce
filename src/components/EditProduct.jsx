import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import axios from "axios"

export default function EditProduct() {
  const match = useRouteMatch();
  const history = useHistory();

  const [form, setForm] = React.useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "",
    color: "",
    size: "",
    genre: "",
  });

  const id = match.params.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      form.price = parseFloat(form.price);
      form.stock = parseInt(form.stock);
      await axios.put(`/api/products/${id}`, form);
      alert("Product Edited");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group container">
          <label>Product Name</label>
          <input
            type="text"
            placeholder="Enter product name"
            className="form-control form-control-lg"
            name="name"
            onChange={handleInput}
          />
          <label>Description</label>
          <input
            type="text"
            placeholder="Enter description"
            className="form-control form-control-lg"
            name="description"
            onChange={handleInput}
          />
          <label>Price</label>
          <input
            type="number"
            placeholder="Enter product price"
            className="form-control form-control-lg"
            name="price"
            onChange={handleInput}
          />
          <label>Image</label>
          <input
            type="text"
            placeholder="Enter image url"
            className="form-control form-control-lg"
            name="image"
            onChange={handleInput}
          />
          <label>Stock</label>
          <input
            type="number"
            placeholder="Enter stock quantity"
            className="form-control form-control-lg"
            name="stock"
            onChange={handleInput}
          />
          <label>Color</label>
          <input
            type="text"
            placeholder="Enter product color"
            className="form-control form-control-lg"
            name="color"
            onChange={handleInput}
          />
          <label>Size</label>
          <input
            type="text"
            placeholder="Enter product size"
            className="form-control form-control-lg"
            name="size"
            onChange={handleInput}
          />
          <label>Genre</label>
          <input
            type="text"
            placeholder="Enter product genre"
            className="form-control form-control-lg"
            name="genre"
            onChange={handleInput}
          />
          <hr />
          <div className="container">
            <button className="btn btn-primary btn-lg">Edit</button>
          </div>
        </div>
      </form>
    </div>
  );
}
