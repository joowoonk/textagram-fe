import React, { useState } from "react";
import decodedToken from "../utils/decodedToken";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useSelector, useDispatch } from "react-redux";
import { baseURL } from "../utils/config";
import { Modal, Dropdown, Form, Button } from "react-bootstrap";
import { feelings } from "../Upload/FeelingList";
export default function EditFeelingListModal({ updatedPost, setUpdatedPost }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" className="feeling-modal" onClick={handleShow}>
        {updatedPost.feeling && `Mood: ${updatedPost.feeling}`}
        {!updatedPost.feeling && "Feeling"}
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="header">
          <Modal.Title> How are you feeling?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="feeling-body">
          {feelings.map((feeling) => {
            return (
              <div
                onClick={() => {
                  setUpdatedPost({
                    ...updatedPost,
                    feeling: `${feeling.face} ${feeling.feeling}`,
                  });
                  return setShow(false);
                }}
                className="feeling"
                key={feeling.id}
              >
                {feeling.face} {feeling.feeling}
              </div>
            );
          })}
        </Modal.Body>
      </Modal>
    </>
  );
}
