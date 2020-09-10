import React, { useState } from "react";
import Login from "./components/Authentication/Login";
import { Route } from "react-router-dom";
import Register from "./components/Authentication/Register";
import NavBar from "./components/Home/NavBar";
import Home from "./components/Home/Home";
import PrivateRoute from "./components/utils/PrivateRoute";
import RedirectRoute from "./components/utils/RedirectRoute";
import HomeSinglePost from "./components/SinglePost/HomeSinglePost";
import UploadForm from "./components/Upload/UploadForm";
import EditPost from "./components/Edit/EditPost";
import AllPostsView from "./components/Home/AllPostsView";

function App() {
  const [show, setShow] = useState(false);
  const [showReg, setShowReg] = useState(false);

  return (
    <div className="App">
      <header>
        <NavBar show={show} setShow={setShow} />
      </header>
      <Login
        show={show}
        setShow={setShow}
        showReg={showReg}
        setShowReg={setShowReg}
      />
      <Register showReg={showReg} setShowReg={setShowReg} setShow={setShow} />

      <RedirectRoute exact path="/"></RedirectRoute>
      <Route exact path="/page/:page">
        <Home />
      </Route>
      <PrivateRoute exact path="/posts/:postId">
        <HomeSinglePost show={show} setShow={setShow} />
      </PrivateRoute>
      <PrivateRoute exact path="/edit/:postId">
        <EditPost />
      </PrivateRoute>
      <PrivateRoute exact path="/upload">
        <UploadForm />
      </PrivateRoute>
      <PrivateRoute exact path="/profiles/:userId"></PrivateRoute>
    </div>
  );
}

export default App;
