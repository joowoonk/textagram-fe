import React, { useState } from "react";
import Login from "./components/Authentication/Login";
import { Route } from "react-router-dom";
import Register from "./components/Authentication/Register";
import Navigation from "./components/Home/Navigation";
import "boxicons";

import PrivateRoute from "./components/utils/PrivateRoute";
import RedirectRoute from "./components/utils/RedirectRoute";
import HomeSinglePost from "./components/SinglePost/HomeSinglePost";
import UploadForm from "./components/Upload/UploadForm";
import EditPost from "./components/Edit/EditPost";
import AllPostsView from "./components/Home/AllPostsView";
import Bookmark from "./components/Bookmark/Bookmark";
import Profile from "./components/Profile/Profile";
import UpdateProfileModal from "./components/Profile/UpdateProfileModal";
import Switch from "react-bootstrap/esm/Switch";
import Search from "./components/Home/Search";

var dotenv = require("dotenv");

function App() {
  const [show, setShow] = useState(false);
  const [showReg, setShowReg] = useState(false);
  dotenv.config();

  return (
    <div className="App">
      <header>
        <Navigation show={show} setShow={setShow} />{" "}
        <Login
          show={show}
          setShow={setShow}
          showReg={showReg}
          setShowReg={setShowReg}
        />
        <Register showReg={showReg} setShowReg={setShowReg} setShow={setShow} />
      </header>
      <Switch>
        <RedirectRoute exact path="/"></RedirectRoute>
        <Route exact path="/page/:page">
          <AllPostsView show={show} setShow={setShow} />
        </Route>
        <Route exact path="/profile/:userId">
          <Profile show={show} setShow={setShow} />
        </Route>
        <Route exact path="/posts/:postId">
          <HomeSinglePost show={show} setShow={setShow} />
        </Route>
        <Route exact path="/search/:title">
          <Search />
        </Route>
        <PrivateRoute path="/bookmarks/">
          <Bookmark />
        </PrivateRoute>
        <PrivateRoute path="/edit/:postId">
          <EditPost />
        </PrivateRoute>
        <PrivateRoute path="/upload">
          <UploadForm />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
