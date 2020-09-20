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
import Switch from "react-bootstrap/esm/Switch";
import Search from "./components/Home/Search";
import MobileNav from "./components/Home/MobileNav";

var dotenv = require("dotenv");

function App() {
  const [show, setShow] = useState(false);
  const [showReg, setShowReg] = useState(false);
  dotenv.config();

  return (
    <div className="App">
      <header>
        <Navigation show={show} setShow={setShow} />
        <MobileNav setShow={setShow} />
        <Login
          show={show}
          setShow={setShow}
          showReg={showReg}
          setShowReg={setShowReg}
        />
        <Register showReg={showReg} setShowReg={setShowReg} setShow={setShow} />
      </header>

      <RedirectRoute exact path="/" />
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
        <Search show={show} setShow={setShow} />
      </Route>
      <PrivateRoute path="/bookmarks/" component={Bookmark} />
      <PrivateRoute path="/edit/:postId" component={EditPost} />
      <PrivateRoute path="/upload" component={UploadForm} />
    </div>
  );
}

export default App;
