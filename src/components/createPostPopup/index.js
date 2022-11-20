import React, { useState } from "react";
import "./style.css";
import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";

const CreatePostPopup = ({ user }) => {
  const [showPrev, setShowPrev] = useState(true);
  const [text, setText] = useState("");
  const [images, setImages] = useState([])
console.log("images", images);
  return (
    <div className="blur">
      <div className="postBox">
        <div className="box_header">
          <div className="small_circle">
            <i className="exit_icon"></i>
          </div>
          <span>create post</span>
        </div>

        <div className="box_profile">
          <img src={user?.picture} alt="" className="box_profile_img" />
          <div className="box_col">
            <div className="box_profile_name">
              {user?.first_name} {user?.last_name}
            </div>
            <div className="profile_privacy">
              <img src="../../../icons/public.png" alt="" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>

        {!showPrev ? (
          <EmojiPickerBackground user={user} text={text} setText={setText} />
        ) : (
          <ImagePreview
            user={user}
            text={text}
            setText={setText}
            showPrev={showPrev}
            setShowPrev={setShowPrev}
            images={images}
            setImages={setImages}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />
        <button type="submit" className="post_submit">
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePostPopup;
