import React, { useEffect, useReducer, useState } from "react";
import Header from "../../components/header/Header";
import { friendsPage } from "../../functions/reducers";
import { getAllFriendRequests } from "../../functions/user";
import Card from "./Card";
import "./style.css";
const Friend = ({ user }) => {
  const [{ loading, error, data }, dispatch] = useReducer(friendsPage, {
    loading: false,
    error: "",
    data: {},
  });

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    dispatch({ type: "FRIENDS_REQUEST" });
    const res = await getAllFriendRequests(user.token);
    if (res.status === "ok") {
      dispatch({ type: "FRIENDS_SUCCESS", payload: res.data });
    } else {
      dispatch({ type: "FRIENDS_FAILED", payload: res.data });
    }
  };
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
        <div className="friends_right">
          <div className="friends_right_wrap">
            <div className="friends_left_header">
              <h3>Friend Requests</h3>
              <a className="see_link hover3">See all</a>
            </div>
            <div className="flex_wrap">
              {data.friends &&
                data.friends.map((user) => (
                  <Card user={user} key={user._id} type="request" />
                ))}
            </div>
          </div>
          <div className="friends_right_wrap">
            <div className="friends_left_header">
              <h3>Sent Requests</h3>
              <a className="see_link hover3">See all</a>
            </div>
            <div className="flex_wrap">
              {data.sentRequest &&
                data.sentRequest.map((user) => (
                  <Card user={user} key={user._id} type="sent" />
                ))}
            </div>
          </div>
          {/* <div className="friends_right_wrap">
            <div className="friends_left_header">
              <h3>Friend suggestions</h3>
              <a className="see_link hover3">See all</a>
            </div>
            <div className="flex_wrap">
              {data.friends &&
                data.friends.map((user) => (
                  <Card user={user} key={user._id} type="friend" />
                ))}
            </div>
          </div> */}
          <div className="friends_right_wrap">
            <div className="friends_left_header">
              <h3>All friends</h3>
              <a className="see_link hover3">See all</a>
            </div>
            <div className="flex_wrap">
              {data.friends &&
                data.friends.map((user) => (
                  <Card user={user} key={user._id} type="friend" />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Friend;
