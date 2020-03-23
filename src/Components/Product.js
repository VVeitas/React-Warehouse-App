import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { ProductConsumer } from "../Context";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      name,
      quantity,
      price,
      ean,
      type,
      weight,
      color,
      active
    } = this.props.product;
    const index = this.props.index;
    const product = this.props.product;
    return (
      <ProductConsumer>
        {(value) => (
          <React.Fragment>
            <div className="product-container">
              <div className="row">
                <div className="col-1 collumn">
                  <span className="text-collumn">{name}</span>
                </div>
                <div className="col-1 collumn">
                  <span className="text-collumn">{quantity}</span>
                </div>
                <div className="col-1 collumn">
                  <span className="text-collumn">{price}</span>
                </div>
                <div className="col-1 collumn">
                  <span className="text-collumn">{ean}</span>
                </div>
                <div className="col-1 collumn">
                  <span className="text-collumn">{type}</span>
                </div>
                <div className="col-1 collumn">
                  <span className="text-collumn">{weight}</span>
                </div>
                <div className="col-1 collumn">
                  <span className="text-collumn">{color}</span>
                </div>
                <div className="col-1 collumn">
                  <span className="text-collumn">
                    <input type="checkbox" onChange={value.checkBox} />
                  </span>
                </div>
                <div className="col-2">
                  <Link to={`/products/${name}`}>
                    <button className="product-button view ">VIEW</button>
                  </Link>
                  <Link to={`/products/${name}/edit`}>
                    <button
                      className="product-button edit"
                      onClick={() => {
                        value.editProduct(product, index);
                      }}
                    >
                      EDIT
                    </button>
                  </Link>
                  <button
                    className="product-button delete"
                    onClick={() => {
                      value.deleteProduct(index);
                    }}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </ProductConsumer>
    );
  }
}

export default Product;
