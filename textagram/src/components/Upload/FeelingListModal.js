import React, { useState } from "react";

import { Modal, Button } from "react-bootstrap";
import { feelings } from "./FeelingList";
export default function FeelingListModal({ newPost, setNewPost }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" className="feeling-modal" onClick={handleShow}>
        {newPost.feeling && `Mood: ${newPost.feeling}`}
        {!newPost.feeling && "Feeling"}
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
                  setNewPost({
                    ...newPost,
                    feeling: `${feeling.face} ${feeling.feeling}`,
                  });
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
