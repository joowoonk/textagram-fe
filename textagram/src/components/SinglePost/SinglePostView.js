import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  getPostById,
  getUser,
  setBookmarksID,
  setUpVotesID,
  setDownVotesID,
  getPosts,
} from "../../redux/actions";
import moment from "moment";
import { Image, Dropdown } from "react-bootstrap";
import { baseURL } from "../utils/config";
import Comment from "./Comment";
import { BsThreeDots } from "react-icons/bs";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import decodedToken from "../utils/decodedToken";
import DeletePostModal from "./DeletePostModal";
import TopPosts from "../Home/TopPosts";
import CommentUpload from "./CommentUpload";
//ONCE the user click a post title, the post_id will be used for dispatch to this component as a new page.
const SinglePostView = ({ show, setShow }) => {
  const match = useParams();
  const { push } = useHistory();
  const [newComment, setNewComment] = useState({
    comment: "",
  });
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postReducer.post);

  const admin = useSelector((state) => state.usersReducer.user.is_admin);
  const userBookmarks = useSelector(
    (state) => state.usersReducer.userBookmarks
  );
  const bookmarkPostId = useSelector(
    (state) => state.usersReducer.bookmarkPostId
  );

  const userUpVotes = useSelector((state) => state.usersReducer.userUpVotes);
  const userDownVotes = useSelector(
    (state) => state.usersReducer.userDownVotes
  );
  const upVotesPostId = useSelector(
    (state) => state.usersReducer.upVotesPostId
  );

  const downVotesPostId = useSelector(
    (state) => state.usersReducer.downVotesPostId
  );

  useEffect(() => {
    dispatch(getPostById(match.postId));
  }, [dispatch, userBookmarks, match.postId]);

  useEffect(() => {
    dispatch(getUser());
    // dispatch(getPosts());
  }, [dispatch, show]);

  useEffect(() => {
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
      return "white";
    }
  };
  return (
    <div className="posts">
      <div>
        <div key={post.id} className="card card-posts">
          <div className="card-top">
            <div className="card-top-left-section">
              <Image
                className="noselect image"
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
                  {post.fake_id}
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
              <p className="vote-number">{post.votes.votes}</p>

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
                  style={{ color: "#A4DE02", marginRight: "2px" }}
                  onClick={() => {
                    unbookmarkIt(post.id);
                  }}
                  className="fas fa-bookmark"
                ></i>
              ) : (
                <i
                  style={{ marginRight: "2px" }}
                  onClick={() => bookmarkIt(post.id)}
                  className="far fa-bookmark"
                ></i>
              )}
              {(post.user_id === decodedToken() || admin) && (
                <Dropdown alignRight variant="info">
                  <Dropdown.Toggle variant="none" id="dropdown-basic">
                    <BsThreeDots size="1.2em" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      postid={post.id}
                      href={`/edit/${match.postId}`}
                    >
                      Edit
                    </Dropdown.Item>
                    <DeletePostModal post_id={post.id} />
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </div>
          <div className="card-body body">
            <h2
              style={{ color: `${votesColor()}`, textTransform: "capitalize" }}
            >
              {post.title}
            </h2>

            <div className="hash-tags ">
              {post.hashtags.map((hashtag, index) => {
                return (
                  <div key={index}>
                    {hashtag.length <= 25 ? (
                      <span className="hash-tag">{hashtag}</span>
                    ) : (
                      <span className="hash-tag">{`${hashtag.slice(
                        0,
                        25
                      )}...`}</span>
                    )}
                  </div>
                );
              })}
            </div>
            {post.context &&
              post.context.map((text, index) => {
                return (
                  <p
                    key={index}
                    style={{ color: votesColor(post.votes.votes) }}
                    className="single-post-context"
                  >
                    {text}
                  </p>
                );
              })}
          </div>
          <div className="card-body">{post.comments.length} comments</div>
        </div>

        <div className="comment-section" style={{ margin: "10px 0" }}>
          <CommentUpload
            newComment={newComment}
            setNewComment={setNewComment}
            post_id={post.id}
          />
          {post.comments.length > 0 ? (
            <>
              {post.comments.map((comment, index) => {
                // console.log(comment.id);
                return (
                  <div key={comment.id}>
                    <Comment
                      setNewComment={setNewComment}
                      user_id={comment.user_id}
                      comment={comment.comment}
                      id={comment.id}
                      fake_id={comment.fake_id}
                      profile_picture={comment.profile_picture}
                      created_at={comment.created_at}
                    />
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <h1
                style={{
                  backgroundColor: "white",
                  margin: "10px 0",
                  textAlign: "center",
                  padding: "3%",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setNewComment({ comment: `@${post.fake_id} ` });
                }}
              >
                No comments as of now! Would you like to leave a comment for{" "}
                <span style={{ fontWeight: "bold" }}>{post.fake_id}</span>?
              </h1>
            </>
          )}
        </div>
      </div>

      <TopPosts />
    </div>
  );
};

export default SinglePostView;
