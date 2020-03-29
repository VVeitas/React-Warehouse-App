import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { ProductConsumer } from "../Context";
import QuantityHistory from "./QuantityHistory";
import PriceHistory from "./PriceHistory";

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
                path="/products/:id/quantityhistory"
                component={QuantityHistory}
              />
              <Route
                exact
                path="/products/:id/pricehistory"
                component={PriceHistory}
              />
            </Router>
          </React.Fragment>
        )}
      </ProductConsumer>
    );
  }
}

export default View;
