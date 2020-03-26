import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { ProductConsumer } from "../Context";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.quantity = React.createRef();
    this.price = React.createRef();
    this.state = {};
  }

  changeQuantity = (e, index, name) => {
    this.props.changeQuantity(e, index, name);
  };

  changePrice = (e, index) => {
    this.props.changePrice(e, index);
  };

  disableProduct = (index) => {
    this.props.disableProduct(index);
    const active = JSON.parse(localStorage.getItem("inventory"));
    const status = active[index].active;
    console.log(status);
    this.setState({ x: this.props.product.active });
    this.props.saveList();
  };

  style = () => {
    if (this.props.product.active === true) {
      return "enabled";
    } else {
      return "disabled";
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
                      onChange={() => this.disableProduct(index)}
                    />
                  </span>
                </div>
                <div className="col-1 collumn border-right ">
                  <span className="text-collumn">{name}</span>
                </div>
                <div className="col-1 collumn border-right ">
                  <input
                    className="list-input "
                    type="number"
                    ref={this.quantity}
                    onChange={(e) => this.changeQuantity(e, index, name)}
                    defaultValue={value.products[index].quantity}
                  ></input>
                </div>
                <div className="col-1 collumn border-right">
                  <input
                    className="list-input"
                    type="number"
                    ref={this.price}
                    onChange={(e) => this.changePrice(e, index, name)}
                    defaultValue={value.products[index].price}
                  ></input>
                </div>
                <div className="col-1 list-container collumn border-right">
                  <button
                    className="inlist-save"
                    onClick={() => {
                      value.saveChanges(index, name);
                    }}
                  >
                    <i class="fa fa-save"></i>
                  </button>
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
                <div className="col-1 collumn collumn border-right">
                  <span className="text-collumn">{color}</span>
                </div>

                <div className="">
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
