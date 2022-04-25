import Navbar from "./components/Layout/Navbar";
import Landing from "./components/Layout/Landing";
import React, { Component } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import { Switch } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import ViewProducts from "./components/Layout/ViewProducts";
import AddProducts from "./components/Auth/AddProducts";
import ViewOrders from "./components/Layout/ViewOrders";
import store from "./store";


class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
        <Router>
          <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Landing} />
          <Route exact path="/viewProducts/:productName" component={ViewProducts} />
          <Route exact path="/addProducts" component={AddProducts} />
          <Route exact path="/orders" component={ViewOrders} />
          </Switch>
        </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
