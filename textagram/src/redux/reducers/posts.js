import { SET_SINGLE_POST_VIEW } from "../actions/index";

const initialState = {
  post: {
    comments: [],
    total_votes: 0,
    up_votes: 0,
    hashtags: [],
  },
  isFetching: false,
  login: false,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_POST_VIEW:
      return {
        ...state,
        post: action.payload,
        login: true,
      };
    default:
      return state;
  }
};
