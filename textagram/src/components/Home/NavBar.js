import React, { useState } from "react";
import "../styles/app.scss";
import { Link, NavLink, withRouter } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { IoIosPeople, IoIosSearch } from "react-icons/io";
import { BsFillPersonCheckFill } from "react-icons/bs";

const NavBar = () => {
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
      {localStorage.getItem("token") ? null : (
        <Nav.Link className="nav-att" href="/login">
          <BsFillPersonCheckFill size="2.0em" />
        </Nav.Link>
      )}
    </nav>
  );
};

export default NavBar;
