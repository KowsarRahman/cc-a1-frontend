import Navbar from "./components/Layout/Navbar";
import Landing from "./components/Layout/Landing";
import React, { Component } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Register from "./components/Auth/Register";
import { Switch } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
