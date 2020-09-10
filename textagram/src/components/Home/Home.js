import React from "react";
import AllPostsView from "./AllPostsView";
import TopPosts from "./TopPosts";

const Home = ({ show, setShow }) => {
  return (
    <div>
      <AllPostsView show={show} setShow={setShow} />
    </div>
  );
};

export default Home;
