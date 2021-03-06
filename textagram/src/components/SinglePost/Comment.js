import React from "react";
import { Image, Dropdown } from "react-bootstrap";
import moment from "moment";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import decodedToken from "../utils/decodedToken";
import DeleteCommentModal from "./DeleteCommentModal";
const Comment = ({
  setNewComment,
  user_id,
  post_id,
  comment,
  fake_id,
  profile_picture,
  id,
  created_at,
}) => {
  const admin = useSelector((state) => state.usersReducer.user.is_admin);

  const { push } = useHistory();

  return (
    <>
      <div className="comment" key={id}>
        <div className="comment_user">
          <Image
            className="noselect image"
            roundedCircle
            onClick={() => push(`../profile/${user_id}`)}
            src={profile_picture}
            style={{ height: "25px", width: "25px", cursor: "pointer" }}
            alt={`user-id:${id}, profile picture`}
          />
          <div>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => {
                setNewComment({ comment: `@${fake_id} ` });
              }}
            >
              {fake_id}
            </p>
            <p
              style={{
                color: "gray",
                fontSize: "10px",
                textTransform: "uppercase",
              }}
            >
              {moment(created_at).fromNow()}
            </p>
          </div>
          <div className="setting">
            {(user_id === decodedToken() || admin) && (
              <Dropdown alignRight variant="info">
                <Dropdown.Toggle variant="none" id="dropdown-basic">
                  <BsThreeDots id="comment-post" size="1.2em" />
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: "30px" }}>
                  <DeleteCommentModal post_id={post_id} comment_id={id} />
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </div>

        {comment.map((comm, index) => (
          <p key={index} className="comments">
            {comm}
          </p>
        ))}
      </div>
    </>
  );
};

export default Comment;
