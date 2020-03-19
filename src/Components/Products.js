import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { ProductConsumer } from "../Context";
import Product from "./Product";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div className="list">
          <div className="row">
            <div className="col-2">Products</div>
            <div className="col-1">EAN</div>
            <div className="col-1">Type</div>
            <div className="col-1">Weight</div>
            <div className="col-1">Color</div>
            <div className="col-2">Products</div>
          </div>
          <ProductConsumer>
            {(value) => {
              return value.products.map((product) => {
                return <Product key={product.id} product={product} />;
              });
            }}
          </ProductConsumer>

          <div className="menu">
            <Link to="/create">
              <button className="add">Add Item</button>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Homepage;
