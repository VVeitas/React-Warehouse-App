import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { ProductConsumer } from "../Context";
import QuantityHistory from "./QuantityHistory";
import PriceHistory from "./PriceHistory";
import ProductDetails from "./ProductDetails";

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {}
    };
  }

  render() {
    return (
      <ProductConsumer>
        {(value) => (
          <React.Fragment>
            <Router>
              <Route
                exact
                path="/products/:id/productdetails"
                component={() => (
                  <ProductDetails
                    currentView={this.props.currentView}
                    product={value.product}
                  />
                )}
              />
              <Route
                exact
                path="/products/:id/quantityhistory"
                component={() => (
                  <QuantityHistory currentView={this.props.currentView} />
                )}
              />
              <Route
                exact
                path="/products/:id/pricehistory"
                component={() => (
                  <PriceHistory currentView={this.props.currentView} />
                )}
              />
            </Router>
          </React.Fragment>
        )}
      </ProductConsumer>
    );
  }
}

export default View;
