import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showUserCompletedOrders } from "../redux/orders";
import { useEffect } from "react";

const Orders = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const orders = useSelector(state => state.orders)

  useEffect(() => {
    console.log(user.id)
    if(user.id)
      dispatch(showUserCompletedOrders(user.id))
  }, [user])


  return (
    <div className="container mt-2 text-primary">
      <div className="row mt-3">
        <table className="table  text-center text-light bg-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Payment Method</th>
              <th scope="col">State</th>
              <th scope="col">Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
                <tr key={order.id}>
                    <td scope="row">{order.id}</td>
                    <td scope="row">{order.payment_method}</td>
                    <td scope="row">{order.state}</td>
                    <td scope="row">{order.createdAt}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
