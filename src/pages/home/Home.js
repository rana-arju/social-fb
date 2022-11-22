import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../../components/createPost";
import Header from "../../components/header/Header";
import LeftMenu from "../../components/home/leftMenu";
import RightMenu from "../../components/home/right";
import EmailVerificatin from "../../components/home/sendVerification";
import Stories from "../../components/home/stories";
import "./style.css";
const Home = ({setVisible}) => {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className="home">
      <Header />
      <LeftMenu user={user} />
      <div className="home_midlle">
        <Stories user={user} />
        {user.verified === false && <EmailVerificatin user={user} />}
        <CreatePost user={user} setVisible={setVisible} />
      </div>
      <RightMenu user={user} />
    </div>
  );
};

export default Home;
