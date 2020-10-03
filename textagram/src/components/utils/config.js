let baseURL;

const NODE_ENV = process.env.REACT_APP_FORCE_NODE_ENV || process.env.NODE_ENV;

if (NODE_ENV === "development") {
  baseURL = "http://localhost:4000/api";
} else if (NODE_ENV === "production") {
  baseURL = "https://textagram-be.herokuapp.com/api";
  //when heroku is deployed for api...
}

export { baseURL };
