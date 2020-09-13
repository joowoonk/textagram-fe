import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { baseURL } from "../utils/config";
export default function CommentUpload() {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState({
    comment: "",
  });
  const handleChange = (e) => {
    setNewComment({
      ...newComment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.comment === "" || newComment.comment.length === 0) {
      return;
    }

    axiosWithAuth()
      .post(`${baseURL}/comments`, newComment)
      .then((res) => {
        console.log({ res });
        setNewComment({
          comment: "",
        });
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return <div></div>;
}
