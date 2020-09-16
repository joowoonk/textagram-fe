import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../utils/config";
import { Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  getUser,
  setBookmarksID,
  setUpVotesID,
  setDownVotesID,
  getPosts,
} from "../../redux/actions";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import TopPosts from "./../Home/TopPosts";
const Bookmark = ({ show, setShow }) => {
  const dispatch = useDispatch();

  // Get current posts
  const userBookmarks = useSelector(
    (state) => state.usersReducer.userBookmarks
  );

  const bookmarkPostId = useSelector(
    (state) => state.usersReducer.bookmarkPostId
  );
  const userUpVotes = useSelector((state) => state.usersReducer.userUpVotes);

  const upVotesPostId = useSelector(
    (state) => state.usersReducer.upVotesPostId
  );

  const userDownVotes = useSelector(
    (state) => state.usersReducer.userDownVotes
  );
  const downVotesPostId = useSelector(
    (state) => state.usersReducer.downVotesPostId
  );
  useEffect(() => {
    dispatch(getUser());
  }, [show]);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(setBookmarksID());
    dispatch(setUpVotesID());
    dispatch(setDownVotesID());
  }, [userBookmarks, userUpVotes, userDownVotes, dispatch]);

  const bookmarkIt = (id) => {
    if (!localStorage.getItem("token")) {
      setShow(true);
    } else {
      axiosWithAuth()
        .post(`${baseURL}/posts/${id}/bookmark`)
        .then((res) => {
          dispatch(getUser());
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const unbookmarkIt = (id) => {
    axiosWithAuth()
      .delete(`${baseURL}/posts/${id}/unbookmark`)
      .then((res) => {
        dispatch(getUser());
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const upVotePost = (id) => {
    if (!localStorage.getItem("token")) {
      setShow(true);
    } else {
      axiosWithAuth()
        .post(`${baseURL}/posts/${id}/upvote`)
        .then((res) => {
          dispatch(getUser());
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const cancelUpVotePost = (id) => {
    if (!localStorage.getItem("token")) {
      setShow(true);
    } else {
      axiosWithAuth()
        .delete(`${baseURL}/posts/${id}/removeupvote`)
        .then((res) => {
          dispatch(getUser());
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const downVotePost = (id) => {
    if (!localStorage.getItem("token")) {
      setShow(true);
    } else {
      axiosWithAuth()
        .post(`${baseURL}/posts/${id}/downvote`)
        .then((res) => {
          dispatch(getUser());
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const cancelDownVotePost = (id) => {
    if (!localStorage.getItem("token")) {
      setShow(true);
    } else {
      axiosWithAuth()
        .delete(`${baseURL}/posts/${id}/removedownvote`)
        .then((res) => {
          dispatch(getUser());
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  function resetVotes(post_id) {
    if (downVotesPostId.includes(post_id)) {
      return cancelDownVotePost(post_id);
    } else if (upVotesPostId.includes(post_id)) {
      return cancelUpVotePost(post_id);
    }
  }

  return (
    <div className="posts">
      <div>
        <div className="notification-bookmark">
          <p>Other people won't be able to see what you bookmarked 👀</p>
        </div>
        {userBookmarks.length === 0 && (
          <div style={{ padding: "3%" }} className="card-posts">
            <p style={{ fontSize: "30px", textAlign: "center" }}>
              You have no bookmark yet!
            </p>
          </div>
        )}
        {userBookmarks.map((post) => {
          const votesColor = () => {
            if (post.votes.votes >= 0) {
              return "#000000";
            } else if (-5 <= post.votes.votes && post.votes.votes < 0) {
              return "#5E5E5E";
            } else if (-10 <= post.votes.votes && post.votes.votes < -5) {
              return "#8d8d8d";
            } else if (-15 <= post.votes.votes && post.votes.votes < -10) {
              return "#bcbcbc";
            } else if (-20 <= post.votes.votes && post.votes.votes < -15) {
              return "#ebebeb";
            } else {
              return "#white";
            }
          };
          return (
            <div key={post.id} className="cards card-posts">
              <div className="card-top">
                <div className="card-top-left-section">
                  <Image
                    className="noselect"
                    roundedCircle
                    src={post.profile_picture}
                    style={{ height: "25px", width: "25px", margin: "0 10px" }}
                    alt={`user-id:${post.id}`}
                  />
                  <div className="post-user">
                    <p className="noselect fake-id ">
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

                <div className="card-top-right-section">
                  {upVotesPostId && upVotesPostId.includes(post.id) ? (
                    <i
                      onClick={() => {
                        cancelUpVotePost(post.id);
                      }}
                      style={{ color: "green" }}
                      className="fas fa-arrow-up like"
                    ></i>
                  ) : (
                    <i
                      onClick={() => {
                        upVotePost(post.id);
                        resetVotes(post.id);
                      }}
                      style={{ color: "lightgrey" }}
                      className="fas fa-arrow-up like"
                    ></i>
                  )}
                  {post.votes.votes}
                  {downVotesPostId && downVotesPostId.includes(post.id) ? (
                    <i
                      onClick={() => {
                        cancelDownVotePost(post.id);
                      }}
                      style={{ color: "red" }}
                      className="fas fa-arrow-down like"
                    ></i>
                  ) : (
                    <i
                      onClick={() => {
                        downVotePost(post.id);
                        resetVotes(post.id);
                      }}
                      style={{ color: "lightgrey" }}
                      className="fas fa-arrow-down like"
                    ></i>
                  )}

                  {bookmarkPostId && bookmarkPostId.includes(post.id) ? (
                    <i
                      style={{
                        color: "#A4DE02",
                        marginRight: "10px",
                      }}
                      onClick={() => unbookmarkIt(post.id)}
                      className="fas fa-bookmark"
                    ></i>
                  ) : (
                    <i
                      style={{
                        marginRight: "10px",
                      }}
                      onClick={() => bookmarkIt(post.id)}
                      className="far fa-bookmark"
                    ></i>
                  )}
                </div>
              </div>
              <Link
                className="title"
                to={`/posts/${post.id}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                <div className="card-body body">
                  <h2
                    style={{ color: votesColor(), textTransform: "capitalize" }}
                  >
                    {post.title}
                  </h2>

                  <div className="hash-tags ">
                    {post.hashtags.map((hashtag) => {
                      return (
                        <>
                          {hashtag.length <= 25 ? (
                            <span className="hash-tag">{hashtag}</span>
                          ) : (
                            <span className="hash-tag">{`${hashtag.slice(
                              0,
                              25
                            )}...`}</span>
                          )}
                        </>
                      );
                    })}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <TopPosts />
    </div>
  );
};

export default Bookmark;
