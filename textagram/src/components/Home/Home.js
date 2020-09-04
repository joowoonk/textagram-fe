import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseURL } from "../utils/config";
import { Card, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  setBookmarksID,
  setUpVotesID,
  setDownVotesID,
  getPosts,
} from "../../redux/actions";
import { axiosWithAuth } from "../utils/axiosWithAuth";
const Home = (props) => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.postReducer.posts);
  // const [posts, setPosts] = useState(allPosts);
  console.log({ posts });
  const userBookmarks = useSelector(
    (state) => state.usersReducer.userBookmarks
  );
  const user = useSelector((state) => state.usersReducer);
  console.log({ user });
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
    dispatch(getPosts());
    dispatch(setBookmarksID());
    dispatch(setUpVotesID());
    dispatch(setDownVotesID());
  }, [userBookmarks, userUpVotes, userDownVotes, dispatch]);

  const bookmarkIt = (id) => {
    if (!localStorage.getItem("token")) {
      props.history.push("login");
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
      props.history.push("login");
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
      props.history.push("login");
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
      props.history.push("login");
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
      props.history.push("login");
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

  // console.log(posts);
  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="card">
          <div className="card-top">
            <Image
              roundedCircle
              src={post.profile_picture}
              style={{ height: "25px", width: "25px", margin: "0 2%" }}
              alt={`user-id:${post.id}`}
            />
            <span className="fake-id">{post.fake_id}</span>
            <div className="likes">
              {upVotesPostId && upVotesPostId.includes(post.id) ? (
                <i
                  onClick={() => {
                    cancelUpVotePost(post.id);
                  }}
                  style={{ color: "black" }}
                  class="fas fa-arrow-up like"
                ></i>
              ) : (
                <i
                  onClick={() => {
                    upVotePost(post.id);
                    resetVotes(post.id);
                  }}
                  style={{ color: "lightgrey" }}
                  class="fas fa-arrow-up like"
                ></i>
              )}
              {post.votes}
              {downVotesPostId && downVotesPostId.includes(post.id) ? (
                <i
                  onClick={() => {
                    cancelDownVotePost(post.id);
                  }}
                  style={{ color: "black" }}
                  class="fas fa-arrow-down like"
                ></i>
              ) : (
                <i
                  onClick={() => {
                    downVotePost(post.id);
                    resetVotes(post.id);
                  }}
                  style={{ color: "lightgrey" }}
                  class="fas fa-arrow-down like"
                ></i>
              )}

              {bookmarkPostId && bookmarkPostId.includes(post.id) ? (
                <i
                  onClick={() => unbookmarkIt(post.id)}
                  class="fas fa-bookmark"
                ></i>
              ) : (
                <i
                  onClick={() => bookmarkIt(post.id)}
                  className="far fa-bookmark"
                ></i>
              )}
            </div>
          </div>
          <div className="card-body body">
            <Link className="title" to={`/posts/${post.id}`}>
              <h2>
                {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
              </h2>
            </Link>
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
          <Link className="comment" to={`/posts/${post.id}`}>
            <div className="card-body">{post.comments} comments</div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Home;
