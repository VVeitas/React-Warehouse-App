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

  create = (product) => {
    const update = this.state.products.concat(product);
    const index = this.state.products.length;
    const name = product.name;
    this.setState({ products: update }, () => {
      this.saveLocalStorage();
      this.saveQuantity(index, name);
      this.savePrice(index, name);
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

  saveChanges = (index, name) => {
    this.saveQuantity(index, name);
    this.savePrice(index, name);
  };

  saveQuantity = (index, name) => {
    const x = this.state.products[index];
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.state.products[index].quantityChangeDate =
      day + "-" + month + "-" + year;
    const y = [x];
    const name1 = name + "Q";
    if (localStorage.getItem(name1) === null) {
      localStorage.setItem(name1, JSON.stringify(y));
    } else {
      const z = JSON.parse(localStorage.getItem(name1));

      const arrayLength = z.length;
      z.push(x);
      if (z[arrayLength - 1].quantity == z[arrayLength].quantity) {
        z.pop();
      }
      if (z.length > 5) {
        z.shift();
      }
      localStorage.setItem(name1, JSON.stringify(z));
    }
    this.saveList();
  };

  savePrice = (index, name) => {
    const x = this.state.products[index];
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.state.products[index].priceChangeDate = day + "-" + month + "-" + year;

    const y = [x];
    const name1 = name + "P";
    if (localStorage.getItem(name1) === null) {
      localStorage.setItem(name1, JSON.stringify(y));
    } else {
      const z = JSON.parse(localStorage.getItem(name1));

      const arrayLength = z.length;
      z.push(x);
      if (z[arrayLength - 1].price == z[arrayLength].price) {
        z.pop();
      }
      if (z.length > 5) {
        z.shift();
      }
      localStorage.setItem(name1, JSON.stringify(z));
    }
    this.saveList();
  };

  deleteProduct = (index, name) => {
    console.log(index);
    this.state.products.splice(index, 1);
    const x = this.state.products;
    localStorage.setItem("inventory", JSON.stringify(x));
    this.setState({ products: x }, () => {
      localStorage.removeItem(name + "Q");
      localStorage.removeItem(name + "P");
    });
  };

  editProduct = (product, index) => {
    this.setState({ edit: { product: product, index: index } });
  };

  edit1Product = (product) => {
    const x = this.state.products;
    const name = this.state.edit.product.name;
    const index = this.state.edit.index;
    x.splice(this.state.products[index], 1, product);
    this.saveQuantity(index, name);
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
    this.setState({ products: this.state.products });
    this.saveLocalStorage();
  };

  viewProduct = (name, product) => {
    this.setState({ currentView: name, product: product });
  };
  render() {
    const id = this.state.products.length;
    return (
      <ProductContext.Provider
        value={{
          products: this.state.products,
          product: this.state.product,
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
          saveChanges: this.saveChanges,
          savePrice: this.savePrice,
          viewProduct: this.viewProduct,
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
