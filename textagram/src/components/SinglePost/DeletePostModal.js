import React, { useState } from "react";
import decodedToken from "../utils/decodedToken";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { baseURL } from "../utils/config";
import { Modal, Dropdown, Form, Button } from "react-bootstrap";

export default function DeletePostModal({ post_id }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deletePost = () => {
    axiosWithAuth()
      .delete(`${baseURL}/posts/${post_id}`)
      .then((res) => {
        window.location.href = "/page/1";
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
          <Modal.Title>Delete post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Text className="text-muted">
            Are you sure you want to proceed? This cannot be undone.
          </Form.Text>
        </Modal.Body>
        <Modal.Footer className="delete-mdl">
          <Button className="delete-btn" onClick={() => deletePost()}>
            Delete
          </Button>
          <Button onClick={handleClose} className="cancel-btn">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
