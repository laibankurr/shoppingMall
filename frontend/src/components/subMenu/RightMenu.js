import React from "react";
import { Menu } from "antd";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  UploadOutlined,
  ShoppingOutlined,
  PoweroffOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";

const RightMenu = (props) => {
  const user = useSelector((state) => state.user);
  const logoutHandler = () => {
    axios.get("/api/logout").then((response) => {
      if (response.status === 200) {
        props.history.push("/Login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/Login">
            <UserOutlined style={{ fontSize: 20 }} />
            SIGNIN
          </a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/Register">
            <UserAddOutlined style={{ fontSize: 20 }} />
            SIGNUP
          </a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="upload">
          <a href="/uploadItem">
            <UploadOutlined style={{ fontSize: 20 }} />
            UPLOAD
          </a>
        </Menu.Item>

        <Menu.Item key="cart">
          <a href="/cart">
            <ShoppingOutlined style={{ fontSize: 20 }} />
            BASKET{" "}
            {/* {(user.userData && user.userData.cart.length) > 0 && (
              <span style={{ color: "red" }}>{user.userData.cart.length}</span>
            )} */}
            <Badge
              count={user.userData && user.userData.cart.length}
              className="side-badge-count-4"
              style={{ backgroundColor: "#3464eb", marginBottom: 5 }}
            />
          </a>
        </Menu.Item>

        <Menu.Item key="logout">
          <a href="#" onClick={logoutHandler}>
            <PoweroffOutlined style={{ fontSize: 20 }} />
            LOGOUT
          </a>
        </Menu.Item>
      </Menu>
    );
  }
};

export default withRouter(RightMenu);
