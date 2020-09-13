import React from "react";
import { Image } from "react-bootstrap";
import moment from "moment";
const Comment = ({ comment, fake_id, profile_picture, id, created_at }) => {
  return (
    <div className="comment" key={id}>
      <div className="comment_user">
        <Image
          className="noselect image"
          roundedCircle
          src={profile_picture}
          style={{ height: "30px", width: "30px" }}
          alt={`user-id:${id}, profile picture`}
        />
        <div>
          <p>{fake_id}</p>
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
      </div>

      <p>{comment}</p>
    </div>
  );
};

export default Comment;
