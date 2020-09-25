import {
  SET_SINGLE_POST_VIEW,
  SET_POST_VIEW,
  SET_ALL_THE_HASHTAGS,
} from "../actions/index";

const initialState = {
  post: {
    comments: [],
    context: [],
    hashtags: [],
    profile_picture:
      "https://static.wixstatic.com/media/4151a5_7706b6198d164a3e947f4548166228ad~mv2.png",
    votes: [],
  },
  posts: [],
  all_hashtags: [],
  isFetching: false,
  login: false,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_POST_VIEW:
      return {
        ...state,
        post: action.payload,
        // login: true,
      };
    case SET_POST_VIEW:
      return {
        ...state,
        posts: action.payload,
      };
    case SET_ALL_THE_HASHTAGS:
      let allHashtags = [];
      for (let i = 0; i < action.payload.length; i++) {
        for (let k = 0; k < action.payload[i].hashtags.length; k++) {
          allHashtags.push(action.payload[i].hashtags[k]);
        }
      }
      return {
        ...state,
        all_hashtags: allHashtags,
      };
    default:
      return state;
  }
};
