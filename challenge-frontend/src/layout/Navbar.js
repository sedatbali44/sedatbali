import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="btn btn-secondary my-3" to="/">
            Back To Entry
          </Link>
          <Link className="btn btn-success my-3" to="/addorder">
            Create New Order
          </Link>
          <Link className="btn btn-success my-3" to="/adduser">
            Create New Person
          </Link>
          <Link className="btn btn-warning my-2" to={"/order"}>
            Orders
          </Link>
          <Link className="btn btn-warning my-2" to={"/home"}>
            Persons
          </Link>
        </div>
      </nav>
    </div>
  );
}
