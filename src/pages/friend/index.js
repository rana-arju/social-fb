import React from "react";
import Header from "../../components/header/Header";
import "./style.css";
const Friend = () => {
  return (
    <>
      <Header page="friends" />
      <div className="friends">
        <div className="friends_left">
          <div className="friends_left_header">
            <h2>Friends</h2>
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
          </div>
          <div className="friends_left_wrap">
            <div className="mmenu_item  active_friends">
              <div className="small_circle" style={{ background: "#1876f2" }}>
                <i className="friends_home_icon invert"></i>
              </div>
              <span>Home</span>
            </div>
            <div className="mmenu_item">
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Friend requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="mmenu_item">
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Sent requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="mmenu_item">
              <div className="small_circle">
                <i className="friends_suggestions_icon"></i>
              </div>
              <span>Friend suggestions</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="mmenu_item">
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>All friends</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="mmenu_item">
              <div className="small_circle">
                <i className="birthdays_icon"></i>
              </div>
              <span>Birthdays</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="mmenu_item">
              <div className="small_circle">
                <i className="birthdays_icon"></i>
              </div>
              <span>Birthdays</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="mmenu_item">
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>Custom list</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="friends_right"></div>
      </div>
    </>
  );
};

export default Friend;
