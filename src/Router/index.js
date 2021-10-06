import { Switch, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";

function Router() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@KHub:token"));

    console.log(token);

    if (token) {
      setAuthenticated(true);
    }
  }, [authenticated]);

  console.log(authenticated);

  return (
    <Switch>
      <Route exact path="/">
        <Signup
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route exact path="/login">
        <Login
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
    </Switch>
  );
}

export default Router;
