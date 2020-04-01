import React from "react";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../Context";

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {}
    };
  }

  render() {
    var product = this.props.product;
    return (
      <ProductConsumer>
        {(value) => (
          <React.Fragment>
            <div className="cover"></div>

            <div className="containers details-container">
              <h2 className="view-h2">Product Details </h2>

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
                <div className="product-details ">
                  <div className="row">
                    <div className="col-6">
                      <h5 className="product-details-h5">Name:</h5>
                    </div>
                    <div className="col-6">
                      <h5 className="product-details-h5 lighter">
                        {product.name}
                      </h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <h5 className="product-details-h5 ">Quantity:</h5>
                    </div>
                    <div className="col-6">
                      <h5 className="product-details-h5 lighter">
                        {product.quantity}
                      </h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <h5 className="product-details-h5">Price, €:</h5>
                    </div>
                    <div className="col-6">
                      <h5 className="product-details-h5 lighter">
                        {product.price}
                      </h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <h5 className="product-details-h5 ">Ean:</h5>
                    </div>
                    <div className="col-6">
                      <h5 className="product-details-h5 lighter">
                        {product.ean}
                      </h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <h5 className="product-details-h5">Type:</h5>
                    </div>
                    <div className="col-6">
                      <h5 className="product-details-h5 lighter">
                        {product.type}
                      </h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <h5 className="product-details-h5 ">Weight, kg:</h5>
                    </div>
                    <div className="col-6">
                      <h5 className="product-details-h5 lighter">
                        {product.weight}
                      </h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <h5 className="product-details-h5">Color:</h5>
                    </div>
                    <div className="col-6">
                      <h5 className="product-details-h5 lighter right">
                        {product.color}
                      </h5>
                    </div>
                  </div>
                </div>
                <Link to="/products">
                  <div className="row">
                    <button className="container-buttons">
                      <span className="bold">Back</span>
                    </button>
                  </div>
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
