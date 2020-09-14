import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getUser } from "../../redux/actions";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { baseURL } from "../utils/config";
import { Image, Dropdown } from "react-bootstrap";
const Profile = () => {
  const [userInfo, setUserInfo] = useState([]);
  const dispatch = useDispatch();
  const match = useParams();
  console.log({ userInfo });
  useEffect(() => {
    axiosWithAuth()
      .get(`${baseURL}/users/${match.userId}`)
      .then((res) => {
        setUserInfo(res.data.user);
      });
  }, []);
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
          <p>{userInfo.about}</p>
          {userInfo.location ? (
            <p>
              <i class="fas fa-map-marker-alt"></i>
            </p>
          ) : (
            <p>
              <i class="fas fa-map-marker-alt"></i> location is missing
            </p>
          )}
          <Button className="profile-edit" variant="info">
            Edit Profile
          </Button>
        </div>
      </div>
    </>
  );
};

export default Profile;
