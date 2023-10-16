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

  selectApplicant = (id, email) => {
    console.log(id);
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
  };

  rejectApplicant = (id, email) => {
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
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      color: "aqua",
                    }}
                  >
                    Form ID
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "aqua",
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "aqua",
                    }}
                  >
                    Answer 1
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "aqua",
                    }}
                  >
                    Answer 2
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "aqua",
                    }}
                  >
                    Answer 3
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "aqua",
                    }}
                  >
                    Answer 4
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "aqua",
                    }}
                  >
                    Answer 5
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "aqua",
                    }}
                  >
                    Answer 6
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "aqua",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "aqua",
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
                      }}
                    >
                      {applicant.ID}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: "white",
                      }}
                    >
                      {applicant.Email}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: "white",
                      }}
                    >
                      {applicant.Answers.a1}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: "white",
                      }}
                    >
                      {applicant.Answers.a2}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: "white",
                      }}
                    >
                      {applicant.Answers.a3}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: "white",
                      }}
                    >
                      {applicant.Answers.a4}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: "white",
                      }}
                    >
                      {applicant.Answers.a5}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: "white",
                      }}
                    >
                      {applicant.Answers.a6}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: "white",
                      }}
                    >
                      {applicant.Status}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        style={{ marginRight: "5px", color: "greenyellow" }}
                        onClick={() =>
                          this.selectApplicant(applicant.ID, applicant.Email)
                        }
                      >
                        Accept
                      </Button>
                      <Button
                        style={{
                          color: "red",
                        }}
                        onClick={() =>
                          this.rejectApplicant(applicant.ID, applicant.Email)
                        }
                      >
                        Reject
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
