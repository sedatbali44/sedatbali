import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ViewOrder() {
  const [orders, setOrder] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []); // eslint-disable-line

  const loadOrders = async (data) => {
    const result = await axios.get("http://localhost:8081/api/v1/order");
    setOrder(result.data);
  };

  const deleteOrder = async (id) => {
    await axios.delete(`http://localhost:8081/api/v1/order/${id}`);
    loadOrders();
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Order</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{order.firstName}</td>
                <td>{order.lastName}</td>
                <td>{order.order}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/vieworder/${order.id}`}
                  >
                    View
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteOrder(order.id)}
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
}
