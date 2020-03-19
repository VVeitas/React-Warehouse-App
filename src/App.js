import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./Components/Homepage";
import Products from "./Components/Products";
import View from "./Components/View";
import Create from "./Components/Create";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div className="app">
          <Router>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/products/:id" component={View} />
            <Route exact path="/create" component={Create} />
          </Router>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
