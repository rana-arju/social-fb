import axios from "axios";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import CreatePost from "../../components/createPost";
import Header from "../../components/header/Header";
import ProfileIntro from "../../components/intro";
import Posts from "../../components/posts";
import { profileReducer } from "../../functions/reducers";
import Cover from "./Cover";
import Friends from "./Friends";
import GridPosts from "./GridPosts";
import Photos from "./Photos";
import PplYouMayKnow from "./PplYouMayKnow";
import ProfileMenu from "./ProfileMenu";
import ProfilePictureInfo from "./ProfilePictureInfo";
import { useMediaQuery } from "react-responsive";

import "./style.css";
import CreatePostPopup from "../../components/createPostPopup";
const Profile = ({ getAllPosts }) => {
  const { username } = useParams();
  const [othername, setOthername] = useState();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [photos, setPhotos] = useState({});
  var userName = username === undefined ? user.username : username;
  const path = `${userName}/*`;
  const max = 30;
  const sort = "desc";
  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    error: "",
    profile: {},
  });
  const getProfile = async () => {
    try {
      dispatch({
        type: "PROFILE_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data.ok === false) {
        navigate("/profile");
      } else {
        try {
          const images = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/listImages`,
            { path, sort, max },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setPhotos(images.data);
        } catch (error) {
          console.log(error);
        }
        dispatch({
          type: "PROFILE_SUCCESS",
          payload: data,
          error: "",
          loading: false,
        });
      }
    } catch (error) {
      dispatch({
        type: "PROFILE_FAILED",
        payload: error?.response?.data.message,
      });
    }
  };
  useEffect(() => {
    getProfile();
  }, [userName]);
  useEffect(() => {
    setOthername(profile?.details?.otherName);
  }, [profile]);
  var visitor = userName === user.username ? false : true;
  const profileTop = useRef(null);
  const [height, setHeight] = useState();
  const leftSide = useRef(null);
  const [leftHeight, setLeftHeight] = useState();
  const [scrollHeight, setScrollHeight] = useState();
  useEffect(() => {
    setHeight(profileTop.current.clientHeight + 300);
    setLeftHeight(leftSide.current.clientHeight + 300);
    return () => {
      window.addEventListener("scroll", getScroll, { passive: true });
    };
  }, [loading, scrollHeight]);
  const check = useMediaQuery({
    query: "(min-width:901px)",
  });
  const getScroll = () => {
    setScrollHeight(window.pageYOffset);
  };
  return (
    <div className="profile">
      {user && visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
          posts={profile?.posts}
          dispatch={dispatch}
          profile
        />
      )}
      <Header page="profile" getAllPosts={getAllPosts} />
      <div className="profile_top" ref={profileTop}>
        <div className="profile_container">
          <Cover
            cover={profile.cover}
            visitor={visitor}
            photos={photos.resources}
          />
          <ProfilePictureInfo
            profile={profile}
            visitor={visitor}
            photos={photos.resources}
            othername={othername}
          />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            {!visitor && <PplYouMayKnow />}
            <div
              className={`profile_grid ${
                check && scrollHeight >= height && leftHeight > 1000
                  ? "scrollFixed showLess"
                  : check &&
                    scrollHeight >= height &&
                    leftHeight < 1000 &&
                    "scrollFixed showMore"
              }`}
            >
              <div className="profile_left" ref={leftSide}>
                <ProfileIntro
                  detailss={profile.details}
                  visitor={visitor}
                  setOthername={setOthername}
                />
                <Photos photos={photos} />
                <Friends friends={profile.friends} />
                <div className="relative_fb_copyright">
                  <Link to="/">Privacy </Link>
                  <span>. </span>
                  <Link to="/">Terms </Link>
                  <span>. </span>
                  <Link to="/">Advertising </Link>
                  <span>. </span>
                  <Link to="/">
                    Ad Choices <i className="ad_choices_icon"></i>{" "}
                  </Link>
                  <span>. </span>
                  <br />
                  <Link to="/"></Link>Cookies <span>. </span>
                  <Link to="/">More </Link>
                  <span>. </span> <br />
                  Rana Arju © 2022
                </div>
              </div>
              <div className="profile_right">
                {!visitor && (
                  <CreatePost user={user} profile setVisible={setVisible} />
                )}
                <GridPosts />
                <div className="posts">
                  {profile.posts && profile.posts.length ? (
                    profile.posts.map((post) => (
                      <Posts post={post} user={user} key={post._id} profile />
                    ))
                  ) : (
                    <div className="no_posts">No posts available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
