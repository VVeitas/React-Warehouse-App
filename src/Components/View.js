import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { ProductConsumer } from "../Context";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
const options = {
  title: {
    text: "My chart"
  },
  series: [
    {
      data: [1, 2, 3]
    }
  ]
};
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ProductConsumer>
        {(value) => (
          <React.Fragment>
            <div className="list">
              <h2 className="view-h2">VIEW </h2>
              <HighchartsReact highcharts={Highcharts} options={options} />
              <div className="menu">
                <Link to="/products">
                  <button className="add bold">Back</button>
                </Link>
              </div>
            </div>
          </React.Fragment>
        )}
      </ProductConsumer>
    );
  }
}

export default View;
