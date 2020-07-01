import React, { Component } from "react";
import { registerUser } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class RegisterModal extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    errorMessage: null,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    // register user
    this.props.registerUser(user);
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
        this.setState({
          errorMessage: error.message.message,
        });
      } else {
        this.setState({
          errorMessage: null,
        });
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-success"
          data-toggle="modal"
          data-target="#myModal"
        >
          Register
        </button>

        <div className="modal fade" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Register</h4>
                <button
                  type="button"
                  onClick={() => this.props.clearErrors()}
                  className="close"
                  data-dismiss="modal"
                >
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <p className="text-danger">
                  {this.state.errorMessage !== null
                    ? this.state.errorMessage
                    : ""}
                </p>
                <form onSubmit={this.onSubmit}>
                  <input
                    type="text"
                    className="form-control my-2"
                    name="name"
                    placeholder="Your Name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  <input
                    type="text"
                    className="form-control my-2"
                    name="email"
                    placeholder="Your Email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <input
                    type="text"
                    className="form-control my-2"
                    name="password"
                    placeholder="Your Password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  <button
                    type="submit"
                    className="btn btn-success btn-block my-2"
                  >
                    Register Yourself
                  </button>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                  onClick={() => this.props.clearErrors()}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { registerUser, clearErrors })(
  RegisterModal
);
