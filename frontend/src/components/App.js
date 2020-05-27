import React from "react";
import { Route, Switch } from "react-router-dom";
import login from "./login";
import home from "./home";
import register from "./register";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={home} />
        <Route exact path="/login" component={login} />
        <Route exact path="/register" component={register} />
      </Switch>
    </div>
  );
};

export default App;
