import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { ProductConsumer } from "../Context";
import Product from "./Product";
import Create from "./Create";

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
                <span className="text-collumn bold">Active</span>
              </div>
              <div className="col-1 collumn border-right">
                <span className="text-collumn bold">Products</span>
              </div>
              <div className="col-1 collumn border-right">
                <span className="text-collumn bold">Quantity</span>
              </div>
              <div className="col-1 collumn border-right">
                <span className="text-collumn bold">Price</span>
              </div>
              <div className="col-1 list-container collumn border-right">
                <span className="text-collumn bold">Save</span>
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
                    changeQuantity={value.changeQuantity}
                    changePrice={value.changePrice}
                    disableProduct={value.disableProduct}
                    saveList={value.saveList}
                  />
                );
              });
            }}
          </ProductConsumer>
          <ProductConsumer>
            {(value) => (
              <React.Fragment>
                <div className="menu">
                  <Link to="/create">
                    <button className="add">
                      <span
                        className="bold"
                        onClick={value.saveList}
                        products={value.products}
                      >
                        Add Item
                      </span>
                    </button>
                  </Link>
                </div>
                <Router>
                  <Route
                    exact
                    path="/create"
                    component={() => <Create create={value.create} />}
                  />
                </Router>
              </React.Fragment>
            )}
          </ProductConsumer>
        </div>
      </React.Fragment>
    );
  }
}

export default Homepage;
