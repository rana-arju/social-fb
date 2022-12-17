import React, { useRef, useState } from "react";
import "./style.css";
import UpdateProfilePicture from "./UpdateProfilePicture";
const ProfilePicture = () => {
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/gif" &&
      file.type !== "image/webp"
    ) {
      setError(`${file.name}  format is not supported`);
      return;
    } else if (file.size === 1024 * 1024 * 2) {
      setError(`${file.name}  is too large max 2mb allowed`);

      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };
  return (
    <div className="blur">
      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={handleImage}
        accept="image/jpeg, image/png, image/gif, image/webp"
      />
      {error && (
        <div className="postError comment_error">
          <div className="postError_error">{error}</div>
          <button
            type="submit"
            className="blue_btn"
            onClick={() => setError("")}
          >
            Try again
          </button>
        </div>
      )}
      <div className="postBox pictureBox">
        <div className="box_header">
          <div className="small_circle">
            <i className="exit_icon"></i>
          </div>
          <span>update profile picture</span>
        </div>
        <div className="update_picture_wrap">
          <div className="update_picture_buttons">
            <button
              className="light_blue_btn"
              onClick={() => inputRef.current.click()}
            >
              <i className="plus_icon filter_blue"></i>
              upload photo
            </button>{" "}
            <button className="gray_btn">
              <i className="frame_icon"></i>
              add frame
            </button>
          </div>
        </div>
        <div className="old_pictures_wrap"></div>
      </div>
      {
        image && <UpdateProfilePicture />
      }
    </div>
  );
};

export default ProfilePicture;
