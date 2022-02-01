import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGOUT,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

export const register = (formData) => async (dispatch) => {
  try {
    const header = {
      "Content-Type": "application/json",
    };
    const res = await axios.post("/api/users", formData, header);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser(res.data.token));
  } catch (err) {
    if (err) {
      setAlert("E-mail or password is not correct", "danger");
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
export const login = (formData) => async (dispatch) => {
  const { email, password } = formData;
  try {
    const header = {
      "Content-Type": "application/json",
    };
    const res = await axios.post("/api/auth", { email, password }, header);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser(res.data.token));
  } catch (err) {
    if (err) {
      console.log(err);
      dispatch(setAlert("E-mail or password is not correct", "danger"));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const loadUser = (token) => async (dispatch) => {
  setAuthToken(token);
  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
