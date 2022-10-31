import React from "react";
import "./style.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux"
import {Friends, Gaming, HomeActive, Logo, Market, Menu, Messenger, Notifications, Search, Watch} from "../../../svg";
const Header = () => {
    const {user} = useSelector((user) => ({...user}))
    console.log("user", user);
    const color = "#65676b"
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header-logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div className="search search1">
          <Search color={color} />
          <input
            type="text"
            name=""
            value=""
            placeholder="Search Facebook"
            className="hide_input"
            onChange={() => ""}
          />
        </div>
      </div>
      <div className="header_middle">
        <Link to="/" className="middle_icon active">
          <HomeActive color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Friends color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">10+</div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>
      <div className="header_right">
        <div className="circle_icon">
          <Menu />
        </div>
        <div className="circle_icon">
          <Messenger />
        </div>
        <div className="circle_icon">
          <Notifications />
          <div className="right_notification">
            12
          </div>
        </div>
        <Link to="/profile" className="profile_link hover1">
          <img src={user?.picture} alt="" />
         
        </Link>
      </div>
    </header>
  );
};

export default Header;
