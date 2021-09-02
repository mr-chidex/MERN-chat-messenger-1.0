import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAILED,
  USER_LOGOUT,
} from "../constants/userConstants";

export const userReducer = (
  state = {
    user: localStorage.getItem("CHAT_USER")
      ? JSON.parse(localStorage.getItem("CHAT_USER"))
      : null,
  },
  action
) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_SIGNIN_FAILED:
      return { loading: false, error: true, message: action.payload };
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return {
        loading: false,
        success: true,
        message: "successsfully signed up",
      };
    case USER_SIGNUP_FAILED:
      return { loading: false, error: true, message: action.payload };
    case USER_LOGOUT:
      return { loading: false, user: action.payload };
    default:
      return state;
  }
};
