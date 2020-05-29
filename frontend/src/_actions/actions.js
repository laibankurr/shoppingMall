import axios from "axios";
import { LOGIN, REGISTER, AUTHENTICATION } from "./actionTypes";

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
