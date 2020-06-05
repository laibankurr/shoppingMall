import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import UploadItem from "./UploadItem";
import ItemInfo from "./ItemInfo";
import Cart from "./Cart";
import Auth from "../HOC/Auth";
import BuyHistory from "./BuyHistory";
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
          <Route exact path="/" component={Auth(Home, null)} />
          <Route exact path="/login" component={Auth(Login, false)} />
          <Route exact path="/register" component={Auth(Register, false)} />
          <Route exact path="/uploadItem" component={Auth(UploadItem, true)} />
          <Route exact path="/cart" component={Auth(Cart, true)} />
          <Route exact path="/buyHistory" component={Auth(BuyHistory, true)} />
          <Route exact path="/:itemId" component={Auth(ItemInfo, null)} />
        </Switch>
      </StyledBody>
      <BottomBar />
    </>
  );
};

export default App;
