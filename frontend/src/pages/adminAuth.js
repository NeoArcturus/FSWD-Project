import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import "../style/login.css";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input, Checkbox } from "@mui/material";

class adminLogin extends React.Component {
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

  loginClick = () => {
    axios
      .post("http://localhost:8080/admin/control/login", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((result) => {
        toast.success("Login successful!");
        localStorage.setItem("adminToken", JSON.stringify(result.data.token));
        setTimeout(() => this.navTo("/admin/app"), 4000);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error);
      });
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
        <h1
          style={{
            color: "black",
            fontSize: "50px",
            marginLeft: "40vw",
          }}
        >
          ADMIN LOGIN
        </h1>
        <div
          id="loginForm"
          style={{
            height: "355px",
            color: "white",
          }}
        >
          <h3>Login</h3>
          <br />
          <Input
            placeholder="Admin Username"
            type="email"
            value={this.state.username}
            onChange={(event) => this.onChangeUser(event)}
            style={{
              color: "white",
            }}
          ></Input>
          <Input
            placeholder="Admin Password"
            type={this.state.toggleType}
            value={this.state.password}
            onChange={(event) => this.onChangePassword(event)}
            style={{
              color: "white",
            }}
          ></Input>
          <p>
            <Checkbox
              style={{ color: "white" }}
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
                color: "white",
                borderStyle: "solid",
                borderColor: "transparent",
                borderRadius: "5px",
                fontSize: "30px",
                transition: "0.4s ease-in-out",
                marginBottom: "10px",
              }}
              onClick={() => this.loginClick()}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(adminLogin);
