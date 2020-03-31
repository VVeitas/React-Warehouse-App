import React from "react";

const ProductContext = React.createContext();

class ProductProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  UNSAFE_componentWillMount = () => {
    if (localStorage.getItem("inventory") === null) {
      this.setState({ products: [] });
    } else {
      var data = JSON.parse(localStorage.getItem("inventory"));
      this.setState({ products: data });
    }
  };

  createProduct = (product) => {
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
    const product = this.state.products[index];
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.state.products[index].quantityChangeDate =
      day + "-" + month + "-" + year;
    const product1 = [product];
    const name1 = name + "Q";
    if (localStorage.getItem(name1) === null) {
      localStorage.setItem(name1, JSON.stringify(product1));
    } else {
      const productArray = JSON.parse(localStorage.getItem(name1));

      const arrayLength = productArray.length;
      productArray.push(product);
      if (
        productArray[arrayLength - 1].quantity ===
        productArray[arrayLength].quantity
      ) {
        productArray.pop();
      }
      if (productArray.length > 5) {
        productArray.shift();
      }
      localStorage.setItem(name1, JSON.stringify(productArray));
    }
    this.saveList();
  };

  savePrice = (index, name) => {
    const product = this.state.products[index];
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.state.products[index].priceChangeDate = day + "-" + month + "-" + year;

    const product1 = [product];
    const name1 = name + "P";
    if (localStorage.getItem(name1) === null) {
      localStorage.setItem(name1, JSON.stringify(product1));
    } else {
      const productArray = JSON.parse(localStorage.getItem(name1));

      const arrayLength = productArray.length;
      productArray.push(product);
      if (
        productArray[arrayLength - 1].price === productArray[arrayLength].price
      ) {
        productArray.pop();
      }
      if (productArray.length > 5) {
        productArray.shift();
      }
      localStorage.setItem(name1, JSON.stringify(productArray));
    }
    this.saveList();
  };

  deleteProduct = (index, name) => {
    this.state.products.splice(index, 1);
    const productsArray = this.state.products;
    localStorage.setItem("inventory", JSON.stringify(productsArray));
    this.setState({ products: productsArray }, () => {
      localStorage.removeItem(name + "Q");
      localStorage.removeItem(name + "P");
    });
  };

  viewProduct = (name, product, index) => {
    this.setState({
      product: product,
      index: index
    });
  };

  editProduct = (product) => {
    const productsArray = this.state.products;
    const index = this.state.index;
    productsArray.splice([index], 1, product);
    this.saveQuantity(index, product.name);
    this.savePrice(index, product.name);
  };

  changeQuantity = (e, index) => {
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

  render() {
    return (
      <ProductContext.Provider
        value={{
          products: this.state.products,
          product: this.state.product,
          createProduct: this.createProduct,
          save: this.saveLocalStorage,
          saveList: this.saveList,
          deleteProduct: this.deleteProduct,
          editProduct: this.editProduct,
          edit2Product: this.edit2Product,
          edit: this.state.edit,
          index: this.state.index,
          editSave: this.editSave,
          changeQuantity: this.changeQuantity,
          changePrice: this.changePrice,
          disableProduct: this.disableProduct,
          saveChanges: this.saveChanges,
          savePrice: this.savePrice,
          viewProduct: this.viewProduct
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
