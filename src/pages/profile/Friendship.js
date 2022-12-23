import React, { useRef, useState } from "react";
import useClickOutside from "../../helpers/ClickOutside";

const Friendship = ({friendship}) => {
  const [friendMenu, setFriendMenu] = useState(false);
  const [respondeMenu, setRespondeMenu] = useState(false);

  const friendMenuPopup = useRef(null);
  const respondMenuPopup = useRef(null);
  useClickOutside(friendMenuPopup, () => setFriendMenu(false));
  useClickOutside(respondMenuPopup, () => setRespondeMenu(false));
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
                <div className="open_cover_menu_item">
                  <img src="../../../icons/unfollowOutlined.png" alt="" />
                  <span>Unfollow</span>
                </div>
              ) : (
                <div className="open_cover_menu_item">
                  <img src="../../../icons/follow.png" alt="" />
                  <span>follow</span>
                </div>
              )}

              <div className="open_cover_menu_item">
                <img src="../../../icons/cancelRequest.png" alt="" />
                <span>Unfriend</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        !friendship?.requestSent &&
        !friendship?.requestReceived && (
          <button className="blue_btn" onClick={() => setFriendMenu(true)}>
            <img src="../../../icons/addFriend.png" alt="" className="invert" />
            <span>Add Friends</span>
          </button>
        )
      )}
      {friendship?.requestSent ? (
        <button type="" className="blue_btn">
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
                <div className="open_cover_menu_item hover1">
                  <span>Confirm</span>
                </div>
                <div className="open_cover_menu_item hover1">
                  <span>Cancel</span>
                </div>
              </div>
            )}
          </div>
        )
      )}
      {friendship?.following ? (
        <button type="" className="gray_btn">
          <img src="../../../icons/follow.png" alt="" />
          <span>following</span>
        </button>
      ) : (
        <button type="" className="blue_btn">
          <img src="../../../icons/follow.png" alt="" className="invert" />
          <span>Follow</span>
        </button>
      )}
      <button className={friendship?.friends ? "blue_btn" : "gray_btn"} onClick={() => setFriendMenu(true)}>
        <img src="../../../icons/message.png" alt="" className={friendship?.friends && "invert"}  />
        <span>Message</span>
      </button>
    </div>
  );
};

export default Friendship;
