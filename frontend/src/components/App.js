import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import authentication from "../HOC/authentication";

const App = () => {
  return (
    <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
      <Switch>
        <Route exact path="/" component={authentication(Home, null)} />
        <Route exact path="/login" component={authentication(Login, false)} />
        <Route
          exact
          path="/register"
          component={authentication(Register, false)}
        />
      </Switch>
    </div>
  );
};

export default App;
