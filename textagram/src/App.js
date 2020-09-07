import React, { useState } from "react";
import Login from "./components/Authentication/Login";
import { Route } from "react-router-dom";
import Register from "./components/Authentication/Register";
import NavBar from "./components/Home/NavBar";
import Home from "./components/Home/Home";
import PrivateRoute from "./components/utils/PrivateRoute";
import HomeSinglePost from "./components/SinglePost/HomeSinglePost";
import UploadForm from "./components/Upload/UploadForm";
function App() {
  const [show, setShow] = useState(false);
  const [showReg, setShowReg] = useState(false);

  return (
    <div className="App">
      <header>
        <NavBar show={show} setShow={setShow} />
      </header>
      <Route path="/">
        <Login
          show={show}
          setShow={setShow}
          showReg={showReg}
          setShowReg={setShowReg}
        />
      </Route>
      <Route path="/">
        <Register showReg={showReg} setShowReg={setShowReg} setShow={setShow} />
      </Route>
      <Route exact path="/posts/:page">
        <Home show={show} setShow={setShow} />
      </Route>
      <PrivateRoute exact path="/posts/detail/:postId">
        <HomeSinglePost setShow={setShow} />
      </PrivateRoute>
      <PrivateRoute exact path="/upload">
        <UploadForm />
      </PrivateRoute>
    </div>
  );
}

export default App;
