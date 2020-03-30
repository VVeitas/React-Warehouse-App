import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../Context";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {}
    };
  }

  componentDidMount = () => {
    this.getProductNameUrl();
  };

  getProductNameUrl = () => {
    var name = window.location.href.split("/")[4];
    this.QuantityGraph(name);
  };

  QuantityGraph = (name) => {
    const quantityStorage = name + "Q";
    if (localStorage.getItem(quantityStorage) === null) {
      this.setState({ series: [] });
    } else {
      var data = JSON.parse(localStorage.getItem(quantityStorage));
    }
    const quantityData = data.map(({ quantity }) => parseInt(quantity, 10));
    const xAxis = data.map((data) => data.quantityChangeDate);
    console.log(xAxis);
    this.setState({
      options: {
        title: {
          text: name
        },
        series: [
          {
            data: [...quantityData]
          }
        ],
        xAxis: {
          categories: xAxis
        }
      }
    });
  };

  render() {
    var name = this.props.currentView;
    var product = this.props.product;
    return (
      <ProductConsumer>
        {(value) => (
          <React.Fragment>
            <div className="list1"></div>

            <div className="containers details-container">
              <h2 className="view-h2">Product Details </h2>

              <div className="view-tabs">
                <div className="row">
                  <Link to={`/products/${name}/productdetails`}>
                    <p className="tab-text">Product Details</p>
                  </Link>
                  <Link to={`/products/${name}/quantityhistory`}>
                    <p className="tab-text">Quantity History</p>
                  </Link>
                  <Link to={`/products/${name}/pricehistory`}>
                    <p className="tab-text">Price History</p>
                  </Link>
                </div>
                <div className="product-details ">
                  <div className="row">
                    <h5 className="product-details-h5">Name:</h5>
                    <h5 className="product-details-h5 lighter">
                      {product.name}
                    </h5>
                  </div>
                  <div className="row">
                    <h5 className="product-details-h5 ">Quantity:</h5>
                    <h5 className="product-details-h5 lighter">
                      {product.quantity}
                    </h5>
                  </div>
                  <div className="row">
                    <h5 className="product-details-h5">Price:</h5>
                    <h5 className="product-details-h5 lighter">
                      {product.price}
                    </h5>
                  </div>
                  <div className="row">
                    <h5 className="product-details-h5 ">Ean:</h5>
                    <h5 className="product-details-h5 lighter">
                      {product.ean}
                    </h5>
                  </div>
                  <div className="row">
                    <h5 className="product-details-h5">Type:</h5>
                    <h5 className="product-details-h5 lighter">
                      {product.type}
                    </h5>
                  </div>
                  <div className="row">
                    <h5 className="product-details-h5 ">Weight:</h5>
                    <h5 className="product-details-h5 lighter">
                      {product.weight}
                    </h5>
                  </div>
                  <div className="row">
                    <h5 className="product-details-h5">Color:</h5>
                    <h5 className="product-details-h5 lighter right">
                      {product.color}
                    </h5>
                  </div>
                </div>
                <Link to="/products">
                  <button className="container-buttons">
                    <span className="bold">Back</span>
                  </button>
                </Link>
              </div>
            </div>
          </React.Fragment>
        )}
      </ProductConsumer>
    );
  }
}

export default ProductDetails;
