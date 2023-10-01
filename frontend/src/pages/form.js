import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import "../style/form.css";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input, Checkbox } from "@mui/material";

class form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      toggleType: "password",
    };
  }

  navTo = (path) => {
    this.props.history.push(path);
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
        <div id="profile">
          <p>Profile</p>
        </div>
        <div id="inputForm">
          <h3>Form</h3>
          <div id="inputs"></div>
        </div>
        <Button
          style={{
            position: "absolute",
          }}
          onClick={() => this.navTo("/")}
        >
          Return to home page!
        </Button>
      </div>
    );
  }
}

export default withRouter(form);
