import { Switch, Route } from "react-router-dom";
import React from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import Menu from "../components/Menu";

function Router() {
  return (
    <Switch>
      <Route exact path="/">
        <Signup />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/menu">
        <Menu />
      </Route>
    </Switch>
  );
}

export default Router;
