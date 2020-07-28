import {} from "../actions/index";

const initialState = {
  user: {
    id: "",
    username: "",
    email: "",
    created_at: "",
    fake_id: "",
    location: "",
    profile_picture: "",
    about: "",
    is_admin: "",
  },
  posts: {
    id: "",
    posts: "",
    votes: "",
    hashtags: "",
  },
  vote_post: {
    id: "",
    post_id: "",
    user_id: "",
  },
  followers: {
    id: "",
    created_at: "",
    encourager_id: "",
    encouraged_id: "",
  },
  isFetching: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "setting":
      return {
        ...state,
        user: action.payload,
      };
  }
};

export default reducer;
