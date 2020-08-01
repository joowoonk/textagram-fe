import React, { useState } from "react";
import "../styles/app.scss";
import { Link, NavLink, withRouter } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import { BsFillPersonDashFill, BsFillPersonCheckFill } from "react-icons/bs";

import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/index";

import { useHistory } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();

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
      {localStorage.getItem("token") ? (
        <a className="nav-att" onClick={() => signOut()}>
          <BsFillPersonDashFill size="2.0em" />
        </a>
      ) : (
        <Nav.Link className="nav-att" href="/login">
          <BsFillPersonCheckFill size="2.0em" />
        </Nav.Link>
      )}
    </nav>
  );
};

export default NavBar;
