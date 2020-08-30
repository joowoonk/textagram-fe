import React from "react";
import Login from "./components/Authentication/Login";
import { Route, withRouter } from "react-router-dom";
import Register from "./components/Authentication/Register";
import NavBar from "./components/Home/NavBar";
import Home from "./components/Home/Home";
import PrivateRoute from "./components/utils/PrivateRoute";
import SinglePostView from "./components/Home/SinglePostView";
function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/posts" component={Home} />
      <PrivateRoute exact path="/posts/:postId" component={SinglePostView} />
    </div>
  );
}

export default App;
