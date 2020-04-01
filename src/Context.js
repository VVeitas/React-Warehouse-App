import React from "react";

const ProductContext = React.createContext();

class ProductProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  /*On components mount, array from a local storage will be used for products
  list, if it exists.  If not, it will retrieve empty array. */
  UNSAFE_componentWillMount = () => {
    if (localStorage.getItem("inventory") === null) {
      this.setState({ products: [] });
    } else {
      var data = JSON.parse(localStorage.getItem("inventory"));
      this.setState({ products: data });
    }
  };

  /*This function will use concat() to include recently created product to 
  products array. After that it will fire functions to save it to local storage. */
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

  /*Save function for products array to local storage. At the same time using
  setState function to rerender component to display newly made array when
  new product is created.*/
  saveLocalStorage = () => {
    this.setState({ products: this.state.products }, () => {
      localStorage.setItem("inventory", JSON.stringify(this.state.products));
    });
  };

  /*Quantity and price save function to seperate local storages. */
  saveChanges = (index, name) => {
    this.saveQuantity(index, name);
    this.savePrice(index, name);
  };

  /*This function will save changes made to quantity. At the same time it will 
  save the date that change was made at. There are some additional code lines 
  that will control products local storage to keep only 5 items, which
  will be shown at graph in preview section. Additionally, this function will
  prevent duplicating same product in local storage if the input fields was the 
  same as before on save. */
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
    this.saveLocalStorage();
  };

  /*Same function as saveQuantity(), but this one applies for product price. */
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
    this.saveLocalStorage();
  };

  /*This function will delete product from array by taking its index number
  from product component as a prop. It will also delete that exact product from 
  local storage. */
  deleteProduct = (index, name) => {
    this.state.products.splice(index, 1);
    const productsArray = this.state.products;
    localStorage.setItem("inventory", JSON.stringify(productsArray));
    this.setState({ products: productsArray }, () => {
      localStorage.removeItem(name + "Q");
      localStorage.removeItem(name + "P");
    });
  };

  /*This function will declare which of the product will be displayed at the
  moment (this information will be used by Edit and View displays)*/
  viewProduct = (name, product, index) => {
    this.setState({
      product: product,
      index: index
    });
  };

  /*These two functions will retrieve input values from products list and will
  update that information in products array. */
  changeQuantity = (e, index) => {
    this.state.products[index].quantity = e.target.value;
  };

  changePrice = (e, index, name) => {
    this.state.products[index].price = e.target.value;
  };

  /*Will take edited product values and update current array with newly edited
  product and save all of that to local storage. */
  editProduct = (product) => {
    const productsArray = this.state.products;
    const index = this.state.index;
    productsArray.splice([index], 1, product);
    this.saveQuantity(index, product.name);
    this.savePrice(index, product.name);
  };

  /*This function will declare which product to disable by taking index by prop. */
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
          index: this.state.index,
          createProduct: this.createProduct,
          save: this.saveLocalStorage,
          deleteProduct: this.deleteProduct,
          editProduct: this.editProduct,
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
