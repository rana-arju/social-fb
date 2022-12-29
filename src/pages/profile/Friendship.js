import React, { useEffect, useRef, useState } from "react";
import useClickOutside from "../../helpers/ClickOutside";
import { useSelector } from "react-redux";
import {
  acceptRequest,
  addFriend,
  cancelRequest,
  deleteRequest,
  follow,
  unFollow,
  unfriend,
} from "../../functions/user";
const Friendship = ({ friendshipp, id }) => {
  const [friendship, setFriendship] = useState(friendshipp);
  useEffect(() => {
    setFriendship(friendshipp);
  }, [friendshipp]);
  const [friendMenu, setFriendMenu] = useState(false);
  const [respondeMenu, setRespondeMenu] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const friendMenuPopup = useRef(null);
  const respondMenuPopup = useRef(null);
  useClickOutside(friendMenuPopup, () => setFriendMenu(false));
  useClickOutside(respondMenuPopup, () => setRespondeMenu(false));

  const addFriendHandler = async () => {
    setFriendship({ ...friendship, requestSent: true, following: true });
    await addFriend(id, user.token);
  };
  const cancelRequestHandler = async () => {
    setFriendship({ ...friendship, requestSent: false, following: false });
    await cancelRequest(id, user.token);
  };
  const followHandler = async () => {
    setFriendship({ ...friendship, following: true });
    await follow(id, user.token);
  };
  const unfollowHandler = async () => {
    setFriendship({ ...friendship, following: false });
    await unFollow(id, user.token);
  };
  const acceptRequestHandler = async () => {
    setFriendship({
      ...friendship,
      friends: true,
      requestSent: false,
      following: true,
      requestReceived: false,
    });
    await acceptRequest(id, user.token);
  };
  const unfriendHandler = async () => {
    setFriendship({
      ...friendship,
      friends: false,
      requestSent: false,
      following: false,
      requestReceived: false,
    });
    await unfriend(id, user.token);
  };
  const daleteRequestHandler = async () => {
    setFriendship({
      ...friendship,
      friends: false,
      requestSent: false,
      following: false,
      requestReceived: false,
    });
    await deleteRequest(id, user.token);
  };
  return (
    <div className="friendship">
      {friendship?.friends ? (
        <div className="friend_menu_wrap">
          <button className="gray_btn" onClick={() => setFriendMenu(true)}>
            <img src="../../../icons/friends.png" alt="" />
            <span>Friends</span>
          </button>
          {friendMenu && (
            <div className="open_cover_menu" ref={friendMenuPopup}>
              <div className="open_cover_menu_item">
                <img src="../../../icons/favoritesOutline.png" alt="" />
                <span>Favorites</span>
              </div>
              <div className="open_cover_menu_item">
                <img src="../../../icons/editFriends.png" alt="" />
                <span>Edit friend list</span>
              </div>
              {friendship?.following ? (
                <div
                  className="open_cover_menu_item"
                  onClick={() => unfollowHandler()}
                >
                  <img src="../../../icons/unfollowOutlined.png" alt="" />
                  <span>Unfollow</span>
                </div>
              ) : (
                <div
                  className="open_cover_menu_item"
                  onClick={() => followHandler()}
                >
                  <img src="../../../icons/follow.png" alt="" />
                  <span>follow</span>
                </div>
              )}

              <div
                className="open_cover_menu_item"
                onClick={() => unfriendHandler()}
              >
                <img src="../../../icons/cancelRequest.png" alt="" />
                <span>Unfriend</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        !friendship?.requestSent &&
        !friendship?.requestReceived && (
          <button className="blue_btn" onClick={() => addFriendHandler()}>
            <img src="../../../icons/addFriend.png" alt="" className="invert" />
            <span>Add Friends</span>
          </button>
        )
      )}
      {friendship?.requestSent ? (
        <button
          type=""
          className="blue_btn"
          onClick={() => cancelRequestHandler()}
        >
          <img
            src="../../../icons/cancelRequest.png"
            alt=""
            className="invert"
          />
          <span>Cancel Request</span>
        </button>
      ) : (
        friendship?.requestReceived && (
          <div className="friend_menu_wrap" ref={respondMenuPopup}>
            <button className="gray_btn" onClick={() => setRespondeMenu(true)}>
              <img src="../../../icons/friends.png" alt="" />
              <span>Respond</span>
            </button>
            {respondeMenu && (
              <div className="open_cover_menu" ref={friendMenuPopup}>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => acceptRequestHandler()}
                >
                  <span>Confirm</span>
                </div>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => daleteRequestHandler()}
                >
                  <span>Delete</span>
                </div>
              </div>
            )}
          </div>
        )
      )}
      <div className="flex">
        {friendship?.following ? (
          <button className="gray_btn" onClick={() => unfollowHandler()}>
            <img src="../../../icons/follow.png" alt="" />
            <span>following</span>
          </button>
        ) : (
          <button className="blue_btn" onClick={() => followHandler()}>
            <img src="../../../icons/follow.png" alt="" className="invert" />
            <span>Follow</span>
          </button>
        )}
        <button
          className={friendship?.friends ? "blue_btn" : "gray_btn"}
          onClick={() => setFriendMenu(true)}
        >
          <img
            src="../../../icons/message.png"
            alt=""
            className={friendship?.friends ? "invert" : ""}
          />
          <span>Message</span>
        </button>
      </div>
    </div>
  );
};

export default Friendship;
