import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/actions/index";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { baseURL } from "../utils/config";
import { withRouter, useHistory } from "react-router-dom";
import decodedToken from "../utils/decodedToken";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import FeelingListModal from "./FeelingListModal";

export default function UploadForm() {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const [newPost, setNewPost] = useState({
    title: "",
    context: "",
    hashtags: "",
    feeling: "",
  });

  const [messageTitle, setMessageTitle] = useState(false);
  const [messageHashTags, setMessageHashTags] = useState(false);
  const [messageContext, setMessageContext] = useState(false);

  const handleChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPost.hashtags.split(" ").length > 5) {
      return setMessageHashTags(true);
    }
    if (newPost.title === "") {
      return setMessageTitle(true);
    }
    if (newPost.context === "") {
      return setMessageContext(true);
    }

    axiosWithAuth()
      .post(`${baseURL}/posts`, newPost)
      .then((res) => {
        console.log({ res });
        setMessageHashTags(false);
        dispatch(getUser());
        push(`/posts/${res.data.newPost.id}`);
        setNewPost({
          title: "",
          context: "",
          hashtags: "",
          feeling: "",
        });
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <>
      <Form className="card" onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Control
            size="lg"
            type="text"
            style={{
              fontSize: 50,
              border: "none",
              outline: "none",
              outlineOffset: "none",
            }}
            name="title"
            autoComplete="off"
            className="font-weight-bold title-area"
            placeholder="New post title here..."
            value={newPost.title}
            onChange={handleChange}
          />
        </Form.Group>
        {messageTitle && (
          <div
            style={{
              marginLeft: "10px",
              marginTop: "-30px",
              color: "red",
            }}
          >
            Title is missing!
          </div>
        )}
        <FeelingListModal newPost={newPost} setNewPost={setNewPost} />
        <Form.Group controlId="formHashtags">
          <Form.Control
            placeholder="Add Up to 5 tags... eg: #Inpiration #Programming"
            name="hashtags"
            size="md"
            type="text"
            autoComplete="off"
            value={newPost.hashtags}
            onChange={handleChange}
            className="text-area no-border"
          />
        </Form.Group>
        {messageHashTags && (
          <div
            style={{
              marginLeft: "10px",
              marginTop: "-30px",
              color: "red",
            }}
          >
            Hashtags should be up to 5 only!
          </div>
        )}
        <Form.Group controlId="formContext">
          {messageContext && (
            <div
              style={{
                marginLeft: "10px",
                color: "red",
              }}
            >
              Context is missing!
            </div>
          )}
          <Form.Control
            as="textarea"
            style={{ height: 500 }}
            placeholder="Would you like to shine a light to people who are lost for a bit?"
            name="context"
            value={newPost.context}
            autoComplete="off"
            onChange={handleChange}
            className="area text-area no-border"
          />
        </Form.Group>
      </Form>
      <div className="buttons">
        <Button
          block
          onClick={handleSubmit}
          className="submit"
          variant="info"
          type="submit"
        >
          Publish
        </Button>
        {/* <Button
        block
        disabled={true}
        className="submit"
        variant=""
        type="submit"
      >
        Preview
      </Button> */}
      </div>
    </>
  );
}
