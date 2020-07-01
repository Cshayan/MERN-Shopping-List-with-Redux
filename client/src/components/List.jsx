import React, { Component } from "react";

class List extends Component {
  handleDelete = (id) => {
    this.props.deleteItem(this.props.id);
  };

  render() {
    return (
      <li className="list-group-item">
        {this.props.item}
        <button
          className="btn btn-danger mx-5"
          onClick={() => this.handleDelete(this.props.id)}
        >
          &times;
        </button>
      </li>
    );
  }
}

export default List;
