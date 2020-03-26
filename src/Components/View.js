import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { ProductConsumer } from "../Context";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ""
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
      this.setState({ products: data });
    }
    let result = data.map(({ quantity }) => quantity);
    this.setState({
      options: {
        title: {
          text: "My chart"
        },
        series: [
          {
            data: [1, 2, 3, 5, 88]
          }
        ]
      }
    });
  };

  render() {
    return (
      <ProductConsumer>
        {(value) => (
          <React.Fragment>
            <div className="list">
              <h2 className="view-h2">VIEW </h2>
              <HighchartsReact
                highcharts={Highcharts}
                options={this.state.options}
              />
              <div className="menu">
                <Link to="/products">
                  <button className="add bold">Back</button>
                </Link>
                <button onClick={this.consoleLog} className="add bold">
                  Back
                </button>
              </div>
            </div>
          </React.Fragment>
        )}
      </ProductConsumer>
    );
  }
}

export default View;
