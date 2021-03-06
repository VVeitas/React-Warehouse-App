import React from "react";
import { Link, Redirect } from "react-router-dom";
import { ProductConsumer } from "../Context";

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.name = React.createRef();
    this.quantity = React.createRef();
    this.price = React.createRef();
    this.ean = React.createRef();
    this.type = React.createRef();
    this.weight = React.createRef();
    this.color = React.createRef();
    this.state = {};
  }

  /*Handling all the input information and fetching that to context file where 
  new product in array will be created.
  If any of the input fields are empty this function will fire alert*/
  handleSubmit = (e) => {
    if (
      this.name.current.value === "" ||
      this.quantity.current.value === "" ||
      this.price.current.value === "" ||
      this.ean.current.value === "" ||
      this.type.current.value === "" ||
      this.weight.current.value === "" ||
      this.color.current.value === ""
    ) {
      alert("All fields must be completed ");
    } else {
      this.setState(
        {
          newproduct: {
            name: this.name.current.value,
            quantity: this.quantity.current.value,
            price: this.price.current.value,
            ean: this.ean.current.value,
            type: this.type.current.value,
            weight: this.weight.current.value,
            color: this.color.current.value,
            active: true
          },
          navigate: true
        },
        () => {
          this.props.createProduct(this.state.newproduct);
        }
      );
    }
  };
  render() {
    const { navigate } = this.state;
    if (navigate) {
      return <Redirect to="/products" push={true} />;
    }
    return (
      <ProductConsumer>
        {(value) => (
          <React.Fragment>
            <div className="cover"></div>
            <div className="containers">
              <div className="text-forms">
                <h2>Add new item</h2>
                <form>
                  <div className="row">
                    <div className="col-6 collumn">
                      <span className="text-collumn bold">Name</span>
                    </div>
                    <div className="col-6">
                      <input
                        className="input-collumn"
                        type="text"
                        ref={this.name}
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 collumn">
                      <span className="text-collumn bold">Quantity</span>
                    </div>
                    <div className="col-6">
                      <input
                        className="input-collumn"
                        type="number"
                        ref={this.quantity}
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 collumn">
                      <span className="text-collumn bold">Price, €</span>
                    </div>
                    <div className="col-6">
                      <input
                        className="input-collumn"
                        type="number"
                        ref={this.price}
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 collumn">
                      <span className="text-collumn bold">EAN</span>
                    </div>
                    <div className="col-6">
                      <input
                        className="input-collumn"
                        type="text"
                        ref={this.ean}
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 collumn">
                      <span className="text-collumn bold">Type</span>
                    </div>
                    <div className="col-6">
                      <input
                        className="input-collumn"
                        type="text"
                        ref={this.type}
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 collumn">
                      <span className="text-collumn bold">Weight, kg</span>
                    </div>
                    <div className="col-6">
                      <input
                        className="input-collumn"
                        type="number"
                        ref={this.weight}
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
                      ></input>
                    </div>
                  </div>
                </form>
                <Link to="/products">
                  <button className="container-buttons center">
                    <span className="bold">Back</span>
                  </button>
                </Link>

                <button
                  className="container-buttons button-save center"
                  onClick={this.handleSubmit}
                >
                  <span className="bold">Save</span>
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
