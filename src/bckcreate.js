import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { ProductConsumer } from "../Context";

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newproduct: [
        { name: "aa" },
        { ean: 0 },
        { type: "aa" },
        { weight: 12 + "g" },
        { color: "ss" },
        { active: true }
      ]
    };
  }

  render() {
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
                {this.state.newproduct.map(function(item) {
                  return <input type="text" key={item} />;
                })}
              </form>
              <div className="menu">
                <Link to="/products">
                  <button className="add">Back</button>
                </Link>
                <button className="add" onClick={value.create}>
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
