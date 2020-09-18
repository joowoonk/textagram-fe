import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { baseURL } from "../utils/config";
import { Link, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsSearch } from "react-icons/bs";
import {
  getPostById,
  getPosts,
  getUser,
  setBookmarksID,
  setUpVotesID,
  setDownVotesID,
} from "../../redux/actions";
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
      push(`search/${inputValue}`);
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
  console.log(searchResults);
  if (!searchResults) return <Loader />;

  return (
    <>
      <div className="search-page">
        <div className="search-results">
          <div className="search-posts">
            {searchResults.length > 0 ? (
              searchResults
                .map((post) => {
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
                    <div className="search">
                      <div key={post.id} className="search-card">
                        <div
                          style={{
                            borderBottom: "1px solid silver",
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
              <div
                className="notification"
                style={{
                  margin: "10px auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  width: "90%",
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
            )}
          </div>
          <TopPosts className="topPosts" />
        </div>
      </div>
    </>
  );
}
