import React, { Component } from "react";
import RegisterModal from "./RegisterModal";
import Logout from "../components/Logout";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        <h1 className="navbar-brand">ShoppingList</h1>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <RegisterModal />
              <Logout />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
