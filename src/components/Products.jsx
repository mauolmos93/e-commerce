import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { showProduct } from "../redux/products";
import axios from "axios";

const Products = () => {
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    dispatch(showProduct());
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      dispatch(showProduct());
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProduct = (id) => {
    return history.push(`/editproduct/${id}`)
  };


  return (
    <div className="container mt-2 text-primary">
      <div className="row mt-3">
        <table className="table  text-center text-light bg-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img src={product.image} style={{ width: "4rem" }} />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    Edit
                  </button>
                </td>

                <td>
                  <button
                    className="btn btn-danger btn-lg"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
