import React from "react";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../Context";

class Default extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {}
    };
  }

  render() {
    return (
      <ProductConsumer>
        {(value) => (
          <React.Fragment>
            <div className="list1"></div>

            <div className="containers default-container">
              <h2 className="view-h2">Page Not Found </h2>

              <div className="view-tabs">
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

export default Default;
