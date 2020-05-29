import { LOGIN, REGISTER } from "../_actions/actionTypes";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, loginSuccess: action.payload };
    case REGISTER:
      return { ...state, registerSuccess: action.payload };
    default:
      return state;
  }
}
