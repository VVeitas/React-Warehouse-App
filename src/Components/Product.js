import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, ean, type, weight, color, active } = this.props.product;
    return (
      <React.Fragment>
        <Link to={`/products/${name}`}>
          <div className="product-container">
            <div className="row">
              <div className="col-2">{name}</div>
              <div className="col-1">{ean}</div>
              <div className="col-1">{type}</div>
              <div className="col-1">{weight}</div>
              <div className="col-1">{color}</div>
              <div className="col-1">{active}</div>
              <div className="col-2">buttons</div>
            </div>
          </div>
        </Link>
      </React.Fragment>
    );
  }
}

export default Product;
