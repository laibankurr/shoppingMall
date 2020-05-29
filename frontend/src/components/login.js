import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logins } from "../_actions/actions";
import { withRouter } from "react-router-dom";

const Login = (props) => {
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let body = userInfo;

    dispatch(logins(body)).then((response) => {
      if (response.payload.loginSuccess === true) {
        props.history.push("/");
      } else if (response.payload.loginSuccess === false) {
        if (response.payload.message === "Wrong email") {
          alert("Unable to find this email. Please try again");
        }
        if (response.payload.message === "Wrong password") {
          alert("Wrong password. Please check again.");
        }
      } else {
        alert("Failed to Sign in. Please try again.");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={submitHandler}
      >
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          placeholder="Enter your Email"
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={userInfo.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <br />
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default withRouter(Login);
