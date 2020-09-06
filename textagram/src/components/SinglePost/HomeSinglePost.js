import React from "react";
import SinglePostView from "./SinglePostView";
import { useParams, useHistory } from "react-router-dom";
export default function HomeSinglePost({ setShow }) {
  const { goBack } = useHistory();
  const params = useParams();
  //   console.log(history);
  console.log(params);
  return (
    <div className="single-page">
      <div
        className="go-back"
        onClick={() => {
          goBack();
        }}
      ></div>
      <div className="space"></div>
      <SinglePostView setShow={setShow} />
      <div
        className="hashtags"
        onClick={() => {
          goBack();
        }}
      ></div>
    </div>
  );
}
