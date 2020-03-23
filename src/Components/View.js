import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div className="list">
          <div className="menu">
            <Link to="/products">
              <button className="add">Back</button>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default View;
