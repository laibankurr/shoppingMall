import React from "react";
import { Menu } from "antd";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

const RightMenu = (props) => {
  const user = useSelector((state) => state.userInfo);
  const logoutHandler = () => {
    axios.get("/api/logout").then((response) => {
      if (response.status === 200) {
        props.history.push("/Login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (user && !user.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/Login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/Register">Signup</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <button type="button" className="link-button" onClick={logoutHandler}>
            Logout
          </button>
        </Menu.Item>

        <Menu.Item key="upload">
          <a href="/uploadItem">
            {/* <Icon type="upload" theme="outlined" /> */}
            Upload Product
          </a>
        </Menu.Item>
      </Menu>
    );
  }
};

export default withRouter(RightMenu);

/* <Badge count={user.userData && user.userData.cart.length}>
            <a
              href="/user/cart"
              className="head-example"
              style={{ marginRight: -22, color: "#667777" }}
            >
              <Icon
                type="shopping-cart"
                style={{ fontSize: 30, marginBottom: 3 }}
              />
            </a>
          </Badge> */
