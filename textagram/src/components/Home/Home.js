import React, { useState, useEffect } from "react";
import axios from "axios";
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
  console.log(posts);
  // console.log(posts.hashtags);
  //   comments: 2
  // context: ""
  // created_at: ""
  // fake_id: ""
  // hashtags: "{"friendship","friends","bestFriend"}"
  // id: 6
  // likes: 0
  // profile_picture: "https://static.wixstatic.com/media/4151a5_7706b6198d164a3e947f4548166228ad~mv2.png"
  // title: "One best quote regarding a honest friendship"
  // user_id: 1

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
              {/* <i class="fas fa-bookmark"></i> */}
              <i class="far fa-bookmark"></i>
            </div>
          </div>
          <div className="card-body body">
            <h2>{post.title.charAt(0).toUpperCase() + post.title.slice(1)}</h2>
            <p>{post.context}</p>

            <div className="hash-tags ">
              <p className="hash-tag-title">Hashtags:</p>
              {post.hashtags.map((hashtag) => {
                return (
                  <span className="hash-tag" id="hashTag">
                    {hashtag.length <= 25 ? (
                      <span>{hashtag}</span>
                    ) : (
                      <span>{`${hashtag.slice(0, 25)}...`}</span>
                    )}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="bottom-section">
            <i class="far fa-comment icon"></i>
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
