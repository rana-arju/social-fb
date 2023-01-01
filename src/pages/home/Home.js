import React, { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import CreatePost from "../../components/createPost";
import Header from "../../components/header/Header";
import LeftMenu from "../../components/home/leftMenu";
import RightMenu from "../../components/home/right";
// import EmailVerificatin from "../../components/home/sendVerification";
import Stories from "../../components/home/stories";
import Posts from "../../components/posts";
import "./style.css";
const Home = ({
  setVisible,
  posts,
  loading,
  getAllPosts,
}) => {
  const middle = useRef(null);

  const { user } = useSelector((state) => ({ ...state }));
  const [height, setHeight] = useState(null);
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [loading]);
  return (
    <div className="home" style={{ height: ` ${height + 200}px` }}>
      <Header page="home" getAllPosts={getAllPosts} />
      <LeftMenu user={user} />
      <div className="home_midlle" ref={middle}>
        <Stories user={user} />
        {/* {user.verified === false && <EmailVerificatin user={user} />} */}
        <CreatePost user={user} setVisible={setVisible} />
        <div className="posts">
          {loading ? (
            Array.from(new Array(3), (val, i) => i + 1).map((id, i) => (
              <div className="post" style={{ width: "auto" }} key={i}>
                <div className="post_header">
                  <div className="post_header_left">
                    <Skeleton
                      circle
                      height="40px"
                      width="40px"
                      containerClassName="avatar-skeleton"
                      style={{}}
                    />
                    <div className="header_col">
                      <div className="post_profile_name">
                        <Skeleton
                          height="25px"
                          width="180px"
                          containerClassName="avatar-skeleton"
                          style={{}}
                        />
                      </div>
                      <div className="post_profile_privacy_date">
                        <Skeleton
                          height="20px"
                          width="120px"
                          containerClassName="avatar-skeleton"
                          style={{}}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Skeleton
                      height="20px"
                      width="45px"
                      containerClassName="avatar-skeleton"
                      style={{}}
                    />
                  </div>
                </div>
                <div className="post_text">
                  <Skeleton count={5} width="100%" />
                </div>
              </div>
            ))
          ) : (
            <>
              {posts &&
                posts.map((post) => (
                  <Posts post={post} key={post._id} user={user} />
                ))}
            </>
          )}
        </div>
      </div>
      <RightMenu user={user} />
    </div>
  );
};

export default Home;
