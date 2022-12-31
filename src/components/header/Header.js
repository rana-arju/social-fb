import React, { useRef, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Friends,
  FriendsActive,
  Gaming,
  Home,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "../../svg";
import SearchMenu from "./SearchMenu";
import AllMenu from "./AllMenu";
import useClickOutside from "../../helpers/ClickOutside";
import UserMenu from "./userMenu/UserMenu";
const Header = ({ page, getAllPosts }) => {
  const { user } = useSelector((user) => ({ ...user }));
  const color = "#65676b";
  const [showSearchMenu, setShowSearcMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const Allmenu = useRef(null);
  const usermenu = useRef(null);
  useClickOutside(Allmenu, () => {
    setShowAllMenu(false);
  });
  useClickOutside(usermenu, () => {
    setShowUserMenu(false);
  });
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
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
        <SearchMenu
          color={color}
          setShowSearcMenu={setShowSearcMenu}
          token={user.token}
        />
      )}
      <div className="header_middle">
        <Link
          to="/"
          className={`middle_icon ${page === "home" ? "active" : "hover1"}`}
          // onClick={() => getAllPosts()}
        >
          {page === "home" ? (
            <HomeActive color={color} />
          ) : (
            <Home color={color} />
          )}
        </Link>
        <Link
          to="/friends"
          className={`middle_icon ${page === "friends" ? "active" : "hover1"}`}
        >
          {page === "friends" ? (
            <FriendsActive color={color} />
          ) : (
            <Friends color={color} />
          )}
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
          className={`circle_icon hover1 ${showAllMenu && "active_header"}`}
          ref={Allmenu}
        >
          <div
            onClick={() => {
              setShowAllMenu(!showAllMenu);
            }}
          >
            <div style={{ transform: "translateY(2px)" }}>
              <Menu />
            </div>
          </div>

          {showAllMenu && <AllMenu />}
        </div>
        <div className={`circle_icon hover1`}>
          <Messenger />
        </div>
        <div className="circle_icon">
          <Notifications />
          <div className="right_notification">12</div>
        </div>

        <div
          className={`profile_link hover1  ${
            page === "profile" && "active_header"
          }`}
          ref={usermenu}
        >
          <div onClick={() => setShowUserMenu((prev) => !prev)}>
            <div>
              <img src={user?.picture} alt="" />
            </div>
          </div>
          {showUserMenu && (
            <UserMenu user={user} setShowUserMenu={setShowUserMenu} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
