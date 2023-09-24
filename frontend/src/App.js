import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import home from "./pages/home";

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={home}></Route>
        </Switch>
      </Router>
    );
  }
}
