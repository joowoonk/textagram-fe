import React, { useState, Fragment } from "react";
import axios from "axios";
import "../styles/app.scss";
import { Modal, Button, Form } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { baseURL } from "../utils/config";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions";

function Register({ setShowReg, showReg, setShow }) {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const handleClose = () => {
    setShowReg(false);
  };

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newUser.email || !newUser.password || !newUser.username) {
      setErrorMsg("Email, Password & Username are required");
    } else {
      setIsLoggingIn(true);
      console.log({ newUser });
      axios
        .post(`${baseURL}/auth/register`, newUser)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          setIsLoggingIn(false);
          setErrorMsg("");
          push(`/posts`);
          dispatch(login());
        })
        .catch((err) => {
          console.log({ err });
          setIsLoggingIn(false);
          setErrorMsg("Email is already associated with an Artsy account.");
        });
    }
  };

  return (
    <Fragment>
      <Modal
        show={showReg}
        onHide={handleClose}
        centered
        size="sm"
        className="modal"
      >
        <Modal.Header closeButton className="header">
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Label>username</Form.Label>
            <Form.Control
              type="username"
              onChange={handleChange}
              value={newUser.username}
              name="username"
            />
            <Form.Text className="text-muted">
              Your username can include spaces, letters, numbers, punctuations
              and special characters.
            </Form.Text>
            <Form.Label>email</Form.Label>
            <Form.Control
              type="email"
              onChange={handleChange}
              value={newUser.email}
              name="email"
            />
            <Form.Label>password</Form.Label>
            <Form.Control
              type="password"
              onChange={handleChange}
              value={newUser.password}
              name="password"
            />
            {errorMsg ? (
              <Form.Text style={{ color: "red" }}>{errorMsg}</Form.Text>
            ) : null}
            <br />
            <Button
              block
              size="lg"
              className="btn"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              {isLoggingIn ? (
                <Loader type="ThreeDots" color="#fff" height={30} width={30} />
              ) : (
                "Get Started"
              )}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="footer">
          <p>
            Log in
            <a
              href="#"
              onClick={() => {
                setShowReg(false);
                setShow(true);
              }}
            >
              here
            </a>
            .
          </p>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default Register;
