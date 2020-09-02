import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPostById, getUser, setBookmarksID } from "../../redux/actions";
import { Card, Image } from "react-bootstrap";
import { baseURL } from "../utils/config";
import Comment from "../Common/Comment";
import { axiosWithAuth } from "../utils/axiosWithAuth";
//ONCE the user click a post title, the post_id will be used for dispatch to this component as a new page.
const SinglePostView = (props) => {
  // console.log(props.match.params.postId);
  const post = useSelector((state) => state.postReducer.post);
  const userBookmarks = useSelector(
    (state) => state.usersReducer.userBookmarks
  );
  const bookmarkPostId = useSelector(
    (state) => state.usersReducer.bookmarkPostId
  );
  const user = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  // console.log({ post });
  useEffect(() => {
    dispatch(getPostById(props.match.params.postId));
  }, [dispatch, userBookmarks, props.match.params.postId]);

  console.log({ user });
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setBookmarksID());
  }, [userBookmarks, dispatch]);

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

  // console.log(post);
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
            <i
              style={{ color: "lightgrey" }}
              className="fas fa-arrow-up like"
            ></i>
            {post.votes && post.votes.votes}
            <i
              style={{ color: "lightgrey" }}
              className="fas fa-arrow-down like"
            ></i>
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
