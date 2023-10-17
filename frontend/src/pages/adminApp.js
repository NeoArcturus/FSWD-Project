import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import "../style/adminApp.css";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

class app extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      token: "",
    };
  }

  componentDidMount = () => {
    const data = JSON.parse(localStorage.getItem("adminToken"));
    this.setState({
      token: data,
    });

    axios
      .get("http://localhost:8080/get/form/applicant", {
        headers: { Authorization: data },
      })
      .then((result) => {
        this.setState({
          data: result.data.data,
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error);
      });
  };

  navTo = (path) => {
    this.props.history.push(path);
  };

  logout = () => {
    toast.info("Logging out!");
    localStorage.removeItem("adminToken");
    setTimeout(() => {
      this.navTo("/");
      this.setState({
        data: {},
        token: "",
        status: "",
      });
    }, 4000);
  };

  selectApplicant = (id, email, status) => {
    if (status === "Selected" || status === "Rejected")
      toast.warn("Action already done!");
    else if (status === "Withdrawn")
      toast.info("Application has been withdrawn by the applicant");
    else {
      axios
        .post(
          "http://localhost:8080/admin/applications/applicant/" +
            id +
            "/selectApplicant",
          { id: id, email: email },
          { headers: { Authorization: this.state.token } }
        )
        .then((result) => {
          toast.info("Applicant selected!");
          console.log(result);
          this.componentDidMount();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error);
        });
    }
  };

  rejectApplicant = (id, email, status) => {
    if (status === "Selected" || status === "Rejected")
      toast.warn("Action already done!");
    else if (status === "Withdrawn")
      toast.info("Application has been withdrawn by the applicant");
    else {
      axios
        .post(
          "http://localhost:8080/admin/applications/applicant/" +
            id +
            "/rejectApplicant",
          { id: id, email: email },
          { headers: { Authorization: this.state.token } }
        )
        .then((result) => {
          toast.info("Applicant rejected!");
          console.log(result);
          this.componentDidMount();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error);
        });
    }
  };

  removeApplication = (id, status) => {
    if (status === "Rejected" || status === "Withdrawn") {
      axios
        .post(
          "http://localhost:8080/admin/applications/applicant/" +
            id +
            "/deleteApplication",
          { id: id },
          { headers: { Authorization: this.state.token } }
        )
        .then((result) => {
          toast.info("Application deleted!");
          console.log(result);
          this.componentDidMount();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error);
        });
    } else if (status === "Reviewing")
      toast.warn("Application is in review stage!");
    else toast.info("Application has been selected!");
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
        <h2
          style={{
            color: "black",
            fontSize: "50px",
            marginLeft: "25vw",
          }}
        >
          Stage 1 - Team Applications
        </h2>
        <div id="applicantTable">
          <TableContainer>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      color: "aqua",
                      fontSize: "12px",
                    }}
                  >
                    Form ID
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "aqua",
                      fontSize: "12px",
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "aqua",
                      fontSize: "12px",
                    }}
                  >
                    Answer 1
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "aqua",
                      fontSize: "12px",
                    }}
                  >
                    Answer 2
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "aqua",
                      fontSize: "12px",
                    }}
                  >
                    Answer 3
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "aqua",
                      fontSize: "12px",
                    }}
                  >
                    Answer 4
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "aqua",
                      fontSize: "12px",
                    }}
                  >
                    Answer 5
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "aqua",
                      fontSize: "12px",
                    }}
                  >
                    Answer 6
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "aqua",
                      fontSize: "12px",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      color: "aqua",
                      fontSize: "12px",
                    }}
                  >
                    Choose Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.data.map((applicant, i) => (
                  <TableRow key={i}>
                    <TableCell
                      style={{
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      {applicant.ID}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      {applicant.Email}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      {applicant.Answers.a1}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      {applicant.Answers.a2}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      {applicant.Answers.a3}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      {applicant.Answers.a4}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      {applicant.Answers.a5}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      {applicant.Answers.a6}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      {applicant.Status}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        style={{ marginRight: "5px", color: "greenyellow" }}
                        onClick={() =>
                          this.selectApplicant(
                            applicant.ID,
                            applicant.Email,
                            applicant.Status
                          )
                        }
                      >
                        Accept
                      </Button>
                      <Button
                        style={{ marginRight: "5px", color: "red" }}
                        onClick={() =>
                          this.rejectApplicant(
                            applicant.ID,
                            applicant.Email,
                            applicant.Status
                          )
                        }
                      >
                        Reject
                      </Button>
                      <Button
                        style={{
                          color: "red",
                        }}
                        onClick={() =>
                          this.removeApplication(applicant.ID, applicant.Status)
                        }
                      >
                        Delete application
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div id="buttonPanel">
          <Button
            onClick={() => this.logout()}
            style={{
              fontSize: "30px",
              borderColor: "transparent",
              backgroundColor: "rgb(0, 0, 0, 0.3)",
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(app);
