import { SET_SINGLE_POST_VIEW } from "../actions/index";

const initialState = {
  post: {
    comments: [],
    total_votes: 0,
    up_votes: 0,
    hashtags: [],
    votes: { downVoted: [], upVoted: [], votes: 0 },
  },
  isFetching: false,
  login: false,
};

export const postReducer = (state = initialState, action) => {
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
