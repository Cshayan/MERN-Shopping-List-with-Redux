import React, { Component } from "react";
import { Provider } from "react-redux";
import { loadUser } from "./actions/authActions";

import { Navbar, ShoppingList } from "./components";
import store from "./store";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <Navbar />
          <ShoppingList />
        </div>
      </Provider>
    );
  }
}

export default App;
