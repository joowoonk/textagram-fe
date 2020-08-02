import { REMOVE_USER } from "../actions/index";

const initialState = {
  user: {
    id: "",
    posts: [],
    voting_counts: [], //how many votes this user has gotten
    followers: [], //this will diplay a user's following in a list.
  },
  post: {
    comments: [],
    total_votes: 0,
    up_votes: 0,
    down_votes: 0,
    hashtags: [],
  },
  friend: {
    posts: [],
    voting_counts: [], //how many votes this user has gotten
    followers: [], //this will diplay a user's following in a list.
  },
  isFetching: false,
  login: false,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER_START":
      return {
        ...state,
        isFetching: false,
        login: true,
      };
    case "LOGIN_USER_SUCCESS":
      return {
        ...state,
        user: action.payload,
        login: true,
      };
    case "LOGIN_USER_FAILURE":
      return {
        ...state,
        login: false,
      };
    case REMOVE_USER:
      return {
        ...state,
        login: false,
      };
    default:
      return state;
  }
};
