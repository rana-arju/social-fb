import React, { useState } from "react";
import { Link } from "react-router-dom";
import SettingsPrivacy from "./SettingsPrivacy";
const UserMenu = ({ user }) => {
    const [visible, setVisible] = useState(1)
  return (
    <div className="mmenu">
      {visible === 0 && (
        <div>
          <Link to="/profile" className="mmenu_header hover1">
            <img src={user?.picture} alt="" />
            <div className="mmenu_col">
              <span style={{ textTransform: "capitalize" }}>
                {user?.first_name} {user?.last_name}
              </span>
              <span>See Your Profile</span>
            </div>
          </Link>
          <div className="mmenu_splitter"></div>
          <div className="mmenu_main hover3">
            <div className="small_circle">
              <i className="report_filled_icon"></i>
            </div>
            <div className="mmenu_col">
              <div className="mmenu_span1">Give Feedback</div>
              <div className="mmenu_span2">help us improve facebook</div>
            </div>
          </div>
          <div className="mmenu_splitter"></div>
          <div className="mmenu_item hover3">
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
            <span>Settings & privacy</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div className="mmenu_item hover3">
            <div className="small_circle">
              <i className="help_filled_icon"></i>
            </div>
            <span>Help & Support</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div className="mmenu_item hover3">
            <div className="small_circle">
              <i className="dark_filled_icon"></i>
            </div>
            <span>Display & accessibility</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div className="mmenu_item hover3">
            <div className="small_circle">
              <i className="logout_filled_icon"></i>
            </div>
            <span>Log Out</span>
          </div>
        </div>
      )}
      {
        visible === 1 && <SettingsPrivacy />
      }
    </div>
  );
};

export default UserMenu;
