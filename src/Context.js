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

  componentWillMount = () => {
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
      this.saveLocalStorage();
      this.saveQuantity(0, param.name);
      this.savePrice(0, param.name);
    });
  };

  saveLocalStorage = () => {
    localStorage.setItem("inventory", JSON.stringify(this.state.products));
  };

  saveList = () => {
    this.setState({ products: this.state.products }, () => {
      this.saveLocalStorage();
    });
  };

  saveQuantity = (index, name) => {
    const x = this.state.products[index];
    this.state.products[index].quantityChangeDate = new Date();
    const y = [x];
    const name1 = name + "Q";
    if (localStorage.getItem(name1) === null) {
      localStorage.setItem(name1, JSON.stringify(y));
    } else {
      const z = JSON.parse(localStorage.getItem(name1));
      z.unshift(x);
      if (z[0].quantity === z[1].quantity) {
        z.shift();
      }
      if (z.length > 5) {
        z.pop();
      }
      localStorage.setItem(name1, JSON.stringify(z));
    }
    this.saveList();
  };

  savePrice = (index, name) => {
    const x = this.state.products[index];
    this.state.products[index].priceChangeDate = new Date();
    const y = [x];
    const name1 = name + "P";
    if (localStorage.getItem(name1) === null) {
      localStorage.setItem(name1, JSON.stringify(y));
    } else {
      const z = JSON.parse(localStorage.getItem(name1));
      z.unshift(x);
      if (z[0].price === z[1].price) {
        z.shift();
      }
      if (z.length > 5) {
        z.pop();
      }
      localStorage.setItem(name1, JSON.stringify(z));
    }
    this.saveList();
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
    this.saveQuantity();
  };

  edit2Product = (product, product1) => {
    console.log(product);
  };

  quantity = (index) => {
    const x = this.state.products[index].quantity;
    return x;
  };
  changeQuantity = (e, index, name) => {
    this.state.products[index].quantity = e.target.value;
  };

  changePrice = (e, index, name) => {
    this.state.products[index].price = e.target.value;
  };

  disableProduct = (index) => {
    if (this.state.products[index].active) {
      this.state.products[index].active = false;
    } else this.state.products[index].active = true;
    console.log(this.state.products[index].active);
    this.setState({ products: this.state.products });
    this.saveLocalStorage();
  };

  viewProduct = (name) => {
    this.setState({ currentView: name });
  };
  render() {
    const id = this.state.products.length;
    return (
      <ProductContext.Provider
        value={{
          products: this.state.products,
          create: this.create,
          save: this.saveLocalStorage,
          saveList: this.saveList,
          id: id,
          deleteProduct: this.deleteProduct,
          editProduct: this.editProduct,
          edit1Product: this.edit1Product,
          edit2Product: this.edit2Product,
          edit: this.state.edit,
          index: this.state.index,
          editSave: this.editSave,
          quantity: this.quantity,
          changeQuantity: this.changeQuantity,
          changePrice: this.changePrice,
          disableProduct: this.disableProduct,
          saveQuantity: this.saveQuantity,
          viewProduct: this.viewProduct,
          savePrice: this.savePrice,
          currentView: this.state.currentView
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
