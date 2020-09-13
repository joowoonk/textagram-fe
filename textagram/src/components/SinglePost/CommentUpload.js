import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { baseURL } from "../utils/config";

export default function CommentUpload({ post_id }) {
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
      .post(`${baseURL}/comments${post_id}`, newComment)
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

  return (
    <div className="comment-form">
      <Form className="comment-card" onSubmit={handleSubmit}>
        <Form.Group controlId="formComment">
          <Form.Group controlId="formHashtags">
            <Form.Control
              as="textarea"
              placeholder="What are your thoughts?"
              name="comment"
              size="md"
              type="text"
              wrap="hard"
              autoComplete="off"
              value={newComment.comment}
              onChange={handleChange}
              className="hash-area text-area no-border"
            />
          </Form.Group>
        </Form.Group>
      </Form>
    </div>
  );
}
