import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../../components/createPost";
import Header from "../../components/header/Header";
import LeftMenu from "../../components/home/leftMenu";
import RightMenu from "../../components/home/right";
import EmailVerificatin from "../../components/home/sendVerification";
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
          {posts &&
            posts.map((post) => (
              <Posts post={post} key={post._id} user={user} />
            ))}
        </div>
      </div>
      <RightMenu user={user} />
    </div>
  );
};

export default Home;
