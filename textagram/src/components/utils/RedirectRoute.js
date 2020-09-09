import React from "react";
import { Route, Redirect } from "react-router-dom";

const RedirectRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <Redirect to="/page/1" />} />;
};

export default RedirectRoute;
