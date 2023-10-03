import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import "../style/form.css";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField } from "@mui/material";

class form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      projectDesc: "",
      projectName: "",
    };
  }

  componentDidMount = () => {
    if (localStorage.getItem("formData"))
      this.setState({ formData: JSON.parse(localStorage.getItem("formData")) });
    else
      toast.info("Please complete this form to register for the competition");
  };

  navTo = (path) => {
    this.props.history.push(path);
  };

  resetData = () => {
    this.setState({
      email: "",
    });
  };

  onChangeName = (event) => {
    this.setState({
      projectName: event.target.value,
    });
  };

  onChangeDesc = (event) => {
    this.setState({
      projectDesc: event.target.value,
    });
  };

  saveDraft = () => {
    toast.success("Draft saved!");
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
        <div id="inputForm" style={{ textAlign: "center " }}>
          <h3>Form</h3>
          <h3
            style={{
              position: "absolute",
              marginLeft: "20px",
              color: "white",
              marginTop: "45px",
              fontSize: "22px",
            }}
          >
            Name of your project:
          </h3>
          <h3
            style={{
              position: "absolute",
              marginLeft: "20px",
              color: "white",
              marginTop: "220px",
              fontSize: "22px",
            }}
          >
            Give a description of your project:
          </h3>
          <div
            id="inputs"
            style={{
              width: "700px",
              marginLeft: "450px",
              position: "absolute",
              textAlign: "left",
              marginTop: "30px",
            }}
          >
            <TextField
              placeholder="Project name"
              variant="outlined"
              onChange={(event) => this.onChangeName(event)}
              style={{
                backgroundColor: "white",
              }}
            />
            <br />
            <br />
            <br />
            <TextField
              placeholder="Project description"
              multiline
              variant="outlined"
              onChange={(event) => this.onChangeDesc(event)}
              rows={10}
              maxRows={20}
              fullWidth
              value={this.state.projectDesc}
              style={{
                backgroundColor: "white",
              }}
            />
          </div>
          <br />
          <Button
            style={{
              fontSize: "30px",
              marginTop: "400px",
              marginRight: "20px",
            }}
            onClick={() => this.navTo("/app")}
          >
            Return to dashboard
          </Button>
          <Button
            style={{
              fontSize: "30px",
              marginTop: "400px",
              marginRight: "20px",
            }}
            onClick={() => this.saveDraft()}
          >
            Save draft
          </Button>
          <Button
            style={{
              fontSize: "30px",
              marginTop: "400px",
            }}
          >
            Save and submit
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(form);
