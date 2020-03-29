import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../Context";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class QuantityHistory extends React.Component {
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
          categories: [data[0].quantityChangeDate, "B", "C", "C", "C"]
        }
      }
    });
    console.log(this.state.options.series);
  };

  render() {
    return (
      <ProductConsumer>
        {(value) => (
          <React.Fragment>
            <div className="list1"></div>

            <div className="containers view-container">
              <h2 className="view-h2">Quantity History </h2>
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

export default QuantityHistory;
