import React, { useRef, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "../../../svg";
import SearchMenu from "./SearchMenu";
import AllMenu from "./AllMenu";
import useClickOutside from "../../../helpers/ClickOutside";
import UserMenu from "./userMenu/UserMenu";
const Header = () => {
  const { user } = useSelector((user) => ({ ...user }));
  const color = "#65676b";
  const [showSearchMenu, setShowSearcMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const Allmenu = useRef(null);
  useClickOutside(Allmenu, () => {
    setShowAllMenu(false)
  })
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header-logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div className="search search1" onClick={() => setShowSearcMenu(true)}>
          <Search color={color} />

          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
            onChange={() => ""}
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu color={color} setShowSearcMenu={setShowSearcMenu} />
      )}
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
        <div
          className="circle_icon hover1"
          onClick={() => setShowAllMenu((prev) => !prev)}
          ref={Allmenu}
        >
          <Menu />
          {showAllMenu && <AllMenu setShowAllMenu={setShowAllMenu} />}
        </div>
        <div className="circle_icon">
          <Messenger />
        </div>
        <div className="circle_icon">
          <Notifications />
          <div className="right_notification">12</div>
        </div>
        <div className="profile_link hover1">
          <img src={user?.picture} alt="" />
          <UserMenu user={user}/>
        </div>
    
      </div>
    </header>
  );
};

export default Header;
