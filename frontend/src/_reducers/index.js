import { LOGIN, REGISTER, AUTHENTICATION } from "../_actions/actionTypes";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, loginSuccess: action.payload };
    case REGISTER:
      return { ...state, registerSuccess: action.payload };
    case AUTHENTICATION:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
}
