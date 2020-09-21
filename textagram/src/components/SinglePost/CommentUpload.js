import React from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPostById } from "../../redux/actions";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { baseURL } from "../utils/config";

export default function CommentUpload({
  newComment,
  setNewComment,
  post_id,
  setShow,
}) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setNewComment({
      ...newComment,
      [e.target.name]: e.target.value,
    });
  };
  useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) {
      setShow(true);
    } else if (newComment.comment === "" || newComment.comment.length === 0) {
      return;
    } else {
      axiosWithAuth()
        .post(`${baseURL}/comments/${post_id}`, newComment)
        .then((res) => {
          dispatch(getPostById(post_id));
          setNewComment({
            comment: "",
          });
        })
        .catch((err) => {
          console.log({ err });
        });
    }
  };

  return (
    <div className="comment-form">
      <h3>What are your thoughts?</h3>
      <Form className="comment-text-area" onSubmit={() => handleSubmit()}>
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
