import React from "react";
import { withRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import "../style/home.css";
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

class home extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  loginClick = () => {
    toast.success("Successful login!");
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
          <Input placeholder="Username"></Input>
          <Input placeholder="Password" type="password"></Input>
          <p>
            <Checkbox style={{ color: "rgb(0, 255, 255, 0.5)" }} /> Show
            password
          </p>
          <div
            id="buttonBox"
            style={{
              marginTop: "40px",
            }}
          >
            <Button
              style={{
                backgroundColor: "black",
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
                backgroundColor: "black",
                color: "aqua",
                borderStyle: "solid",
                borderColor: "transparent",
                borderRadius: "5px",
                fontSize: "30px",
                transition: "0.4s ease-in-out",
              }}
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

export default withRouter(home);
