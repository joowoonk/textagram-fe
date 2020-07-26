import React, { Fragment, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import Loader from "react-loader-spinner";
import { baseURL } from "../utils/config";
import { useHistory } from "react-router-dom";
import axios from "axios";
const Login = ({ props }) => {
  const [show, setShow] = useState(false);
  const [close, setClose] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const { push } = useHistory();

  const handleClose = () => {
    setShow(false);
    push("/");
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      setErrorMsg("Email and Password are required");
    } else {
      setIsLoggingIn(true);
      axios
        .post(`${baseURL}/auth/login`, user)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          console.log({ res });
          setIsLoggingIn(false);
          setErrorMsg("");
          handleClose();
          push(`/user/${res.data.user.id}/posts`);
        })
        .catch((err) => {
          //   console.log(err);
          setErrorMsg(err.response.data.message);
          setIsLoggingIn(false);
        });
    }
  };
  return (
    <Fragment>
      <div
        data-toggle="modal"
        data-target="#staticBackdrop"
        onClick={() => setShow(true)}
      >
        Sign In/Sign Up
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="modal"
        size="sm"
      >
        <Modal.Header closeButton className="header">
          Sign In
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Label>email</Form.Label>
            <Form.Control
              type="email"
              onChange={handleChange}
              value={user.email}
              name="email"
            />
            <Form.Label>password</Form.Label>
            <Form.Control
              type="password"
              onChange={handleChange}
              value={user.password}
              name="password"
            />
            {errorMsg ? (
              <Form.Text className="text-muted">{errorMsg}</Form.Text>
            ) : null}
          </Form>
        </Modal.Body>
        <div className="modal-footer">
          <Button
            type="button"
            className="btn btn-primary"
            block
            size="lg"
            // data-dismiss={close}
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            {isLoggingIn ? (
              <Loader type="ThreeDots" color="#fff" height={30} width={30} />
            ) : (
              "Log In"
            )}
          </Button>
        </div>
        <div className="modal-footer">
          Not a member? Sign up<a href="/register">here</a>.
        </div>
      </Modal>
    </Fragment>
  );
};

export default Login;
