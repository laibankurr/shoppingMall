import axios from "axios";
import { LOGIN, REGISTER, AUTHENTICATION, ADDTOCART } from "./actionTypes";

export const logins = (body) => {
  const request = axios.post("/api/login", body).then((res) => res.data);
  return {
    type: LOGIN,
    payload: request,
  };
};

export const registers = (body) => {
  const request = axios.post("/api/register", body).then((res) => res.data);
  return {
    type: REGISTER,
    payload: request,
  };
};

export const authentications = () => {
  const request = axios.get("/api/auth").then((res) => res.data);

  return {
    type: AUTHENTICATION,
    payload: request,
  };
};

export const addToCart = (id) => {
  let body = {
    itemId: id,
  };
  const request = axios
    .post("api/addToCart", body)
    .then((response) => response.data);

  return {
    type: ADDTOCART,
    payload: request,
  };
};
