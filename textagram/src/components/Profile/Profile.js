import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import decodedToken from "../utils/decodedToken";
import {
  getPosts,
  getUser,
  setBookmarksID,
  setDownVotesID,
  setUpVotesID,
} from "../../redux/actions";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { baseURL } from "../utils/config";
import moment from "moment";
import { Image, Dropdown } from "react-bootstrap";
const Profile = ({ show, setShow }) => {
  const [userInfo, setUserInfo] = useState([]);

  const admin = useSelector((state) => state.usersReducer.user.is_admin);
  const user_id = useSelector((state) => state.usersReducer.user.id);
  console.log(`${userInfo.id} === ${decodedToken()}`);
  // console.log(decodedToken());
  const dispatch = useDispatch();
  const { push } = useHistory();
  const match = useParams();
  console.log({ userInfo });
  const userBookmarks = useSelector(
    (state) => state.usersReducer.userBookmarks
  );
  const bookmarkPostId = useSelector(
    (state) => state.usersReducer.bookmarkPostId
  );
  const userUpVotes = useSelector((state) => state.usersReducer.userUpVotes);

  const upVotesPostId = useSelector(
    (state) => state.usersReducer.upVotesPostId
  );

  const userDownVotes = useSelector(
    (state) => state.usersReducer.userDownVotes
  );
  const downVotesPostId = useSelector(
    (state) => state.usersReducer.downVotesPostId
  );
  useEffect(() => {
    // dispatch(getUser());
    // dispatch(getPosts());
    dispatch(setBookmarksID());
    dispatch(setUpVotesID());
    dispatch(setDownVotesID());
    axiosWithAuth()
      .get(`${baseURL}/users/${match.userId}`)
      .then((res) => {
        setUserInfo(res.data.user);
      });
  }, [userBookmarks, userUpVotes, userDownVotes, dispatch]);
  const bookmarkIt = (id) => {
    if (!localStorage.getItem("token")) {
      setShow(true);
    } else {
      axiosWithAuth()
        .post(`${baseURL}/posts/${id}/bookmark`)
        .then((res) => {
          dispatch(getUser());
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const unbookmarkIt = (id) => {
    axiosWithAuth()
      .delete(`${baseURL}/posts/${id}/unbookmark`)
      .then((res) => {
        dispatch(getUser());
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const upVotePost = (id) => {
    if (!localStorage.getItem("token")) {
      setShow(true);
    } else {
      axiosWithAuth()
        .post(`${baseURL}/posts/${id}/upvote`)
        .then((res) => {
          dispatch(getUser());
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const cancelUpVotePost = (id) => {
    if (!localStorage.getItem("token")) {
      setShow(true);
    } else {
      axiosWithAuth()
        .delete(`${baseURL}/posts/${id}/removeupvote`)
        .then((res) => {
          dispatch(getUser());
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const downVotePost = (id) => {
    if (!localStorage.getItem("token")) {
      setShow(true);
    } else {
      axiosWithAuth()
        .post(`${baseURL}/posts/${id}/downvote`)
        .then((res) => {
          dispatch(getUser());
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const cancelDownVotePost = (id) => {
    if (!localStorage.getItem("token")) {
      setShow(true);
    } else {
      axiosWithAuth()
        .delete(`${baseURL}/posts/${id}/removedownvote`)
        .then((res) => {
          dispatch(getUser());
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  function resetVotes(post_id) {
    if (downVotesPostId.includes(post_id)) {
      return cancelDownVotePost(post_id);
    } else if (upVotesPostId.includes(post_id)) {
      return cancelUpVotePost(post_id);
    }
  }
  return (
    <>
      <div className="profile">
        <div className="image-profile-top-section">
          <Image
            className="noselect image"
            roundedCircle
            src={userInfo.profile_picture}
            style={{ height: "100px", width: "100px" }}
            alt={`user-id:${match.userId}, profile picture`}
          />
        </div>
        <div className="user-information">
          <h2>{userInfo.fake_id}</h2>

          <p>"{userInfo.about}"</p>

          {userInfo.posts && userInfo.posts.length > 0 ? (
            <p>{userInfo.posts.length} post(s)</p>
          ) : (
            <p>0 post(s)</p>
          )}
          <div className="follow-list">
            {userInfo.follwing && userInfo.follwing.length > 0 ? (
              <p>follwing:{userInfo.follwing.length}</p>
            ) : (
              <p>0 following</p>
            )}
            {userInfo.follwers && userInfo.follwers.length > 0 ? (
              <p>followers:{userInfo.follwers.length}</p>
            ) : (
              <p>0 followers</p>
            )}
          </div>
          <div className="user-detail">
            <p>
              <i class="fas fa-birthday-cake"></i> Joined on{" "}
              {moment(userInfo.created_at).format("MM/DD/YYYY")}
            </p>
            {userInfo.location ? (
              <p>
                <i class="fas fa-map-marker-alt">{userInfo.location}</i>
              </p>
            ) : (
              <p>
                <i class="fas fa-map-marker-alt"></i> City, State
              </p>
            )}
          </div>
          {userInfo.id === decodedToken() || admin ? (
            <Button className="profile-edit" variant="info">
              Edit Profile
            </Button>
          ) : (
            <Button disabled className="profile-edit" variant="info">
              Edit Profile
            </Button>
          )}
        </div>
      </div>
      <div>
        {userInfo.posts &&
          userInfo.posts.map((post) => {
            const votesColor = () => {
              if (post.votes >= 0) {
                return "#000000";
              } else if (-5 <= post.votes && post.votes < 0) {
                return "#5E5E5E";
              } else if (-10 <= post.votes && post.votes < -5) {
                return "#8d8d8d";
              } else if (-15 <= post.votes && post.votes < -10) {
                return "#bcbcbc";
              } else if (-20 <= post.votes && post.votes < -15) {
                return "#ebebeb";
              } else {
                return "#white";
              }
            };
            return (
              <div key={post.id} className="cards card-posts card-profile">
                <div className="card-top">
                  <div className="card-top-left-section">
                    <Image
                      className="noselect"
                      roundedCircle
                      src={userInfo.profile_picture}
                      style={{
                        height: "25px",
                        width: "25px",
                        margin: "0 10px",
                      }}
                      alt={`user-id:${post.id}`}
                    />
                    <div className="post-user">
                      <p
                        className="noselect fake-id"
                        onClick={() => {
                          push(`../profile/${post.user_id}`);
                        }}
                      >
                        {userInfo.fake_id}{" "}
                        {post.feeling && `is feeling ${post.feeling}.`}
                      </p>
                      <p
                        style={{
                          color: "gray",
                          fontSize: "10px",
                          textTransform: "uppercase",
                          margin: 0,
                        }}
                      >
                        {moment(post.created_at).fromNow()}
                      </p>
                    </div>
                  </div>

                  <div className="card-top-right-section">
                    {upVotesPostId && upVotesPostId.includes(post.id) ? (
                      <i
                        onClick={() => {
                          cancelUpVotePost(post.id);
                        }}
                        style={{ color: "green" }}
                        className="fas fa-arrow-up like"
                      ></i>
                    ) : (
                      <i
                        onClick={() => {
                          upVotePost(post.id);
                          resetVotes(post.id);
                        }}
                        style={{ color: "lightgrey" }}
                        className="fas fa-arrow-up like"
                      ></i>
                    )}
                    {post.votes}
                    {downVotesPostId && downVotesPostId.includes(post.id) ? (
                      <i
                        onClick={() => {
                          cancelDownVotePost(post.id);
                        }}
                        style={{ color: "red" }}
                        className="fas fa-arrow-down like"
                      ></i>
                    ) : (
                      <i
                        onClick={() => {
                          downVotePost(post.id);
                          resetVotes(post.id);
                        }}
                        style={{ color: "lightgrey" }}
                        className="fas fa-arrow-down like"
                      ></i>
                    )}

                    {bookmarkPostId && bookmarkPostId.includes(post.id) ? (
                      <i
                        style={{
                          color: "#A4DE02",
                          marginRight: "10px",
                        }}
                        onClick={() => unbookmarkIt(post.id)}
                        className="fas fa-bookmark"
                      ></i>
                    ) : (
                      <i
                        style={{
                          marginRight: "10px",
                        }}
                        onClick={() => bookmarkIt(post.id)}
                        className="far fa-bookmark"
                      ></i>
                    )}
                  </div>
                </div>
                <Link
                  className="title"
                  to={`/posts/${post.id}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className="card-body body">
                    <h2
                      style={{
                        color: votesColor(),
                        textTransform: "capitalize",
                      }}
                    >
                      {post.title}
                    </h2>

                    <div className="hash-tags ">
                      {post.hashtags.map((hashtag) => {
                        return (
                          <>
                            {hashtag.length <= 25 ? (
                              <span className="hash-tag">{hashtag}</span>
                            ) : (
                              <span className="hash-tag">{`${hashtag.slice(
                                0,
                                25
                              )}...`}</span>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>

                  <div className="card-body comment">
                    {post.comments && post.comments.length} comments
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Profile;
