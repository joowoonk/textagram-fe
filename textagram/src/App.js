import React from "react";
import Login from "./components/Authentication/Login";
import { Route, withRouter } from "react-router-dom";
import Register from "./components/Authentication/Register";

function App() {
  return (
    <div className="App">
      <header>{/* NavBar TOP & BOTTOM SHOULD GO HERE */}</header>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <h1></h1>
    </div>
  );
}

export default App;
