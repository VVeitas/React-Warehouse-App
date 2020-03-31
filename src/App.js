import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Default from "./Components/Default";
import Products from "./Components/Products";
import { ProductConsumer } from "./Context";

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
                <Switch>
                  <Route exact path="/" component={Products} />
                  <Route exact path="/products" component={Products} />
                  <Route
                    exact
                    path="/products/:id/:id"
                    component={() => (
                      <Products currentView={value.currentView} />
                    )}
                  />
                  <Route
                    exact
                    path="/create"
                    component={() => <Products create={value.create} />}
                  />
                  <Route component={Default} />
                </Switch>
              </Router>
            </div>
          </React.Fragment>
        )}
      </ProductConsumer>
    );
  }
}

export default App;
