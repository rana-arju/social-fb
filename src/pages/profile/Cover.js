import React, { useRef, useState } from "react";
import useClickOutside from "../../helpers/ClickOutside";

const Cover = ({ cover }) => {
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  console.log("showCoverMenu", showCoverMenu);
const coverMenuRef = useRef(null);
useClickOutside(coverMenuRef, () => setShowCoverMenu(false))
  return (
    <div className="profile_cover">
      {cover && <img src={cover} alt="" className="cover" />}
      <div className="update_cover_wrapper" ref={coverMenuRef}>
        <div
          className="open_cover_update"
          onClick={() => setShowCoverMenu((prev) => !prev)}
        >
          <i className="camera_filled_icon"></i>
          Add cover photo
        </div>
        {showCoverMenu && (
          <div className="open_cover_menu">
            <div className="open_cover_menu_item hover1">
              <i className="photo_icon"></i>
              select photo
            </div>
            <div className="open_cover_menu_item hover1">
              <i className="upload_icon"></i>
              upload photo
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cover;
