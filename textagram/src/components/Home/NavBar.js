import React, { useState } from "react";
import "../styles/app.scss";
import { Link, NavLink, withRouter } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import { BsFillPersonDashFill, BsFillPersonCheckFill } from "react-icons/bs";
import { GiExitDoor } from "react-icons/gi";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/index";

import { useHistory } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.usersReducer.login);
  const { push } = useHistory();
  console.log({ loginState });
  const signOut = () => {
    dispatch(logout());
    push("/");
  };

  return (
    <nav className="nav-bar">
      <Link to="/" className="title">
        Textagram
      </Link>

      <form className="nav-search">
        <input
          type="text"
          placeholder="Search by title or hashtag"
          className="search-input"
        />
        <button type="search">
          <IoIosSearch size="1.5em" style={{ color: "#000" }} />
        </button>
      </form>
      {localStorage.getItem("token") || loginState ? (
        <a className="nav-att" onClick={() => signOut()}>
          <GiExitDoor size="2.0em" />
        </a>
      ) : null}
      {localStorage.getItem("token") ? null : (
        <Nav.Link className="nav-att" href="/login">
          <BsFillPersonCheckFill size="2.0em" />
        </Nav.Link>
      )}
    </nav>
  );
};

export default NavBar;
