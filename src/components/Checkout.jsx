import { product } from "prelude-ls";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../assets/static/img/deluxo-48.png"
import { Link } from "react-router-dom"
import axios from "axios";
import { setOrder } from "../redux/order";

const Checkout = () => {

  const dispatch = useDispatch()

  const order = useSelector(state => state.order)
  const user = useSelector(state => state.user)

  const history = useHistory()

  const handlePay = async () => {
    try {
      axios.put(`/api/orders/${localStorage.getItem('orderId')}`, {
        state: 'fulfilled'
      }, 
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      localStorage.removeItem('shopcartId')
      localStorage.removeItem('orderId')
      alert("Order Completed")
      history.push('/products')
      dispatch(setOrder({}))
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = async () => {
    try {
      await axios.delete(`/api/orders/${localStorage.getItem('orderId')}`)
      localStorage.removeItem('orderId')
      localStorage.removeItem('shopcartId')
      alert("Order was cancelled.")
      history.push('/products')
      dispatch(setOrder({}))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container mt-2 text-primary">
      <div className="row mt-3">
        <table className="table  text-center text-light bg-dark">
          <thead>
            <tr>
              <th scope="col">Order</th>
              <th scope="col">Products quantity</th>
              <th scope="col">Total price</th>
              <th scope="col">Payment Method</th>
              <th scope="col">State</th>
              <th scope="col">Payment</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <th scope="row">1</th>
                <th scope="row">
                  {order.products.length}
                </th>
                <td>{`$ ${order.total_price}`}</td>
                <td>{order.payment_method}</td>
                <td>{order.state}</td>
                <td>
                  <button
                    onClick={handlePay}
                    className="btn btn-danger btn-lg me-2"
                  >
                    Pay
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn btn-danger btn-lg"
                  >
                    Cancel Order
                  </button>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
      <div className="row">
        <button
            className="btn btn-danger btn-lg"
            onClick={handlePay}
          >
            Pay
          </button>
      </div>
      <div className="row">
        <div className="col text-center">
          <h4>TOTAL: {`$ ${order.total_price}`}</h4>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
