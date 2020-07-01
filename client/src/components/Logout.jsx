import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logOut } from "../actions/authActions";

class Logout extends Component {
  render() {
    return (
      <button
        className="btn btn-danger mx-2"
        onClick={() => this.props.logOut()}
      >
        Logout
      </button>
    );
  }
}

Logout.propTypes = {
  logOut: PropTypes.func.isRequired,
};

export default connect(null, { logOut })(Logout);
