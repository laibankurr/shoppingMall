import React from "react";
import { Menu } from "antd";
import { withRouter } from "react-router-dom";

const LeftMenu = (props) => {
  return (
    <Menu mode={props.mode}>
      {/* <Menu.Item key="userInfo">
        <a href="/userInfo">User Info</a>
      </Menu.Item> */}
    </Menu>
  );
};

export default withRouter(LeftMenu);
