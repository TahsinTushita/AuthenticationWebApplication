import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import Layout from "./hoc/Layout/Layout";
import Logout from "./containers/Auth/Logout/Logout";
import Signup from "./containers/Auth/Signup/Signup";
import AuthState from "./containers/Auth/AuthState/AuthState";

class App extends Component {
  state = {};

  handleRecieved = (message) => {
    console.log(message);
  };

  render() {
    let app = null;

    let routes = (
      <Switch>
        <Route path="/authState" component={AuthState} />
        <Route path="/signout" component={Logout} />
        <Route path="/signin" component={Auth} />
        <Route path="/" exact component={Signup} />
      </Switch>
    );

    app = (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );

    return app;
  }
}

export default App;
