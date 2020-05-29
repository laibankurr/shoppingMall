import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registers } from "../_actions/actions";

const Register = (props) => {
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    email: "",
    name: "",
    password: "",
    confirmPW: "",
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (userInfo.password !== userInfo.confirmPW) {
      return alert(
        "Password and Confirm Password values are different. Please re-enter."
      );
    }

    let body = {
      email: userInfo.email,
      password: userInfo.password,
      name: userInfo.name,
    };

    dispatch(registers(body)).then((response) => {
      if (response.payload.registerSuccess) {
        props.history.push("/login");
      } else {
        alert("An error has occurred. Please try again.");
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
        onSubmit={handleSubmit}
      >
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          placeholder="Enter your Email"
        />
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={userInfo.Name}
          onChange={handleChange}
          placeholder="Enter your Name"
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={userInfo.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPW"
          value={userInfo.confirmPW}
          onChange={handleChange}
          placeholder="Retype your password"
        />
        <br />
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
