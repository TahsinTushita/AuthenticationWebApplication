import * as actionTypes from "./actionTypes";
import Axios from "axios";
import Cookies from "js-cookie";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
    };

    Axios.post("api/users/login", authData)
      .then((response) => {
        console.log(response);
        if (response.data.token != undefined) {
          localStorage.setItem("token", response.data.token);
          Cookies.set("token", response.data.token, {
            expires: 365,
            path: "/",
          });
          dispatch(authSuccess(response.data));
        } else {
          dispatch(authFail(response.data));
        }
        console.log(response.data);
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};

export const authenticated = (token) => {
  console.log("authenticated");
  return {
    type: actionTypes.AUTHENTICATED,
    token: token,
  };
};

export const logoutSuccess = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const logoutFail = (error) => {
  return {
    type: actionTypes.LOGOUT_FAIL,
    error: error,
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    Cookies.remove("token");

    dispatch(logoutSuccess());
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authStateCheck = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
      console.log("success");
      dispatch(authenticated(token));
      return true;
    } else {
      dispatch(logout());
      return false;
    }
  };
};

export const signup = (signupInfo) => {
  return (dispatch) => {
    dispatch(authStart());

    Axios.post("api/users", signupInfo)
      .then((response) => {
        console.log(response);
        dispatch(signupSuccess());
      })
      .catch((error) => {
        dispatch(signupFailed(error));
      });
  };
};

export const signupSuccess = () => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
  };
};

export const signupFailed = (error) => {
  return {
    type: actionTypes.SIGNUP_FAILED,
    error: error,
  };
};

export const setSignedUpToFalse = () => {
  return {
    type: actionTypes.SET_SIGNED_UP_TO_FALSE,
  };
};
