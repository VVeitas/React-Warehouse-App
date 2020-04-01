import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { ProductConsumer } from "../Context";
import Product from "./Product";
import Create from "./Create";
import View from "./View";
import Edit from "./Edit";

class Products extends React.Component {
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
                    save={value.save}
                  />
                );
              });
            }}
          </ProductConsumer>
          <ProductConsumer>
            {(value) => (
              <React.Fragment>
                <div className="product-container">
                  <div className="row">
                    <div className="col-1 collumn border-right disable-switch">
                      <span className="text-collumn"></span>
                    </div>
                    <div className="col-1 collumn border-right "></div>
                    <div className="col-1 collumn border-right"></div>
                    <div className="col-1 collumn border-right"></div>

                    <div className="col-1 list-container collumn border-right"></div>
                    <div className="col-1 collumn border-right"></div>
                    <div className="col-1 collumn border-right"></div>
                    <div className="col-1 collumn border-right"></div>
                    <div className="col-1 collumn border-right"></div>
                    <div className="buttons-collumn">
                      <Link to="/create">
                        <button
                          className="product-button create-new-item "
                          onClick={value.save}
                          products={value.products}
                        >
                          CREATE NEW ITEM
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                <Router>
                  <Route
                    exact
                    path="/create"
                    component={() => (
                      <Create createProduct={value.createProduct} />
                    )}
                  />
                  <Route
                    exact
                    path="/products/:id/edit"
                    component={() => (
                      <Edit
                        products={value.products}
                        id={value.editProdcut}
                        editProduct={value.editProduct}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/products/:id/quantityhistory"
                    component={() => <View />}
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

export default Products;
