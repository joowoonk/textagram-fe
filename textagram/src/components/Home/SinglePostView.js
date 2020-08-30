import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPostById } from "../../redux/actions";
import { Card, Image } from "react-bootstrap";
import { baseURL } from "../utils/config";
import Comment from "../Common/Comment";
//ONCE the user click a post title, the post_id will be used for dispatch to this component as a new page.
const SinglePostView = (props) => {
  console.log(props.match.params.postId);
  const post = useSelector((state) => state.postReducer.post);
  const dispatch = useDispatch();
  console.log({ post });
  useEffect(() => {
    dispatch(getPostById(props.match.params.postId));
  }, [props.match.params.postId]);
  console.log(typeof post.title);
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
            {post.likes}
            <i
              style={{ color: "lightgrey" }}
              className="fas fa-arrow-down like"
            ></i>
            <i className="far fa-bookmark"></i>
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
          <p className="single-post-context">{post.context}</p>
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
