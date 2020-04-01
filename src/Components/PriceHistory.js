import React from "react";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../Context";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class PriceHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.getProductNameUrl();
  };

  /*This function will get name of the product from the url that will be used 
  for getting the item history from local storage and using that information 
  in graph.*/
  getProductNameUrl = () => {
    var name = window.location.href.split("/")[4];
    this.PriceGraph(name);
  };

  /* Here we will get products information from local storage which will be
  displayed in graph. */
  PriceGraph = (name) => {
    const priceStorage = name + "P";
    if (localStorage.getItem(priceStorage) === null) {
      this.setState({ series: [] });
    } else {
      var data = JSON.parse(localStorage.getItem(priceStorage));
    }
    const priceData = data.map(({ price }) => parseInt(price, 10));
    const xAxis = data.map((data) => data.priceChangeDate);
    this.setState({
      options: {
        title: {
          text: name
        },
        series: [
          {
            data: [...priceData],
            showInLegend: false
          }
        ],
        xAxis: {
          categories: xAxis
        }
      }
    });
  };

  render() {
    var product = this.props.product;
    return (
      <ProductConsumer>
        {(value) => (
          <React.Fragment>
            <div className="cover"></div>

            <div className="containers view-container">
              <h2 className="view-h2">{product.name} Price History </h2>

              <div className="view-tabs">
                <div className="row">
                  <Link to={`/products/${product.name}/productdetails`}>
                    <p className="tab-text">Product Details</p>
                  </Link>
                  <Link to={`/products/${product.name}/quantityhistory`}>
                    <p className="tab-text">Quantity History</p>
                  </Link>
                  <Link to={`/products/${product.name}/pricehistory`}>
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
