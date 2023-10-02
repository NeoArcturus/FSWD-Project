import React from "react";
import { withRouter } from "react-router-dom";

import "../style/home.css";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    if (
      localStorage.getItem("loginData") != null ||
      localStorage.getItem("loginData") != undefined
    )
      this.navTo("/app");
  };

  navTo = (path) => {
    this.props.history.push(path);
  };

  render() {
    return (
      <div id="body">
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          theme="dark"
        />
        <h1>OPEN CHALLENGE PROGRAMME</h1>
        <h3
          style={{
            marginTop: "35vh",
            position: "absolute",
            color: "black",
            marginLeft: "10vw",
            fontSize: "25px",
          }}
        >
          This is an open challenge programme for budding start - ups. <br />
          The idea behind it is to provide a platform where people can showcase
          their skills and ideas in the form of projects.
          <br />
          <br />
          The top 5 teams selected would be provided with financial support as
          well as <br />
          given guidance on start - up boost by Industry - based experts.
          <br />
          <b>
            <u>The project must be related to technology.</u>
          </b>
          <br />
          <br />
          <br />
          Click on the Register button to register for the programme or login if
          already registered.
          <br />
          Watch out for the deadline: <u>08/10/2023</u>. Limited vacancies only!
        </h3>
        <div id="buttonBar">
          <Button
            style={{
              borderStyle: "solid",
              fontSize: "30px",
              marginLeft: "12vw",
              marginTop: "1vh",
              marginRight: "15px",
            }}
            onClick={() => {
              toast.info("Going to register");
              setTimeout(() => this.navTo("/register"), 4000);
            }}
          >
            Register
          </Button>
          <Button
            style={{
              borderStyle: "solid",
              fontSize: "30px",
              marginTop: "1vh",
            }}
            onClick={() => {
              toast.info("Going to login");
              setTimeout(() => this.navTo("/login"), 4000);
            }}
          >
            Login
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(home);
