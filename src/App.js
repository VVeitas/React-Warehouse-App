import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./Components/Homepage";
import Products from "./Components/Products";
import View from "./Components/View";
import Create from "./Components/Create";
import { ProductConsumer } from "./Context";
import Edit from "./Components/Edit";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ProductConsumer>
        {(value) => (
          <React.Fragment>
            <div className="app">
              <Router>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/products" component={Products} />
                <Route
                  exact
                  path="/products/:id"
                  component={() => <View currentView={value.currentView} />}
                />
                <Route
                  exact
                  path="/create"
                  component={() => <Products create={value.create} />}
                />
                <Route
                  exact
                  path="/products/:id/edit"
                  component={() => (
                    <Edit
                      products={value.products}
                      id={value.editProdcut}
                      edit1Product={value.edit1Product}
                    />
                  )}
                />
              </Router>
            </div>
          </React.Fragment>
        )}
      </ProductConsumer>
    );
  }
}

export default App;
