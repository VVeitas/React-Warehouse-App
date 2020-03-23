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
          <div className="list-items">
            <div className="row">
              <div className="col-1 collumn border-right">
                <span className="text-collumn bold">Products</span>
              </div>
              <div className="col-1 collumn border-right">
                <span className="text-collumn bold">Quantity</span>
              </div>
              <div className="col-1 collumn border-right">
                <span className="text-collumn bold">Price</span>
              </div>
              <div className="col-1 collumn border-right">
                <span className="text-collumn bold">EAN</span>
              </div>
              <div className="col-1 collumn border-right">
                <span className="text-collumn bold">Type</span>
              </div>
              <div className="col-1 collumn border-right">
                <span className="text-collumn bold">Weight</span>
              </div>
              <div className="col-1 collumn border-right">
                <span className="text-collumn bold">Color</span>
              </div>
              <div className="col-1 collumn border-right">
                <span className="text-collumn bold">Active</span>
              </div>
            </div>
          </div>
          <ProductConsumer>
            {(value) => {
              return value.products.map((product, index) => {
                return (
                  <Product
                    key={product.index}
                    index={index}
                    product={product}
                  />
                );
              });
            }}
          </ProductConsumer>

          <div className="menu">
            <Link to="/create">
              <button className="add">
                <span className="bold">Add Item</span>
              </button>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Homepage;
