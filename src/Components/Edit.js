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
          color: this.color.current.value
        }
      },
      () => {
        this.props.edit1Product(this.state.newproduct);
      }
    );
  };

  render() {
    return (
      <ProductConsumer>
        {(value) => (
          <React.Fragment>
            <div className="list">
              <h2>Edit item</h2>
              <div className="col-2">Name</div>

              <input
                type="text"
                ref={this.name}
                defaultValue={value.edit.name}
              ></input>
              <div className="col-1">Quantity</div>
              <div className="col-1">Price</div>
              <div className="col-1">EAN</div>
              <div className="col-1">Type</div>
              <div className="col-1">Weight</div>
              <div className="col-1">Color</div>
              <div className="col-1">Active</div>
              <form>
                <div className="row">
                  <div className="col-2"></div>
                  <div className="col-1">
                    <input
                      type="number"
                      ref={this.quantity}
                      defaultValue={value.edit.quantity}
                    ></input>
                  </div>
                  <div className="col-1">
                    <input
                      type="text"
                      ref={this.price}
                      defaultValue={value.edit.price}
                    ></input>
                  </div>
                  <div className="col-1">
                    <input
                      type="text"
                      ref={this.ean}
                      defaultValue={value.edit.ean}
                    ></input>
                  </div>
                  <div className="col-1">
                    <input
                      type="text"
                      ref={this.type}
                      defaultValue={value.edit.type}
                    ></input>
                  </div>
                  <div className="col-1">
                    <input
                      type="text"
                      ref={this.weight}
                      defaultValue={value.edit.weight}
                    ></input>
                  </div>
                  <div className="col-1">
                    <input
                      type="text"
                      ref={this.color}
                      defaultValue={value.edit.color}
                    ></input>
                  </div>
                </div>
              </form>
              <div className="menu">
                <Link to="/products">
                  <button className="add bold">Back</button>
                </Link>
                <button
                  className="button-save add bold"
                  onClick={this.handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </React.Fragment>
        )}
      </ProductConsumer>
    );
  }
}

export default Edit;
