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

const firebaseConfig = {
  apiKey: "AIzaSyBaUYMsQWYNFT8TEcw9sEjiiJ3fTH_DVJc",
  authDomain: "fullstack-web-development.firebaseapp.com",
  projectId: "fullstack-web-development",
  storageBucket: "fullstack-web-development.appspot.com",
  messagingSenderId: "942474945241",
  appId: "1:942474945241:web:5ca1d9f29c7f52c47b54c8",
  measurementId: "G-8FW79937H0",
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      toggleType: "password",
    };
  }

  navTo = (path) => {
    this.props.history.push(path);
  };

  handleEmailLogin = (rst) => {
    console.log(rst);
    axios
      .post("http://localhost:8080/api/auth/authController/login", {
        id: this.state.username,
        password: this.state.password,
      })
      .then()
      .catch((error) => {
        toast.error(error.response.data.message);
        this.resetData();
      });
  };
  handleGoogleLogin = (rst) => {
    axios
      .post("http://localhost:8080/api/auth/authController/googleSignIn", {
        username: rst.user.email,
      })
      .then((result) => {
        toast.success("Successful sign in!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        this.resetData();
      });
  };

  loginClick = () => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, this.state.username, this.state.password)
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
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  resetData = () => {
    this.setState({
      username: "",
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
            placeholder="Username"
            type="email"
            value={this.state.username}
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
