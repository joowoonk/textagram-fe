import React from "react";
import { Nav } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import {
  BsPlusCircle,
  BsFillPersonLinesFill,
  BsFillBookmarksFill,
  BsHouse,
} from "react-icons/bs";
import decodedToken from "../utils/decodedToken";
export default function MobileNav({ setShow }) {
  return (
    <>
      {localStorage.getItem("token") ? (
        <nav className="mobile-nav">
          <Nav.Link href="/" className="nav-mobile-att">
            <BsHouse size="1.5em" /> {/* home */}
          </Nav.Link>
          <Nav.Link
            href={`/profile/${decodedToken()}`}
            className="nav-mobile-att"
          >
            <BsFillPersonLinesFill size="1.5em" /> {/* profile */}
          </Nav.Link>
          <Nav.Link href="/upload" className="nav-mobile-att center">
            <BsPlusCircle size="2em" /> {/* upload */}
          </Nav.Link>
          <Nav.Link href="/search/textagram" className="nav-mobile-att">
            <IoIosSearch size="1.5em" /> {/* search */}
          </Nav.Link>
          <Nav.Link href="/bookmarks" className="nav-mobile-att">
            <BsFillBookmarksFill size="1.5em" /> {/* bookmarks */}
          </Nav.Link>
        </nav>
      ) : (
        <nav className="mobile-nav">
          {" "}
          <Nav.Link href="/search/textagram" className="nav-mobile-att">
            <IoIosSearch size="2em" /> {/* search */}
          </Nav.Link>
        </nav>
      )}
    </>
  );
}
