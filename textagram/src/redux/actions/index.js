import axios from "axios";
import decodedToken from "../../components/utils/decodedToken";
import { baseURL } from "../../components/utils/config";

export const REMOVE_USER = "REMOVE_USER";

export const LOGIN_USER = "LOGIN_USER";
export const SET_SINGLE_POST_VIEW = "SET_SINGLE_POST_VIEW";

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: REMOVE_USER });
};

export const login = () => (dispatch) => {
  console.log("login");
  dispatch({ type: LOGIN_USER });
};

export const getPostById = (id) => (dispatch) => {
  axios
    .get(`${baseURL}/posts/${id}`)
    .then((res) => {
      console.log(res);
      dispatch({ type: SET_SINGLE_POST_VIEW, payload: res.data.post });
    })
    .catch((err) => {
      console.log(err);
    });
};
