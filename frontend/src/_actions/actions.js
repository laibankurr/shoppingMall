import axios from "axios";
import {
  LOGIN,
  REGISTER,
  AUTH_USER,
  ADD_TO_CART,
  GET_ITEM,
  DELETE_ITEM,
  PURCHASE,
  LOGOUT,
} from "./actionTypes";

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

export const authUser = () => {
  const request = axios.get("/api/auth").then((res) => res.data);
  return {
    type: AUTH_USER,
    payload: request,
  };
};

export function logout() {
  const request = axios.get("/api/logout").then((response) => response.data);

  return {
    type: LOGOUT,
    payload: request,
  };
}

export const addToCart = (id) => {
  let body = {
    itemId: id,
  };
  const request = axios
    .post("api/addToCart", body)
    .then((response) => response.data);

  return {
    type: ADD_TO_CART,
    payload: request,
  };
};

export const getItem = (cartItems, userCart) => {
  const request = axios
    .get(`/api/itemsbyid?id=${cartItems}&type=array`)
    .then((response) => {
      userCart.forEach((userCartItem) => {
        response.data.forEach((responseData, index) => {
          if (userCartItem.id === responseData._id) {
            response.data[index].quantity = userCartItem.quantity;
          }
        });
      });
      return response.data;
    });

  return {
    type: GET_ITEM,
    payload: request,
  };
};

export function deleteItem(itemId) {
  const request = axios
    .get(`/api/deleteFromCart?id=${itemId}`)
    .then((response) => {
      response.data.cart.forEach((cartItem) => {
        response.data.itemInfo.forEach((item, index) => {
          if (cartItem.id === item._id) {
            response.data.itemInfo[index].quantity = item.quantity;
          }
        });
      });
      console.log(response.data);
      return response.data;
    });
  return {
    type: DELETE_ITEM,
    payload: request,
  };
}

export function purchase(data) {
  const request = axios
    .post("/api/purchase", data)
    .then((response) => response.data);

  return {
    type: PURCHASE,
    payload: request,
  };
}
