import classes from "./AuthState.css";
import { connect } from "react-redux";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class AuthState extends Component {
  state = {};

  render() {
    let authState;

    if (this.props.isAuthenticated) {
      authState = "Authentication Success";
    } else {
      authState = "Authentication Error";
    }

    return (
      <div className={classes.AuthState}>
        <h3>
          <strong>{authState}</strong>
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

export default connect(mapStateToProps)(withRouter(AuthState));
