import {} from "../actions/index";

const initialState = {
  user: {
    id: "",
    posts: [],
    voted_post: [],
    followers: [],
  },
  post: {
    comments: [],
  },
  isFetching: false,
  login: false,
};

const reducer = (state = initialState, action) => {
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
  }
};

export default reducer;
