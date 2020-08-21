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
        <>
          <Card key={post.id} className="card">
            {post.hashtagging}
          </Card>
        </>
      ))}
    </>
  );
};

export default Home;
