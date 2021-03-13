import React, { Component } from "react";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosed = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    let header = (
      <div className={[classes.Row, `row`].join(" ")}>
        <div className="col-md-2">
          <h3>Authentication Web App</h3>
        </div>
      </div>
    );


    return (
      <div>
        <div style={{ minHeight: "100vh" }}>
          <div className={classes.Content}>
            <Toolbar
              authenticated={this.props.isAuthenticated}
              drawerToggleClicked={this.sideDrawerToggleHandler}
            />

            <SideDrawer
              open={this.state.showSideDrawer}
              closed={this.sideDrawerClosed}
              authenticated={this.props.isAuthenticated}
            />
          </div>
          {header}

          <div className={[classes.Row, `row`].join(" ")}>
            <div className={["col-md-10"].join(" ")}>
              <main className={classes.Main}>{this.props.children}</main>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

export default connect(mapStateToProps)(withRouter(Layout));
