import React, { Component } from "react";
import Auth from "./containers/Auth/Auth";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import Logout from "./containers/Auth/Logout/Logout";
import Signup from "./containers/Auth/Signup/Signup";
import Profile from "./containers/User/Profile/Profile";
import { connect } from "react-redux";
// import ProfileUpdate from "./containers/User/Profile/ProfileUpdate/ProfileUpdate";
// import './App.css';

class App extends Component {
  state = {};

  handleRecieved = (message) => {
    console.log(message);
  };

  render() {
    let app = null;
    let routes = (
      <Switch>
        {/* <Route path="/updateProfile" component={ProfileUpdate} /> */}
        <Route path="/profile" component={Profile} />
        <Route path="/signout" component={Logout} />
        <Route path="/signin" component={Auth} />
        <Route path="/signup" component={Signup} />
        {/* <Route path="/" exact component={Home} /> */}
      </Switch>
    );

    // if (this.props.isAuthenticated) {
    //   app = (
    //     <div>
    //       <Layout>
    //         <CustomWebSocket>{routes}</CustomWebSocket>
    //       </Layout>
    //     </div>
    //   );
    // } else {
      app = (
        <div>
          <Layout>{routes}</Layout>
        </div>
      );
    // }

    return app;

  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  };
};

export default connect(mapStateToProps)(App);

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <h1>React App</h1>
//       </div>
//     );
//   }
// }

// export default App;
