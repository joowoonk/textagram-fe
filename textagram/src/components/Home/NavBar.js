import React from "react";
import "../styles/app.scss";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import {
  BsFillPersonLinesFill,
  BsFillPersonCheckFill,
  BsFillBookmarksFill,
} from "react-icons/bs";

import { AiOutlineCloudUpload } from "react-icons/ai";
import { GiExitDoor } from "react-icons/gi";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/index";

const NavBar = ({ setShow, params }) => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.usersReducer.login);

  const signOut = () => {
    dispatch(logout());
    window.location.href = "/posts/1";
  };

  return (
    <nav className="nav-bar">
      <div className="nav-logo-search">
        <Link
          onClick={() => (window.location.href = "/posts/1")}
          className="logo"
        >
          Textagram
        </Link>

        <form className="nav-search">
          <input
            type="text"
            placeholder="Search by title or hashtag"
            className="search-input"
          />
          <button type="search">
            <IoIosSearch
              size="1.5em"
              style={{ color: "#000", backgroundColor: "#f5f5f5" }}
            />
          </button>
        </form>
      </div>
      <div className="nav-icons">
        {localStorage.getItem("token") || loginState ? (
          <>
            <Nav.Link className="nav-att" href="/upload">
              <AiOutlineCloudUpload size="2.0em" />
            </Nav.Link>
            <Nav.Link className="nav-att" href="/bookmarks">
              <BsFillBookmarksFill size="1.5em" />
            </Nav.Link>
            <Nav.Link className="nav-att" href="/profile">
              <BsFillPersonLinesFill size="2.0em" />
            </Nav.Link>
            <Nav.Link className="nav-att" onClick={() => signOut()}>
              <GiExitDoor size="2.0em" />
            </Nav.Link>
          </>
        ) : null}
        {localStorage.getItem("token") ? null : (
          <>
            <Nav.Link
              className="nav-att"
              onClick={() => {
                setShow(true);
              }}
            >
              <BsFillPersonCheckFill size="2.0em" />
            </Nav.Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
