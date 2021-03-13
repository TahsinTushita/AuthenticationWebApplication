import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Axios from "axios";
import store from "./store/store";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";
import * as actions from "./store/actions/index";

Axios.defaults.baseURL = "http://localhost:5000/";

store.dispatch(actions.authStateCheck());

let app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

Axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

ReactDOM.render(app, document.getElementById("root"));

// ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
