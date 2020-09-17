import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { baseURL } from "../utils/config";
import { Modal, Form, Button, Image } from "react-bootstrap";
// import
import decodedToken from "../utils/decodedToken";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/actions";

export default function UpdateProfileModal({ profile_picture, user_id }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    about: "",
    location: "",
    profile_picture: "",
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
      .get(`${baseURL}/users/${user_id}`)
      .then((res) => {
        // console.log(res);
        setUpdatedProfile({
          about: res.data.user.about !== null ? res.data.user.about : "",
          location: res.data.user.about !== null ? res.data.user.location : "",
          profile_picture:
            res.data.user.profile_picture !== null
              ? res.data.user.profile_picture
              : "",
        });
        setFollowProfile({
          following:
            res.data.user.following !== null ? res.data.user.following : "",
          followers:
            res.data.user.followers !== null ? res.data.user.followers : "",
        });
      });
  }, [show]);

  const updateProfile = () => {
    axiosWithAuth()
      .put(`${baseURL}/users/${user_id}`, updatedProfile)
      .then((res) => {
        setMessageError(false);
        dispatch(getUser());
        setUpdatedProfile({
          about: "",
          location: "",
          profile_picture: "",
        });
        setShow(false);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "textagram");
    setLoading(true);

    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/image/upload`, {
      method: "POST",
      body: data,
    });

    const file = await res.json();
    setImage(file.secure_url);
    setUpdatedProfile({ ...updatedProfile, profile_picture: file.secure_url });
    setLoading(false);
  };
  // console.log(process.env.REACT_APP_BASE_URL);
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
            <Form.Group controlId="formPicture">
              <Form.Label
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  margin: "8px 0",
                }}
              >
                Profile Picture:
              </Form.Label>
              <div className="profile-picture-setting" style={{}}>
                <Image
                  roundedCircle
                  className="noselect image"
                  src={updatedProfile.profile_picture}
                  style={{ height: "100px", width: "100px" }}
                  alt={`existed profile picture`}
                />
                <Form.File
                  id="profile-picture"
                  label=""
                  onChange={uploadImage}
                />
              </div>
            </Form.Group>
            <Form.Group controlId="formAbout">
              <Form.Label
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  margin: "8px 0",
                }}
              >
                About:
              </Form.Label>
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
              <Form.Label
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  margin: "8px 0",
                }}
              >
                Location:
              </Form.Label>
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
