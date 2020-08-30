import { usersReducer } from "./users";
import { postReducer } from "./posts";
import { combineReducers } from "redux";

export default combineReducers({
  usersReducer,
  postReducer,
});

// export default reducer;
