import React, { useEffect, useState } from "react";
import "../styles/app.scss";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import {
  BsFillPersonLinesFill,
  BsFillPersonCheckFill,
  BsFillBookmarksFill,
} from "react-icons/bs";

import { AiOutlineCloudUpload } from "react-icons/ai";
import { GiExitDoor } from "react-icons/gi";

import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../redux/actions/index";

const Navigation = ({ setShow }) => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.usersReducer.login);
  const [inputSearch, setInputSearch] = useState("");
  const { push } = useHistory();
  const signOut = () => {
    dispatch(logout());
    window.location.href = "/page/1";
  };
  const userId = useSelector((state) => state.usersReducer.user.id);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handleChange = (e) => {
    setInputSearch(e.target.value);
  };
  const submitSearch = (e) => {
    e.preventDefault();
    if (inputSearch === "") {
      push(`/search/""`);
    } else {
      push(`/search/${inputSearch}`);
      setInputSearch("");
    }
  };
  return (
    <Navbar id="top" className="nav-bar" sticky="top">
      <div className="nav-logo-search">
        <div
          onClick={() => {
            window.scrollTo(0, 0);
            window.location.href = "/page/1";
          }}
          className="logo"
        >
          Textagram
        </div>

        <form className="nav-search" onSubmit={(e) => submitSearch(e)}>
          <input
            type="text"
            value={inputSearch}
            onChange={handleChange}
            placeholder="Search by title"
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
            <Nav.Link className="nav-att" href={`/profile/${userId}`}>
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
      </div>{" "}
      {localStorage.getItem("token") || loginState ? (
        <>
          <Nav.Link className="mobile-top-logging" onClick={() => signOut()}>
            <GiExitDoor size="2.0em" />
          </Nav.Link>
        </>
      ) : null}
      {localStorage.getItem("token") ? null : (
        <>
          <Nav.Link
            className="mobile-top-logging"
            onClick={() => {
              setShow(true);
            }}
          >
            <BsFillPersonCheckFill size="2.0em" />
          </Nav.Link>
        </>
      )}
    </Navbar>
  );
};

export default Navigation;
