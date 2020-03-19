import React, { Component } from "react";
import { Products } from "./Components/Data";

const ProductContext = React.createContext();

class ProductProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: Products
    };
  }

  componentDidMount = () => {};

  create = (param) => {
    var update = this.state.products.concat(param);
    this.setState({ products: update }, () => {
      this.save();

      console.log(param);
    });
  };

  save = () => {
    localStorage.setItem("inventory", JSON.stringify(this.state.products));
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          products: this.state.products,
          create: this.create,
          save: this.save
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
