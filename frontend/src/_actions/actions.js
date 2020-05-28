import axios from "axios";
import { LOGIN } from "./actionTypes";

export const logins = (body) => {
  const request = axios.post("/api/login", body).then((res) => res.data);
  return {
    type: LOGIN,
    payload: request,
  };
};
