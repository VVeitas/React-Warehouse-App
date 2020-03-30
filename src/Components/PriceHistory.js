import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../Context";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class PriceHistory extends React.Component {
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
    return (
      <ProductConsumer>
        {(value) => (
          <React.Fragment>
            <div className="list1"></div>

            <div className="containers view-container">
              <h2 className="view-h2">Quantity History </h2>

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
              </div>
              <div className="charts">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={this.state.options}
                />
              </div>
              <Link to="/products">
                <button className="container-buttons" onClick={this.refresh}>
                  <span className="bold">Back</span>
                </button>
              </Link>
            </div>
          </React.Fragment>
        )}
      </ProductConsumer>
    );
  }
}

export default PriceHistory;
