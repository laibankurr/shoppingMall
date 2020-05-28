import { LOGIN } from "../_actions/actionTypes";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN:
      console.log(action.payload);
      return { ...state, loginSuccess: action.payload };
    default:
      return state;
  }
}
