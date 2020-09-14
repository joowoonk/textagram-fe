import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { baseURL } from "../utils/config";

export default function CommentUpload({ newComment, setNewComment, post_id }) {
  const dispatch = useDispatch();

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
      .post(`${baseURL}/comments/${post_id}`, newComment)
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
      <h3>What are your thoughts?</h3>
      <Form className="comment-text-area" onSubmit={handleSubmit}>
        <Form.Group controlId="formComment">
          <Form.Control
            as="textarea"
            placeholder="Add to the comment"
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
        <div className="button-area">
          <Button
            block
            onClick={handleSubmit}
            className="comment-post"
            variant="info"
            type="submit"
          >
            Post
          </Button>
        </div>
      </Form>
    </div>
  );
}
