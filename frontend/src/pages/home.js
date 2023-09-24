import React from "react";
import { withRouter } from "react-router-dom";

import "../style/home.css";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class home extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  loginClick = () => {
    toast.success("Successful login!");
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
        <div id="topbarButtons">
          <Button
            style={{
              backgroundColor: "black",
              color: "deeppink",
              fontSize: "30px",
              borderStyle: "solid",
              borderColor: "deeppink",
              borderRadius: "5px",
              marginLeft: "85vw",
              marginTop: "5px",
              transition: "0.4s ease-in-out",
            }}
          >
            Sign Up
          </Button>
          <Button
            style={{
              backgroundColor: "black",
              color: "deeppink",
              fontSize: "30px",
              borderStyle: "solid",
              borderColor: "deeppink",
              borderRadius: "5px",
              marginLeft: "20px",
              marginTop: "5px",
              transition: "0.4s ease-in-out",
            }}
            onClick={() => this.loginClick()}
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(home);
