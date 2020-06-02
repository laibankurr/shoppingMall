import {
  LOGIN,
  REGISTER,
  AUTHENTICATION,
  ADDTOCART,
} from "../_actions/actionTypes";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, loginSuccess: action.payload };
    case REGISTER:
      return { ...state, registerSuccess: action.payload };
    case AUTHENTICATION:
      return { ...state, userInfo: action.payload };
    case ADDTOCART:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          cart: action.payload,
        },
      };
    default:
      return state;
  }
}
