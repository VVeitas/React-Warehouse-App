import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { ProductConsumer } from "../Context";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.name = React.createRef();
    this.quantity = React.createRef();
    this.price = React.createRef();
    this.ean = React.createRef();
    this.type = React.createRef();
    this.weight = React.createRef();
    this.color = React.createRef();
    this.state = {
      newproduct: {
        name: "",
        quantity: "",
        price: "",
        ean: "",
        type: "",
        weight: "",
        color: "",
        active: true
      }
    };
  }
  handleSubmit = (e) => {
    this.setState(
      {
        newproduct: {
          name: this.name.current.value,
          price: this.price.current.value,
          quantity: this.quantity.current.value,
          ean: this.ean.current.value,
          type: this.type.current.value,
          weight: this.weight.current.value,
          color: this.color.current.value,
          active: true
        }
      },

      () => {
        this.props.edit1Product(this.state.newproduct);
      }
    );
  };

  render() {
    const newproduct = this.state.newproduct;
    return (
      <ProductConsumer>
        {(value) => (
          <React.Fragment>
            <div className="list1"></div>
            <div className="containers">
              <div className="text-forms">
                <h2>Edit item</h2>
                <form>
                  <div className="row">
                    <div className="col-6 collumn ">
                      <span className="text-collumn bold">Name</span>
                    </div>
                    <div className="col-6">
                      <input
                        className="input-collumn"
                        type="text"
                        ref={this.name}
                        defaultValue={value.edit.product.name}
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 collumn ">
                      <span className="text-collumn bold">Quantity</span>
                    </div>
                    <div className="col-6">
                      <input
                        className="input-collumn"
                        type="number"
                        ref={this.quantity}
                        defaultValue={value.edit.product.quantity}
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 collumn ">
                      <span className="text-collumn bold">Price</span>
                    </div>
                    <div className="col-6">
                      <input
                        className="input-collumn"
                        type="number"
                        ref={this.price}
                        defaultValue={value.edit.product.price}
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 collumn ">
                      <span className="text-collumn bold">EAN</span>
                    </div>
                    <div className="col-6">
                      <input
                        className="input-collumn"
                        type="text"
                        ref={this.ean}
                        defaultValue={value.edit.product.ean}
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 collumn ">
                      <span className="text-collumn bold">Type</span>
                    </div>
                    <div className="col-6">
                      <input
                        className="input-collumn"
                        type="text"
                        ref={this.type}
                        defaultValue={value.edit.product.type}
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 collumn ">
                      <span className="text-collumn bold">Weight</span>
                    </div>
                    <div className="col-6">
                      <input
                        className="input-collumn"
                        type="number"
                        ref={this.weight}
                        defaultValue={value.edit.product.weight}
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 collumn ">
                      <span className="text-collumn bold">Color</span>
                    </div>
                    <div className="col-6">
                      <input
                        className="input-collumn"
                        type="text"
                        ref={this.color}
                        defaultValue={value.edit.product.color}
                      ></input>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-12">
                    <Link to="/products">
                      <button className="container-buttons">
                        <span className="bold">Back</span>
                      </button>
                    </Link>
                    <button
                      className="container-buttons button-save"
                      onClick={this.handleSubmit}
                    >
                      <span className="bold">Save</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </ProductConsumer>
    );
  }
}

export default Edit;
