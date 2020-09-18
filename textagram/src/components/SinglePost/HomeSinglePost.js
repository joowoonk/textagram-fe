import React from "react";
import SinglePostView from "./SinglePostView";
import { useHistory } from "react-router-dom";
export default function HomeSinglePost({ show, setShow }) {
  const { goBack } = useHistory();

  return (
    <div className="single-page">
      <div
        className="go-back"
        onClick={() => {
          goBack();
        }}
      ></div>
      <div className="space"></div>
      <SinglePostView show={show} setShow={setShow} />
      <div
        className="go-back"
        onClick={() => {
          goBack();
        }}
      ></div>
    </div>
  );
}
