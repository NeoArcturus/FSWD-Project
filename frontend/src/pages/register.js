import React from "react";
import { withRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
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

class register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      toggleType: "password",
      name: "",
      phone: "",
    };
  }

  navTo = (path) => {
    this.props.history.push(path);
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

  onChangeName = (event) => {
    this.setState({ name: event.target.value });
  };

  onChangePhone = (event) => {
    this.setState({ phone: event.target.value });
  };

  resetData = () => {
    this.setState({
      email: "",
      password: "",
      name: "",
      phone: "",
    });
  };

  handleGoogleSignUp = (result) => {
    axios
      .post("http://localhost:8080/api/auth/authController/googleSignUp", {
        data: result.user,
      })
      .then((result) => {
        toast.success("Successful sign up!");
        console.log(result);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error.response.data.error);
        this.resetData();
      });
  };

  handleEmailSignUp = (result) => {
    axios
      .post("http://localhost:8080/api/auth/authController/register", {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        phone: this.state.phone,
      })
      .then((result) => {
        toast.success("Successful registration!");
        console.log(result);
        this.resetData();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error.response.data.error);
        this.resetData();
      });
  };

  signUpClick = () => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((result) => this.handleEmailSignUp(result))
      .catch((error) => {
        toast.error("Sign In error!");
        console.log(error);
      });
  };

  googleClick = () => {
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => this.handleGoogleSignUp(result))
      .catch((error) => {
        toast.error("Sign In error!");
        console.log(error);
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
          <h3>Sign Up</h3>
          <Input
            placeholder="Company Name"
            value={this.state.name}
            onChange={(event) => this.onChangeName(event)}
          ></Input>
          <Input
            placeholder="Company Phone"
            type="tel"
            value={this.state.phone}
            onChange={(event) => this.onChangePhone(event)}
          ></Input>
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
              onClick={() => this.signUpClick()}
            >
              Sign Up
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
              Google Sign Up
            </Button>
          </div>
          <p>
            Already have an account?{" "}
            <Button
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
                color: "white",
              }}
              onClick={() => this.navTo("/")}
            >
              Login
            </Button>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(register);
