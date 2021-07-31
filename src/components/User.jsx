import React from "react";
import "../assets/styles/components/SingleCard.scss";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

export default function User() {
  const user = useSelector((state) => state.user);

  return (
    <div className="container text-dark">
      <div className="row">
        <div className="col-md-8">
          <h2 className="mb-4 text-light">{user.user_name}</h2>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Name:</strong> {user.full_name}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> {user.email}
            </li>
          </ul>
        </div>
      </div>
      <div>
        
        {user.is_admin ? (
          <Link className="btn btn-primary btn-lg" to={"/userslist"}>
            Edit Users
          </Link>
        ) : null}
        {user.is_admin ? (
          <Link className="btn btn-success btn-lg" to={"/productslist"}>
            Edit Product
          </Link>
        ) : null}
        {user.is_admin ? (
          <td>
            <Link className="btn btn-secondary btn-lg" to={"/createproduct"}>
              Create Product
            </Link>
          </td>
        ) : null}
        {!user.is_admin ? (
          <td>
            <Link className="btn btn-secondary btn-lg" to={`/orders/${user.id}`}>
              Order History
            </Link>
          </td>
        ) : null}
      </div>
    </div>
  );
}
