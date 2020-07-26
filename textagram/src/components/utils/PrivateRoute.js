import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("token")) {
          return <Component {...props} />;
        } else {
          // alert("You haven't logged in yet!");
          return <Redirect to="/Signin" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
