import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import "../style/form.css";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, Select, MenuItem, InputLabel } from "@mui/material";

class form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      projectDesc: "",
      projectName: "",
      projectMembers: "",
      projectTech: "",
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

  onChangeMembers = (event) => {
    this.setState({
      projectMembers: event.target.value,
    });
  };

  onChangeTech = (event) => {
    this.setState({
      projectTech: event.target.value,
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
          <h3
            style={{
              position: "absolute",
              marginLeft: "20px",
              color: "white",
              marginTop: "450px",
              fontSize: "22px",
            }}
          >
            Names of the members in the team:
          </h3>
          <h3
            style={{
              position: "absolute",
              marginLeft: "20px",
              color: "white",
              marginTop: "555px",
              fontSize: "22px",
            }}
          >
            Technology focus sector:
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
              value={this.state.projectName}
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
            <br />
            <br />
            <br />
            <TextField
              placeholder="Project members"
              multiline
              variant="outlined"
              onChange={(event) => this.onChangeMembers(event)}
              rows={2}
              maxRows={10}
              fullWidth
              value={this.state.projectMembers}
              style={{
                backgroundColor: "white",
              }}
            />
            <br />
            <br />
            <br />
            <Select
              value={this.state.projectTech}
              onChange={(event) => this.onChangeTech(event)}
              label="Focus Sector"
              style={{
                backgroundColor: "white",
                color: "black",
              }}
            >
              <MenuItem value={""} disabled>
                None
              </MenuItem>
              <MenuItem value={"FinTech"}>FinTech</MenuItem>
              <MenuItem value={"Gaming"}>Gaming</MenuItem>
              <MenuItem value={"Medical"}>Medical</MenuItem>
              <MenuItem value={"Agriculture"}>Agriculture</MenuItem>
              <MenuItem value={"IoT"}>IoT</MenuItem>
              <MenuItem value={"AI"}>A.I.</MenuItem>
              <MenuItem value={"Data Analytics"}>Data Analytics</MenuItem>
              <MenuItem value={"Animation"}>Animation</MenuItem>
              <MenuItem value={"A.R./V.R."}>A.R./V.R.</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </div>
          <br />
          <Button
            style={{
              fontSize: "30px",
              marginTop: "700px",
              marginRight: "20px",
            }}
            onClick={() => this.navTo("/app")}
          >
            Return to dashboard
          </Button>
          <Button
            style={{
              fontSize: "30px",
              marginTop: "700px",
              marginRight: "20px",
            }}
            onClick={() => this.saveDraft()}
          >
            Save draft
          </Button>
          <Button
            style={{
              fontSize: "30px",
              marginTop: "700px",
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
