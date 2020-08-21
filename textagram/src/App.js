import React from "react";
import Login from "./components/Authentication/Login";
import { Route, withRouter } from "react-router-dom";
import Register from "./components/Authentication/Register";
import NavBar from "./components/Home/NavBar";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
        <Home />
      </header>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </div>
  );
}

export default App;
