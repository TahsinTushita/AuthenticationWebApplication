import React, { Component } from "react";
import Axios from "axios";
import Input from "../../../components/UI/Input/Input";
import { signup, setSignedUpToFalse } from "../../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import classes from "./Signup.css";
import { Alert } from "reactstrap";
import Spinner from "../../../components/UI/Spinner/Spinner";
class Signup extends Component {
  state = {
    controls: {
      username: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          isPassword: true,
        },
        valid: false,
        touched: false,
      },
      passwordConfirmation: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password Confirmation",
        },
        value: "",
        validation: {
          required: true,
          equalsPassword: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    visible: false,
    message: null,
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.isPassword) {
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.equalsPassword) {
      const password = this.state.controls.password.value;
      isValid = value === password && isValid;
    }

    if (rules.isEmail) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };

    let formIsValid = true;
    for (let controlName in updatedControls) {
      formIsValid = updatedControls[controlName].valid && formIsValid;
    }

    this.setState({ controls: updatedControls, formIsValid: formIsValid });
  };

  submitHandler = (event) => {
    event.preventDefault();

    if (!this.state.formIsValid) {
      let message = "Please fill up the whole form correctly!";
      this.onShowAlert(message);
    } else {
      const signupInfo = {
        name: this.state.controls.username.value,
        password: this.state.controls.password.value,
        email: this.state.controls.email.value,
      };

      this.props.onSignup(signupInfo);
    }
  };

  onShowAlert = (message) => {
    this.setState({ message: message, visible: true }, () => {
      window.setTimeout(() => {
        this.setState({ visible: false });
      }, 2000);
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let redirectTo = null;

    if (this.props.signedUp) {
      redirectTo = <Redirect to="/signin" />;
      this.props.onSignedUpToFalse();
    }

    return (
      <div>
        {redirectTo}
        <div className={classes.Signup}>
          <form onSubmit={this.submitHandler}>
            {form}
            <Alert color="warning" isOpen={this.state.visible}>
              {this.state.message}
            </Alert>
            <button className={classes.SignupBtn}>SIGN UP</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    signedUp: state.signedUp,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignup: (signupInfo) => dispatch(signup(signupInfo)),
    onSignedUpToFalse: () => dispatch(setSignedUpToFalse()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Signup, Axios));
