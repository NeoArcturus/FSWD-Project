import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import "../style/app.css";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class app extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      token: "",
      status: "",
    };
  }

  componentDidMount = () => {
    const profile = JSON.parse(localStorage.getItem("loginData"));
    this.setState({
      data: profile.profile,
      token: profile.token,
    });
    axios
      .post(
        "http://localhost:8080/api/form/formData",
        { email: profile.profile.email },
        { headers: { Authorization: profile.token } }
      )
      .then((result) => {
        console.log(result);

      })
      .catch((error) => {
        console.log(error);
        this.setState({ status: error.response.data.message });
      });
  };

  navTo = (path) => {
    this.props.history.push(path);
  };

  logout = () => {
    toast.info("Logging out!");
    localStorage.removeItem("loginData");
    setTimeout(() => {
      this.navTo("/");
      this.setState({
        data: {},
        token: "",
        status: "",
      });
    }, 4000);
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
        <div id="profileData">
          <h1 style={{ fontSize: "50px" }}>Profile</h1>
          <div
            style={{ textAlign: "left", marginLeft: "25px", fontSize: "20px" }}
          >
            <h3>Name: {this.state.data.name}</h3>
            <h3>Email: {this.state.data.email}</h3>
            <h3>Phone: {this.state.data.phone}</h3>
            <h3>Application Status: {this.state.status}</h3>
          </div>
          <br />
          <Button
            style={{
              fontSize: "30px",
              borderStyle: "solid",
              marginRight: "15px",
            }}
          >
            Fill form
          </Button>
          <Button
            style={{ fontSize: "30px", borderStyle: "solid" }}
            onClick={() => this.logout()}
          >
            Logout
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(app);
