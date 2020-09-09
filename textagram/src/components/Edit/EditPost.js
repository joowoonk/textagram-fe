import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUpVotesID } from "../../redux/actions/index";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { baseURL } from "../utils/config";
import { withRouter, useHistory, useParams } from "react-router-dom";
import decodedToken from "../utils/decodedToken";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import FeelingListModal from "../Upload/FeelingListModal";
import EditFeelingListModal from "./EditFeelingListModal";

export default function EditPost() {
  const dispatch = useDispatch();
  const match = useParams();
  console.log(match.postId);
  const { push } = useHistory();
  const [updatedPost, setUpdatedPost] = useState({
    title: "",
    context: "",
    hashtags: "",
    feeling: "",
  });
  const [userId, setUserId] = useState("");

  const admin = useSelector((state) => state.usersReducer.user.is_admin);

  const [messageTitle, setMessageTitle] = useState(false);
  const [messageHashTags, setMessageHashTags] = useState(false);
  const [messageContext, setMessageContext] = useState(false);

  const handleChange = (e) => {
    console.log({ e });
    setUpdatedPost({
      ...updatedPost,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(getUser());
    axiosWithAuth()
      .get(`${baseURL}/posts/${match.postId}`)
      .then((res) => {
        console.log(res);
        setUpdatedPost({
          title: res.data.post.title !== null ? res.data.post.title : "",
          hashtags:
            res.data.post.hashtags !== null ? `${res.data.post.hashtags}` : "",
          context:
            res.data.post.context !== null
              ? res.data.post.context.join("\n")
              : "",
          feeling: res.data.post.feeling !== null ? res.data.post.feeling : "",
        });
        setUserId(res.data.post.user_id);
      });
  }, [match.postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updatedPost.hashtags.split(" ").length > 5) {
      return setMessageHashTags(true);
    }
    if (updatedPost.title === "") {
      return setMessageTitle(true);
    }
    if (updatedPost.context === "") {
      return setMessageContext(true);
    }

    updatedPost.hashtags = updatedPost.hashtags.replace(",", " ");
    updatedPost.hashtags = updatedPost.hashtags.replace("#", "");
    updatedPost.hashtags = updatedPost.hashtags.replace(
      /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.#@£\/]/g,
      " "
    );
    updatedPost.hashtags = updatedPost.hashtags
      .replace(/#/g, "")
      .replace(/([^" "]+)/g, "#" + "$1");
    updatedPost.hashtags = updatedPost.hashtags.split(" ");
    updatedPost.hashtags = updatedPost.hashtags.filter((hash) => {
      return hash != "";
    });

    updatedPost.context = updatedPost.context.split("\n");

    axiosWithAuth()
      .put(`${baseURL}/posts/${match.postId}`, updatedPost)
      .then((res) => {
        console.log({ res });
        setMessageHashTags(false);
        dispatch(getUser());
        push(`/posts/${match.postId}`);
        setUpdatedPost({
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
            value={updatedPost.title}
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
        <EditFeelingListModal
          updatedPost={updatedPost}
          setUpdatedPost={setUpdatedPost}
        />
        <Form.Group controlId="formHashtags">
          <Form.Control
            placeholder="Add Up to 5 tags... eg: #Inpiration #Programming"
            name="hashtags"
            size="md"
            type="text"
            autoComplete="off"
            value={updatedPost.hashtags}
            onChange={handleChange}
            className="text-area hashtags-area no-border"
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
            value={updatedPost.context}
            autoComplete="off"
            onChange={handleChange}
            className="area text-area no-border"
          />
        </Form.Group>
      </Form>
      <div className="buttons">
        {admin || userId === decodedToken() ? (
          <Button
            block
            onClick={handleSubmit}
            className="submit"
            variant="info"
            type="submit"
          >
            Publish
          </Button>
        ) : (
          <Button
            block
            disabled={true}
            className="submit"
            variant="danger"
            type="submit"
          >
            THIS POST ISN'T YOURS!
          </Button>
        )}

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
