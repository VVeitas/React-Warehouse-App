import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
                component={() => <ProductDetails product={value.product} />}
              />
              <Route
                exact
                path="/products/:id/quantityhistory"
                component={() => <QuantityHistory product={value.product} />}
              />
              <Route
                exact
                path="/products/:id/pricehistory"
                component={() => <PriceHistory product={value.product} />}
              />
            </Router>
          </React.Fragment>
        )}
      </ProductConsumer>
    );
  }
}

export default View;
