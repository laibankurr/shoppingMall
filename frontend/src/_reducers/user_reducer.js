import {
  LOGIN,
  REGISTER,
  AUTH_USER,
  ADD_TO_CART,
  GET_ITEM,
  DELETE_ITEM,
  PURCHASE,
  LOGOUT,
} from "../_actions/actionTypes";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, loginSuccess: action.payload };
    case REGISTER:
      return { ...state, registerSuccess: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT:
      return { ...state };
    case ADD_TO_CART:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload,
        },
      };
    case GET_ITEM:
      return { ...state, cartDetail: action.payload };
    case DELETE_ITEM:
      return {
        ...state,
        cartDetail: action.payload.itemInfo,
        userData: {
          ...state.userData,
          cart: action.payload.cart,
        },
      };
    case PURCHASE:
      return {
        ...state,
        cartDetail: action.payload.cartDetail,
        userData: {
          ...state.userData,
          cart: action.payload.cart,
        },
      };
    default:
      return state;
  }
}
