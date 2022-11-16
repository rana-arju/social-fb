import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../../components/createPost";
import Header from "../../components/header/Header";
import LeftMenu from "../../components/home/leftMenu";
import RightMenu from "../../components/home/right";
import EmailVerificatin from "../../components/home/sendVerification";
import Stories from "../../components/home/stories";
import useClickOutside from "../../helpers/ClickOutside";
import "./style.css";
const Home = () => {
  const [visible, setVisible] = useState(true);
  const { user } = useSelector((state) => ({ ...state }));
  const el = useRef(null);
  useClickOutside(el, () => {
    setVisible(false);
  });
  return (
    <div className="home">
      <Header />
      <LeftMenu user={user} />
      <div className="home_midlle">
        <Stories user={user} />
        {user.verified === false && <EmailVerificatin user={user} />}
        <CreatePost user={user} />
      </div>
      <RightMenu user={user} />
    </div>
  );
};

export default Home;
