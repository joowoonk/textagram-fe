import axios from "axios";
// import decodedToken from "../components/utils/decodedToken";
// import { baseURL } from "../components/utils/config";

export const REMOVE_USER = "REMOVE_USER";

export const LOGIN_USER = "LOGIN_USER";

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: REMOVE_USER });
};

export const login = () => (dispatch) => {
  console.log("login");
  dispatch({ type: LOGIN_USER });
};
