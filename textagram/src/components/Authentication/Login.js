import React, { Fragment, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../styles/app.scss";

import Loader from "react-loader-spinner";
import { baseURL } from "../utils/config";

import { useDispatch } from "react-redux";
import { login } from "../../redux/actions";
import axios from "axios";
const Login = ({ show, setShow, showReg, setShowReg }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
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
          dispatch(login());
          setIsLoggingIn(false);
          setErrorMsg("");
          handleClose();
        })
        .catch((err) => {
          setErrorMsg(err.response.data.message);
          setIsLoggingIn(false);
        });
    }
  };
  return (
    <Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="modal"
        size="sm"
      >
        <Modal.Header closeButton className="header">
          <Modal.Title>Sign In</Modal.Title>
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
              <Form.Text style={{ color: "red" }}>{errorMsg}</Form.Text>
            ) : null}
          </Form>
        </Modal.Body>
        <div className="modal-footer">
          <Button
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
          Not a member? Sign up
          <span
            className="register-login"
            onClick={() => {
              setShow(false);
              setShowReg(true);
            }}
          >
            here
          </span>
          .
        </div>
      </Modal>
    </Fragment>
  );
};

export default Login;
