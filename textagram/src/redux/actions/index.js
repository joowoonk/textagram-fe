import axios from "axios";
import decodedToken from "../../components/utils/decodedToken";
import { baseURL } from "../../components/utils/config";

export const REMOVE_USER = "REMOVE_USER";
export const FETCH_USER = "FETCH_USER";
export const LOGIN_USER = "LOGIN_USER";
export const SET_USER_BOOKMARKS = "SET_USER_BOOKMARKS";
export const SET_ALL_THE_HASHTAGS = "SET_ALL_THE_HASHTAGS";
export const SET_SINGLE_POST_VIEW = "SET_SINGLE_POST_VIEW";
export const SET_BOOKMARKS_ID = "SET_BOOKMARKS_ID";
export const SET_POST_VIEW = "SET_POST_VIEW";
export const SET_USER_UP_VOTES = "SET_USER_UP_VOTES";
export const SET_UP_VOTES_ID = "SET_UP_VOTES_ID";
export const SET_USER_DOWN_VOTES = "SET_USER_DOWN_VOTES";
export const SET_DOWN_VOTES_ID = "SET_DOWN_VOTES_ID";

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: REMOVE_USER });
};

export const login = () => (dispatch) => {
  dispatch({ type: LOGIN_USER });
};

export const getPosts = () => (dispatch) => {
  axios
    .get(`${baseURL}/posts`)
    .then((res) => {
      // console.log(res);
      dispatch({ type: SET_POST_VIEW, payload: res.data.posts });
      dispatch({ type: SET_ALL_THE_HASHTAGS, payload: res.data.posts });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getPostById = (id) => (dispatch) => {
  axios
    .get(`${baseURL}/posts/${id}`)
    .then((res) => {
      dispatch({ type: SET_SINGLE_POST_VIEW, payload: res.data.post });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUser = () => (dispatch) => {
  if (decodedToken() !== undefined) {
    axios
      .get(`${baseURL}/users/${decodedToken()}`)
      .then((res) => {
        dispatch({ type: FETCH_USER, payload: res.data.user });
        dispatch({
          type: SET_USER_BOOKMARKS,
          payload: res.data.user.bookmarks,
        });
        dispatch({
          type: SET_USER_UP_VOTES,
          payload: res.data.user.upVotes,
        });
        dispatch({
          type: SET_USER_DOWN_VOTES,
          payload: res.data.user.downVotes,
        });
      })
      .catch((err) => {
        console.error({ err });
      });
  } else {
    dispatch({ type: REMOVE_USER });
  }
};

export const setBookmarksID = () => (dispatch) => {
  dispatch({ type: SET_BOOKMARKS_ID });
};

export const setUpVotesID = () => (dispatch) => {
  dispatch({ type: SET_UP_VOTES_ID });
};

export const setDownVotesID = () => (dispatch) => {
  dispatch({ type: SET_DOWN_VOTES_ID });
};
