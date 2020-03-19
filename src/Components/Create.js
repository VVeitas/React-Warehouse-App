import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { ProductConsumer } from "../Context";

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newproduct: {
        name: "a",
        ean: "",
        type: "",
        weight: "",
        color: "ss",
        active: true
      }
    };
  }

  changeName = (event) => {
    this.setState({ name: event.target.value });
  };

  changeEan = (event) => {
    this.setState({ ean: event.target.value });
  };

  changeType = (event) => {
    this.setState({ type: event.target.value });
  };

  changeWeight = (event) => {
    this.setState({ weight: event.target.value });
  };

  changeColor = (event) => {
    this.setState({ color: event.target.value });
  };

  render() {
    const newproduct = this.state.newproduct;
    return (
      <ProductConsumer>
        {(value) => (
          <React.Fragment>
            <div className="list">
              <h2>Add new item</h2>
              <div className="row">
                <div className="col-2">Name</div>
                <div className="col-1">EAN</div>
                <div className="col-1">Type</div>
                <div className="col-1">Weight</div>
                <div className="col-1">Color</div>
                <div className="col-1">Active</div>
              </div>
              <form>
                <div className="row">
                  <div className="col-2">
                    <input type="text" onChange={this.changeName}></input>
                  </div>
                  <div className="col-1">
                    <input type="text" onChange={this.changeEan}></input>
                  </div>
                  <div className="col-1">
                    <input type="text" onChange={this.changeType}></input>
                  </div>
                  <div className="col-1">
                    <input type="text" onChange={this.changeWeight}></input>
                  </div>
                  <div className="col-1">
                    <input type="text" onChange={this.changeColor}></input>
                  </div>
                </div>
              </form>
              <div className="menu">
                <Link to="/products">
                  <button className="add">Back</button>
                </Link>
                <button
                  className="add"
                  onClick={() => {
                    const x0 = this.state.name;
                    const x1 = this.state.ean;
                    const x2 = this.state.type;
                    const x3 = this.state.weight;
                    const x4 = this.state.color;
                    this.setState(
                      {
                        newproduct: {
                          name: x0,
                          ean: x1,
                          type: x2,
                          weight: x3,
                          color: x4
                        }
                      },
                      () => {
                        value.create(this.state.newproduct);
                      }
                    );
                    console.log(this.state.name);
                  }}
                >
                  Create
                </button>
              </div>
            </div>
          </React.Fragment>
        )}
      </ProductConsumer>
    );
  }
}

export default Create;
