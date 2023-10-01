import React from "react";
import { withRouter } from "react-router-dom";

import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class app extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navTo = (path) => {
    this.props.history.push(path);
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
          <h1>Profile</h1>
        </div>
      </div>
    );
  }
}

export default withRouter(app);
