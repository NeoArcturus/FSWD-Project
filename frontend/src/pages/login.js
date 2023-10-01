import React from "react";
import { withRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";

import "../style/login.css";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input, Checkbox } from "@mui/material";

import { firebaseData } from "../data"; //Create a firebase configuration javascript file

const app = initializeApp(firebaseData);
const provider = new GoogleAuthProvider();

class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      toggleType: "password",
    };
  }

  componentDidMount = () => {
    if (
      !localStorage.getItem("loginData") === null ||
      !localStorage.getItem("loginData") === undefined
    ) {
      toast.success("Logging in...");
      setTimeout(() => this.navTo("/form"), 4000);
    } else toast.info("Please login!");
  };

  navTo = (path) => {
    this.props.history.push(path);
  };

  handleEmailLogin = (rst) => {
    console.log(rst);
    axios
      .post("http://localhost:8080/api/auth/authController/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((result) => {
        toast.success("Successful login!");
        setTimeout(() => {
          this.navTo("/form");
          localStorage.setItem("loginData", JSON.stringify(rst.user));
        }, 4000);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        this.resetData();
      });
  };
  handleGoogleLogin = (rst) => {
    axios
      .post("http://localhost:8080/api/auth/authController/googleSignIn", {
        email: rst.user.email,
      })
      .then((result) => {
        toast.success("Successful sign in!");
        setTimeout(() => {
          this.navTo("/form");
          localStorage.setItem("loginData", JSON.stringify(rst.user));
        }, 4000);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        this.resetData();
      });
  };

  loginClick = () => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((result) => this.handleEmailLogin(result))
      .catch((error) => {
        toast.error("Sign In error!");
        console.log(error);
      });
  };

  googleClick = () => {
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => this.handleGoogleLogin(result))
      .catch((error) => {
        toast.error("Sign In error!");
        console.log(error);
      });
  };

  passwordToggle = () => {
    if (this.state.toggleType === "password")
      this.setState({
        toggleType: "text",
      });
    if (this.state.toggleType === "text")
      this.setState({
        toggleType: "password",
      });
  };

  onChangeUser = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  resetData = () => {
    this.setState({
      email: "",
      password: "",
    });
  };

  render() {
    return (
      <div>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          theme="dark"
        />
        <div id="loginForm">
          <h3>Sign In</h3>
          <br />
          <Input
            placeholder="Company Email"
            type="email"
            value={this.state.email}
            onChange={(event) => this.onChangeUser(event)}
          ></Input>
          <Input
            placeholder="Password"
            type={this.state.toggleType}
            value={this.state.password}
            onChange={(event) => this.onChangePassword(event)}
          ></Input>
          <p>
            <Checkbox
              style={{ color: "rgb(0, 255, 255, 0.5)" }}
              onClick={() => this.passwordToggle()}
            />
            Show password
          </p>
          <div
            id="buttonBox"
            style={{
              marginTop: "40px",
            }}
          >
            <Button
              style={{
                backgroundColor: "rgb(0, 0, 0, 0.3)",
                color: "aqua",
                borderStyle: "solid",
                borderColor: "transparent",
                borderRadius: "5px",
                fontSize: "30px",
                transition: "0.4s ease-in-out",
                marginBottom: "10px",
              }}
              onClick={() => this.loginClick()}
            >
              Sign In
            </Button>
            <br />
            <Button
              style={{
                backgroundColor: "rgb(0, 0, 0, 0.3)",
                color: "aqua",
                borderStyle: "solid",
                borderColor: "transparent",
                borderRadius: "5px",
                fontSize: "30px",
                transition: "0.4s ease-in-out",
              }}
              onClick={() => this.googleClick()}
            >
              Google Sign In
            </Button>
          </div>
          <p>
            Don't have an account?{" "}
            <Button
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
                color: "white",
              }}
              onClick={() => this.navTo("/register")}
            >
              Create Account
            </Button>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(login);
