import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import UploadItem from "./UploadItem";
import ItemInfo from "./ItemInfo";
import authentication from "../HOC/authentication";
import styled from "styled-components";

const StyledBody = styled.div`
  padding-top: 69px;
  min-height: calc(100vh - 80px);
`;

const App = () => {
  return (
    <>
      <TopBar />
      <StyledBody>
        <Switch>
          <Route exact path="/" component={authentication(Home, null)} />
          <Route exact path="/login" component={authentication(Login, false)} />
          <Route
            exact
            path="/register"
            component={authentication(Register, false)}
          />
          <Route
            exact
            path="/uploadItem"
            component={authentication(UploadItem, true)}
          />
          <Route
            exact
            path="/:itemId"
            component={authentication(ItemInfo, null)}
          />
        </Switch>
      </StyledBody>
      <BottomBar />
    </>
  );
};

export default App;
