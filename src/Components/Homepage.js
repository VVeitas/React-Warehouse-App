import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div className="homepage">
          <h2 className="h2-homepage">Warehouse App</h2>
          <Link to="/products">
            <button className="start-button">Start</button>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default Homepage;
