import axios from "../../baseUrl";
import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAILED,
  USER_LOGOUT,
} from "../constants/userConstants";

export const userSignupAction = (user) => async (dispatch) => {
  try {
    const { username, email, password } = user;

    dispatch({ type: USER_SIGNUP_REQUEST });

    await axios({
      url: "/users/signup",
      data: { username, email, password },
      method: "POST",
    });

    dispatch({ type: USER_SIGNUP_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userSigninAction = (user) => async (dispatch, getState) => {
  try {
    const { emailUsername, password } = user;

    dispatch({ type: USER_SIGNIN_REQUEST });

    const { data } = await axios({
      url: "/users/signin",
      data: { emailUsername, password },
      method: "POST",
    });

    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

    localStorage.setItem(
      "CHAT_USER",
      JSON.stringify(getState().userLogin.user)
    );
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userLogoutAction = () => async (dispatch) => {
  localStorage.removeItem("CHAT_USER");
  dispatch({ type: USER_LOGOUT });
};
