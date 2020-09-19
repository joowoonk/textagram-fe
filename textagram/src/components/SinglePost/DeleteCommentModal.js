import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { baseURL } from "../utils/config";
import { Modal, Dropdown, Form, Button } from "react-bootstrap";
import { getPostById } from "../../redux/actions";

export default function DeleteCommentModal({ post_id, comment_id }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const deletePost = () => {
    axiosWithAuth()
      .delete(`${baseURL}/comments/${comment_id}`)
      .then((res) => {
        dispatch(getPostById(post_id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Dropdown.Item onClick={handleShow}>Delete</Dropdown.Item>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="header">
          <Modal.Title>Delete Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Text className="text-muted" style={{ fontSize: "20px" }}>
            Are you sure you want to proceed? This cannot be undone.
          </Form.Text>
        </Modal.Body>
        <Modal.Footer className="delete-mdl">
          <Button
            className="btn btn-danger"
            onClick={() => {
              deletePost();
              handleClose();
            }}
          >
            Delete
          </Button>
          <Button onClick={handleClose} className="btn btn-success">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
