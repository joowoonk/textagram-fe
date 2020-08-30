import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseURL } from "../utils/config";
import { Card, Image } from "react-bootstrap";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/posts`)
      .then((res) => {
        setPosts(res.data.posts);
      })

      .catch((err) => {
        console.error(err);
      });
  }, []);

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
              {post.likes}
              <i
                style={{ color: "lightgrey" }}
                class="fas fa-arrow-down like"
              ></i>
              <i class="far fa-bookmark"></i>
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
