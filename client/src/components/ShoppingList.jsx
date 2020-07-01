import React, { Component } from "react";
import List from "./List";
import AddItemModal from "./AddItemModal";
import spinner from "../images/spinner.gif";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  handleDeleteItem = (id) => {
    this.props.deleteItem(id);
  };

  render() {
    const { items, loading } = this.props.item;
    return (
      <div className="m-5">
        <AddItemModal />
        {loading ? (
          <img src={spinner} alt="loader"></img>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 p-3">
                <ul className="list-group">
                  {items.map((item) => (
                    <List
                      key={item._id}
                      id={item._id}
                      item={item.name}
                      deleteItem={this.handleDeleteItem}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
