import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { ProductConsumer } from "../Context";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.quantity = React.createRef();
    this.price = React.createRef();
    this.state = { x: false };
  }
  changeQuantity = (e, index, name) => {
    this.props.changeQuantity(e, index, name);
  };

  changePrice = (e, index) => {
    this.props.changePrice(e, index);
  };

  disableProduct = (index) => {
    this.props.disableProduct(index);
    this.setState({ x: false });
    console.log(this.state.x);
  };

  style = () => {
    if (this.state.x === true) {
      return "disabled";
    } else {
      return "enabled";
    }
  };

  render() {
    const { name, ean, type, weight, color, active } = this.props.product;
    const index = this.props.index;
    const product = this.props.product;
    return (
      <ProductConsumer>
        {(value) => (
          <React.Fragment>
            <div className="product-container">
              <div className="row">
                <div className="col-1 collumn border-right disable-switch">
                  <span className="text-collumn">
                    <input
                      className="disable-checkbox"
                      type="checkbox"
                      checked={active}
                      onClick={() => this.disableProduct(index)}
                    />
                  </span>
                </div>
                <div className="col-1 collumn border-right ">
                  <span className="text-collumn">{name}</span>
                </div>
                <div className="col-1 collumn border-right ">
                  <input
                    className="list-input"
                    type="number"
                    ref={this.quantity}
                    onChange={(e) => this.changeQuantity(e, index, name)}
                    defaultValue={value.products[index].quantity}
                  ></input>
                  <button
                    onClick={() => {
                      value.saveQuantity(index, name);
                    }}
                  ></button>
                </div>
                <div className="col-1 collumn border-right">
                  <input
                    className="list-input"
                    type="number"
                    ref={this.price}
                    onChange={(e) => this.changePrice(e, index, name)}
                    defaultValue={value.products[index].price}
                  ></input>
                  <button
                    onClick={() => {
                      value.savePrice(index, name);
                    }}
                  ></button>
                </div>
                <div className="col-1 collumn border-right">
                  <span className="text-collumn">{ean}</span>
                </div>
                <div className="col-1 collumn border-right">
                  <span className="text-collumn">{type}</span>
                </div>
                <div className="col-1 collumn border-right">
                  <span className="text-collumn">{weight}</span>
                </div>
                <div className="col-1 collumn border-right">
                  <span className="text-collumn">{color}</span>
                </div>

                <div className="col-4">
                  <Link to={`/products/${name}`}>
                    <button
                      className="product-button view "
                      onClick={() => {
                        value.viewProduct(name);
                      }}
                    >
                      VIEW
                    </button>
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

                <div className={this.style()}></div>
              </div>
            </div>
          </React.Fragment>
        )}
      </ProductConsumer>
    );
  }
}

export default Product;
