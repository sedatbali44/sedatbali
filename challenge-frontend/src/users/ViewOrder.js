import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewOrder() {
  const [orders, setOrder] = useState({
    firstName: "",
    lastName: "",
    order: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadOrder();
  }, []); // eslint-disable-line

  const loadOrder = async () => {
    const result = await axios.get(`http://localhost:8081/api/v1/order/${id}`);
    setOrder(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              Details of user id : {orders.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>First Name:</b>
                  {orders.firstName}
                </li>
                <li className="list-group-item">
                  <b>Last Name:</b>
                  {orders.lastName}
                </li>
                <li className="list-group-item">
                  <b>Order:</b>
                  {orders.order}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/order"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
