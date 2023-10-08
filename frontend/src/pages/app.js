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
        this.setState({ status: result.data.data.status });
      })
      .catch((error) => {
        this.setState({ status: error.response.data.message });
      });
  };

  navTo = (path) => {
    this.props.history.push(path);
  };

  formPageControl = () => {
    axios
      .post(
        "http://localhost:8080/api/form/formData",
        { email: this.state.data.email },
        { headers: { Authorization: this.state.token } }
      )
      .then((result) => toast.warning("You have already completed this step!"))
      .catch((error) => {
        toast.info("Getting you to the form page");
        setTimeout(() => this.navTo("/form/" + this.state.data.regId), 4000);
      });
  };

  withDraw = () => {
    axios
      .post(
        "http://localhost:8080/api/form/withDraw",
        { email: this.state.data.email },
        { headers: { Authorization: this.state.token } }
      )
      .then((result) => {
        toast.success("Your application has been withdrawn! Loggin out");
        localStorage.removeItem("loginData");
        localStorage.removeItem("formData");
        setTimeout(() => {
          this.navTo("/");
          this.setState({
            data: {},
            token: "",
            status: "",
          });
        }, 4000);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error);
      });
  };

  logout = () => {
    toast.info("Logging out!");
    localStorage.removeItem("loginData");
    localStorage.removeItem("formData");
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
        <h1
          style={{
            color: "black",
            fontSize: "50px",
            marginLeft: "25vw",
          }}
        >
          STARTUP CHALLENGE PROGRAMME
        </h1>
        <div id="profileData">
          <h1 style={{ fontSize: "50px" }}>Profile</h1>
          <div
            style={{ textAlign: "left", marginLeft: "25px", fontSize: "20px" }}
          >
            <h3 style={{ color: "white" }}>Name: {this.state.data.name}</h3>
            <h3 style={{ color: "white" }}>Email: {this.state.data.email}</h3>
            <h3 style={{ color: "white" }}>
              Registration ID: {this.state.data.regId}
            </h3>
            <h3 style={{ color: "white" }}>
              Application Status: {this.state.status}
            </h3>
          </div>
          <br />
          <Button
            style={{
              fontSize: "30px",
              borderStyle: "solid",
              marginRight: "15px",
            }}
            onClick={() => this.formPageControl()}
          >
            Fill form
          </Button>
          <Button
            style={{
              fontSize: "30px",
              borderStyle: "solid",
              marginRight: "15px",
            }}
            onClick={() => this.withDraw()}
          >
            Withdraw
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
