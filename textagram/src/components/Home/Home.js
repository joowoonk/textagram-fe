import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseURL } from "../utils/config";
import { Card, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUser, setBookmarksID } from "../../redux/actions";
import { axiosWithAuth } from "../utils/axiosWithAuth";
const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const userBookmarks = useSelector(
    (state) => state.usersReducer.userBookmarks
  );
  const bookmarkPostId = useSelector(
    (state) => state.usersReducer.bookmarkPostId
  );
  useEffect(() => {
    dispatch(getUser());
    axios
      .get(`${baseURL}/posts`)
      .then((res) => {
        setPosts(res.data.posts);
      })

      .catch((err) => {
        console.error(err);
      });
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
              <i
                style={{ color: "lightgrey" }}
                class="fas fa-arrow-up like"
              ></i>
              {post.votes && post.votes.votes}
              <i
                style={{ color: "lightgrey" }}
                class="fas fa-arrow-down like"
              ></i>
              {bookmarkPostId && bookmarkPostId.includes(post.id) ? (
                <i class="fas fa-bookmark"></i>
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
