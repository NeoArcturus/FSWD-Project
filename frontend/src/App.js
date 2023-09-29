import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import login from "./pages/login";
import register from "./pages/register";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={login}></Route>
          <Route path="/register" component={register}></Route>
        </Switch>
      </Router>
    );
  }
}
