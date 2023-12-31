import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import home from "./pages/home";
import login from "./pages/login";
import register from "./pages/register";
import form from "./pages/form";
import app from "./pages/app";
import adminAuth from "./pages/adminAuth";
import adminApp from "./pages/adminApp";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={home}></Route>
          <Route path="/login" component={login}></Route>
          <Route path="/register" component={register}></Route>
          <Route path="/adminAuth" component={adminAuth}></Route>
          <Route path="/admin/app" component={adminApp}></Route>
          <Route path="/form/:id" component={form}></Route>
          <Route path="/app/:id" component={app}></Route>
        </Switch>
      </Router>
    );
  }
}
