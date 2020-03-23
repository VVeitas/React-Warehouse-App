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

  componentDidMount = () => {
    if (localStorage.getItem("inventory") === null) {
      this.setState({ products: [] });
    } else {
      var data = JSON.parse(localStorage.getItem("inventory"));
      this.setState({ products: data });
    }
  };

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

  alert = () => {
    alert("aa");
  };

  deleteProduct = (index) => {
    console.log(index);
    this.state.products.splice(index, 1);
    const x = this.state.products;
    localStorage.setItem("inventory", JSON.stringify(x));
    this.setState({ products: x });
  };

  editProduct = (product, index) => {
    this.setState({ edit: product, index: index });
  };

  edit1Product = (product) => {
    const x = this.state.products;
    x.splice(this.state.index, 1, product);
    console.log(x);
  };

  checkBox = () => {
    console.log("aa");
  };
  render() {
    const id = this.state.products.length;
    return (
      <ProductContext.Provider
        value={{
          products: this.state.products,
          create: this.create,
          save: this.save,
          alert: this.alert,
          id: id,
          deleteProduct: this.deleteProduct,
          editProduct: this.editProduct,
          edit1Product: this.edit1Product,
          edit: this.state.edit,
          index: this.state.index,
          checkBox: this.checkBox,
          editSave: this.editSave
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
