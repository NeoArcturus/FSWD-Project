import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import "../style/form.css";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, Select, MenuItem } from "@mui/material";

class form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      projectDesc: "",
      projectName: "",
      projectMembers: "",
      projectTech: "",
      projectCust: "",
      other: "",
      token: "",
    };
  }

  componentDidMount = () => {
    const data = JSON.parse(localStorage.getItem("loginData"));
    console.log(data);
    this.setState({
      id: data.profile.regId,
      email: data.profile.email,
      token: data.token,
    });
    if (localStorage.getItem("formData")) {
      const data = JSON.parse(localStorage.getItem("formData"));
      this.setState({
        projectName: data.a1,
        projectDesc: data.a2,
        projectTech: data.a3,
        projectCust: data.a4,
        other: data.a5,
        projectMembers: data.a6,
      });
    } else
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
    if (event.target.value === "other")
      toast.info("Please specify your field of focus in the given box");
    this.setState({
      projectTech: event.target.value,
    });
  };

  onChangeCust = (event) => {
    this.setState({ projectCust: event.target.value });
  };

  onChangeOther = (event) => {
    this.setState({ other: event.target.value });
  };

  saveDraft = () => {
    const formData = {
      id: this.state.id,
      a1: this.state.projectName,
      a2: this.state.projectDesc,
      a3: this.state.projectTech,
      a4: this.state.projectCust,
      a5: this.state.other,
      a6: this.state.projectMembers,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
    this.clearForm();
    toast.success("Draft saved!");
    setTimeout(() => this.navTo("/app/" + this.state.id), 4000);
  };

  submitForm = () => {
    axios
      .post(
        "http://localhost:8080/api/form/formController",
        {
          email: this.state.email,
          body: {
            a1: this.state.projectName,
            a2: this.state.projectDesc,
            a3: this.state.projectTech,
            a4: this.state.projectCust,
            a5: this.state.other,
            a6: this.state.projectMembers,
          },
        },
        { headers: { Authorization: this.state.token } }
      )
      .then((result) => {
        toast.success("Form submitted!");
        localStorage.removeItem("formData");
        this.clearForm();
        setTimeout(() => this.navTo("/app/" + this.state.id), 4000);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  clearForm = () => {
    this.setState({
      projectDesc: "",
      projectName: "",
      projectMembers: "",
      projectTech: "",
      projectCust: "",
      other: "",
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
        <div id="inputForm" style={{ textAlign: "center " }}>
          <h3>Form</h3>
          <h3
            style={{
              position: "absolute",
              color: "white",
              fontSize: "22px",
              marginLeft: "600px",
              marginTop: "600px",
            }}
          >
            If other, please specify:
          </h3>
          <h3 style={{ fontSize: "20px" }}>Registration ID: {this.state.id}</h3>
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
          <h3
            style={{
              position: "absolute",
              marginLeft: "20px",
              color: "white",
              marginTop: "650px",
              fontSize: "22px",
            }}
          >
            Number of customers:
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
              value={this.state.other}
              onChange={(event) => this.onChangeOther(event)}
              placeholder="Other Focus Sector"
              variant="outlined"
              style={{
                backgroundColor: "white",
                position: "absolute",
                marginLeft: "450px",
                marginTop: "506px",
              }}
            />
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
              <MenuItem value={"other"}>Other</MenuItem>
            </Select>
            <br />
            <br />
            <br />
            <TextField
              placeholder="No. of customers"
              variant="outlined"
              onChange={(event) => this.onChangeCust(event)}
              value={this.state.projectCust}
              style={{
                backgroundColor: "white",
              }}
            />
          </div>
          <br />
          <Button
            style={{
              fontSize: "30px",
              marginTop: "700px",
              marginRight: "20px",
            }}
            onClick={() => this.navTo("/app/" + this.state.id)}
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
              marginRight: "20px",
            }}
            onClick={() => this.submitForm()}
          >
            Save and submit
          </Button>
          <Button
            style={{
              fontSize: "30px",
              marginTop: "700px",
            }}
            onClick={() => this.clearForm()}
          >
            Clear form
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(form);
