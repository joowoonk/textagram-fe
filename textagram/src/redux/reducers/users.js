import {
  REMOVE_USER,
  LOGIN_USER,
  FETCH_USER,
  SET_USER_BOOKMARKS,
  SET_BOOKMARKS_ID,
  SET_UP_VOTES_ID,
  SET_USER_UP_VOTES,
  SET_USER_DOWN_VOTES,
  SET_DOWN_VOTES_ID,
  SET_USER_FOLLOWING,
  SET_FOLLOWING_ID,
  SET_USER_FOLLOWERS,
  SET_FOLLOWERS_ID,
} from "../actions/index";

const initialState = {
  user: {
    id: "",
    posts: [],
    voting_counts: [], //how many votes this user has gotten
    // followers: [], //being follwered.
    // followering: [], //this will diplay a user's following in a list.
    bookmarks: [],
  },
  userBookmarks: [],
  favTexterIds: [],

  following: [],
  followers: [],
  followingId: [],
  followerId: [],

  userUpVotes: [],
  userDownVotes: [],

  isFetching: false,
  login: false,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: action.payload,
        login: true,
      };
    case SET_USER_BOOKMARKS:
      return {
        ...state,
        userBookmarks: action.payload,
      };
    case SET_BOOKMARKS_ID:
      return {
        ...state,
        bookmarkPostId: state.userBookmarks.map((favs) => {
          return favs.id;
        }),
      };
    case SET_USER_FOLLOWING:
      return {
        ...state,
        following: action.payload,
      };
    case SET_FOLLOWING_ID:
      return {
        ...state,
        followingId: state.following.map((follow) => {
          return follow.id;
        }),
      };
    case SET_USER_FOLLOWERS:
      return {
        ...state,
        followers: action.payload,
      };
    case SET_FOLLOWERS_ID:
      console.log(state);
      return {
        ...state,
        followerId: state.followers.map((follower) => {
          return follower.id;
        }),
      };

    case SET_USER_UP_VOTES:
      return {
        ...state,
        userUpVotes: action.payload,
      };
    case SET_UP_VOTES_ID:
      return {
        ...state,
        upVotesPostId: state.userUpVotes.map((favs) => {
          return favs.id;
        }),
      };

    case SET_USER_DOWN_VOTES:
      return {
        ...state,
        userDownVotes: action.payload,
      };
    case SET_DOWN_VOTES_ID:
      return {
        ...state,
        downVotesPostId: state.userDownVotes.map((favs) => {
          return favs.id;
        }),
      };
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
    case LOGIN_USER:
      return {
        ...state,
        login: true,
      };
    default:
      return state;
  }
};
