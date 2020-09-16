import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { baseURL } from "../utils/config";
import { Modal, Form, Button } from "react-bootstrap";

import decodedToken from "../utils/decodedToken";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/actions";
export default function UpdateProfileModal({ user_id }) {
  const [show, setShow] = useState(false);
  const { replace } = useHistory();
  const params = useParams();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const [updatedProfile, setUpdatedProfile] = useState({
    about: "",
    location: "",
  });
  const [followProfile, setFollowProfile] = useState({
    following: "",
    followers: "",
  });
  const [messageError, setMessageError] = useState(false);

  const handleChange = (e) => {
    setUpdatedProfile({
      ...updatedProfile,
      [e.target.name]: e.target.value,
    });
  };

  // console.log({ followProfile });

  useEffect(() => {
    axiosWithAuth()
      .get(`${baseURL}/users/${params.userId}`)
      .then((res) => {
        // console.log(res);
        setUpdatedProfile({
          about: res.data.user.about !== null ? res.data.user.about : "",
          location: res.data.user.about !== null ? res.data.user.location : "",
        });
        setFollowProfile({
          following:
            res.data.user.following !== null ? res.data.user.following : "",
          followers:
            res.data.user.follwers !== null ? res.data.user.follwers : "",
        });
      });
  }, [show]);

  const updateProfile = () => {
    if (
      updatedProfile.about.length > 150 ||
      updatedProfile.location.length > 30
    ) {
      return setMessageError(true);
    } else {
      axiosWithAuth()
        .put(`${baseURL}/users/${params.userId}`, updatedProfile)
        .then((res) => {
          setMessageError(false);
          dispatch(getUser());
          setUpdatedProfile({
            about: "",
            location: "",
          });
          setShow(false);
        })
        .catch((err) => {
          console.log({ err });
        });
    }
  };

  return (
    <>
      <Button onClick={handleShow} className="profile-edit" variant="info">
        Edit Profile
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="header">
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="edit-profile-form">
            <Form.Group controlId="formAbout">
              <Form.Label>About:</Form.Label>
              <Form.Control
                as="textarea"
                size="lg"
                type="text"
                style={{
                  fontSize: 15,
                  outlineOffset: "none",
                }}
                name="about"
                autoComplete="off"
                className="about-area"
                placeholder="Tell us about yourself"
                value={updatedProfile.about}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formAbout">
              <Form.Label>Location:</Form.Label>
              <Form.Control
                as="textarea"
                size="lg"
                type="text"
                style={{
                  fontSize: 15,
                  outlineOffset: "none",
                }}
                name="location"
                autoComplete="off"
                className="location-area"
                placeholder="City, State"
                value={updatedProfile.location}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="delete-mdl">
          <Button className="btn btn-success" onClick={() => updateProfile()}>
            Save
          </Button>
          <Button onClick={handleClose} className="btn btn-info">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
