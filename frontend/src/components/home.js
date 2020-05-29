import React from "react";
import { FaLaugh } from "react-icons/fa";
import axios from "axios";

const Home = (props) => {
  const handleClick = () => {
    axios.get("/api/logout").then((response) => {
      if (response.data.success) {
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
      <FaLaugh style={{ fontSize: "4rem" }} />
      <br />
      <h1> In Construction</h1>
      <button onClick={handleClick}>Sign Out</button>
    </div>
  );
};

export default Home;
