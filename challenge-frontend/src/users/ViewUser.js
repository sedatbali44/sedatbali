import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    houseNumber: "",
    city: "",
    country: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []); // eslint-disable-line

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/person/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              Details of user id : {user.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>First Name:</b>
                  {user.firstName}
                </li>
                <li className="list-group-item">
                  <b>Last Name:</b>
                  {user.lastName}
                </li>
                <li className="list-group-item">
                  <b>Street Address:</b>
                  {user.streetAddress}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/home"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
