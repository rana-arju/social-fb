import React, { useState } from "react";
import LeftLink from "./LeftLink";
import "./style.css";
import { left } from "../../../data/home";
import { Link } from "react-router-dom";
import { ArrowDown1 } from "../../../svg";
import Shortcut from "./Shortcut";
const LeftMenu = ({ user }) => {
  const [visiable, setVisiable] = useState(false);
  return (
    <div className="left_home scrollbar">
      <Link to="/profile" className="left_link hover2">
        <img src={user?.picture} alt="" />
        <span>
          {user?.first_name} {user?.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map((link, i) => (
        <LeftLink
          key={i}
          img={link.img}
          text={link.text}
          notification={link.notification}
        />
      ))}
      {!visiable && (
        <div className="left_link hover2" onClick={() => setVisiable(true)}>
          <div className="small_circle">
            <ArrowDown1 />
          </div>
          <span>See More</span>
        </div>
      )}

      {visiable && (
        <div className="more_left">
          {left.slice(8, left.length).map((link, i) => (
            <LeftLink
              key={i}
              img={link.img}
              text={link.text}
              notification={link.notification}
            />
          ))}
          <div className="left_link hover2" onClick={() => setVisiable(false)}>
            <div className="small_circle rotate360">
              <ArrowDown1 />
            </div>
            <span>See Less</span>
          </div>
        </div>
      )}
      <div className="splitter"></div>
      <div className="shortcut">
        <div className="heading">Your Shortcuts</div>
        <div className="edit_shortcut">Edit</div>
      </div>
      <div className="shortcut_list">
        <Shortcut
          link="https://www.youtube.com/channel/UCYSQkndhRpRGNz76J9WeqXA"
          img="../../images/ytb.png"
          name="My Youtube channel"
        />
        <Shortcut
          link="https://www.linkedin.com/in/rana-arju/"
          img="../../images/linkedin.png"
          name="Linkedin Account"
        />
      </div>
      <div className={`fb_copyright ${visiable && "relative_fb_copyright"}`}>
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
        Meta © 2022
      </div>
    </div>
  );
};

export default LeftMenu;
