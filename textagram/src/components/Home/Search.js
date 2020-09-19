import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { IoIosSearch } from "react-icons/io";
import { baseURL } from "../utils/config";
import { Link, useHistory, useParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

import moment from "moment";
import { Image } from "react-bootstrap";
import TopPosts from "./TopPosts";
export default function Search({ show, setShow }) {
  const [searchResults, setSearchResults] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const match = useParams();
  const { push } = useHistory();
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const submitSearch = () => {
    if (inputValue !== "") {
      push(`../search/${inputValue}`);
    } else {
      push(`search`);
    }
  };

  useEffect(() => {
    axiosWithAuth()
      .get(`${baseURL}/posts/search/${match.title}`)
      .then((res) => {
        setSearchResults(res.data.posts);
        setInputValue("");
      })
      .catch((err) => {
        console.error(err);
      });
  }, [match.title]);

  if (!searchResults)
    return (
      <div
        className="loading"
        style={{
          margin: "100px auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Loader
          className="loading"
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
        />
      </div>
    );

  return (
    <>
      {" "}
      <form onSubmit={submitSearch} className="mobile-search">
        <input
          type="text"
          placeholder="Search for titles"
          className="search-input"
          value={inputValue}
          onChange={handleChange}
        />

        <button type="search" style={{ padding: "5px", color: "gray" }}>
          <IoIosSearch size="1.5em" />
        </button>
      </form>
      <div className="search-page">
        <div className="search-results">
          <div className="search-posts">
            {searchResults.length > 0 ? (
              searchResults
                .map((post, index) => {
                  const votesColor = () => {
                    if (post.votes >= 0) {
                      return "#000000";
                    } else if (-5 <= post.votes && post.votes < 0) {
                      return "#5E5E5E";
                    } else if (-10 <= post.votes && post.votes < -5) {
                      return "#8d8d8d";
                    } else if (-15 <= post.votes && post.votes < -10) {
                      return "#bcbcbc";
                    } else if (-20 <= post.votes && post.votes < -15) {
                      return "#ebebeb";
                    } else {
                      return "#white";
                    }
                  };
                  return (
                    <div className="search" key={post.id}>
                      <div className="search-card">
                        <div
                          style={{
                            borderBottom: "2px solid #e9ecef",
                          }}
                        >
                          <div className="card-top-left-section">
                            <Image
                              className="noselect"
                              roundedCircle
                              src={post.profile_picture}
                              style={{
                                height: "25px",
                                width: "25px",
                                margin: "0 10px",
                                cursor: "pointer",
                              }}
                              alt={`user-id:${post.id}`}
                              onClick={() => {
                                push(`../profile/${post.user_id}`);
                              }}
                            />
                            <div className="post-user">
                              <p
                                className="noselect fake-id"
                                onClick={() => {
                                  push(`../profile/${post.user_id}`);
                                }}
                              >
                                {post.fake_id}{" "}
                                {post.feeling && `is feeling ${post.feeling}.`}
                              </p>
                              <p
                                style={{
                                  color: "gray",
                                  fontSize: "10px",
                                  textTransform: "uppercase",
                                  margin: 0,
                                }}
                              >
                                {moment(post.created_at).fromNow()}
                              </p>
                            </div>
                          </div>
                        </div>

                        <Link
                          className="title"
                          to={`/posts/${post.id}`}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          <div>
                            <h2
                              style={{
                                color: votesColor(),
                                textTransform: "capitalize",
                              }}
                            >
                              {post.title}
                            </h2>
                          </div>

                          <div style={{ margin: "3px 10px" }}>
                            {post.comments} comments
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                })
                .reverse()
            ) : (
              <>
                <div
                  className="notification"
                  style={{
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1.2rem",
                    width: "80%",
                    padding: "20px",
                    backgroundColor: "white",
                  }}
                >
                  <BsSearch size="2em" style={{ margin: "10px auto" }} />
                  <p>
                    There are no results with{""}
                    <span style={{ fontWeight: "bold" }}>"{match.title}"</span>.
                    Please try a new search.
                  </p>
                </div>
              </>
            )}
          </div>
          <TopPosts className="topPosts" />
        </div>
      </div>
    </>
  );
}
