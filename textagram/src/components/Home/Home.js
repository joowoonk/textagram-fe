import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { baseURL } from "../utils/config";
import { Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  setBookmarksID,
  setUpVotesID,
  setDownVotesID,
  getPosts,
} from "../../redux/actions";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import Pagination from "./Pagination";
const Home = ({ show, setShow }) => {
  const params = useParams();

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.postReducer.posts);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(params.page);
  const [postsPerPage] = useState(10);
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    <>
      {currentPosts.map((post) => (
        <div key={post.id} className="cards card">
          <div className="card-top">
            <Image
              className="noselect"
              roundedCircle
              src={post.profile_picture}
              style={{ height: "25px", width: "25px", margin: "0 2%" }}
              alt={`user-id:${post.id}`}
            />
            <span className="noselect fake-id">{post.fake_id}</span>
            <div className="likes">
              {upVotesPostId && upVotesPostId.includes(post.id) ? (
                <i
                  onClick={() => {
                    cancelUpVotePost(post.id);
                  }}
                  style={{ color: "black" }}
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
              {post.votes}
              {downVotesPostId && downVotesPostId.includes(post.id) ? (
                <i
                  onClick={() => {
                    cancelDownVotePost(post.id);
                  }}
                  style={{ color: "black" }}
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
                  onClick={() => unbookmarkIt(post.id)}
                  className="fas fa-bookmark"
                ></i>
              ) : (
                <i
                  onClick={() => bookmarkIt(post.id)}
                  className="far fa-bookmark"
                ></i>
              )}
            </div>
          </div>
          <Link className="title" to={`/posts/detail/${post.id}`}>
            <div className="card-body body">
              <h2>
                {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
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
            <Link className="comment" to={`/posts/detail/${post.id}`}>
              <div className="card-body">{post.comments} comments</div>
            </Link>
          </Link>
        </div>
      ))}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </>
  );
};

export default Home;
