import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPostById,
  getUser,
  setBookmarksID,
  setUpVotesID,
  setDownVotesID,
} from "../../redux/actions";
import { Card, Image } from "react-bootstrap";
import { baseURL } from "../utils/config";
import Comment from "../Common/Comment";
import { axiosWithAuth } from "../utils/axiosWithAuth";
//ONCE the user click a post title, the post_id will be used for dispatch to this component as a new page.
const SinglePostView = (props) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postReducer.post);

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

  const user = useSelector((state) => state.usersReducer);

  useEffect(() => {
    dispatch(getPostById(props.match.params.postId));
  }, [dispatch, userBookmarks, props.match.params.postId]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
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
  return (
    <div key={post.id} className="single-post-view">
      <div className="card">
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
            {post.votes.votes}
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
                onClick={() => {
                  unbookmarkIt(post.id);
                }}
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
          <h2>{post.title}</h2>
          <div className="hash-tags ">
            {post.hashtags.map((hashtag, index) => {
              return (
                <>
                  {hashtag.length <= 25 ? (
                    <span key={index} className="hash-tag">
                      {hashtag}
                    </span>
                  ) : (
                    <span key={index} className="hash-tag">{`${hashtag.slice(
                      0,
                      25
                    )}...`}</span>
                  )}
                </>
              );
            })}
          </div>
          {post.context &&
            post.context.map((text) => {
              return <p className="single-post-context">{text}</p>;
            })}

          <p className="comments">{post.comments.length} Comments</p>
        </div>

        <input
          className="bottom-section"
          placeholder="Add a comment..."
        ></input>
      </div>
      {post.comments.length > 0 && (
        <div className="card">
          {post.comments.map((comment, index) => {
            return <Comment comment={comment} key={index} />;
          })}
        </div>
      )}
    </div>
  );
};

export default SinglePostView;
