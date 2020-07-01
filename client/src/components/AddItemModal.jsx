import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";

class AddItemModal extends Component {
  state = {
    name: "",
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
    };

    this.props.addItem(newItem);
    this.setState({
      name: "",
    });
  };

  render() {
    return (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#myModal"
        >
          Add Item
        </button>

        <div className="modal fade" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add to Shopping List</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <form onSubmit={this.onSubmit}>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Add item name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  <button
                    type="submit"
                    className="btn btn-success btn-block my-2"
                  >
                    Add Item
                  </button>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
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

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { addItem })(AddItemModal);
