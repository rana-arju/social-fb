import React, { useRef, useState } from "react";
import "./style.css";
import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import useClickOutside from "../../helpers/ClickOutside";
import { createPost } from "../../functions/Post";
import { PulseLoader } from "react-spinners";
import PostError from "./PostError";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { UploadImages } from "../../functions/UploadImages";
const CreatePostPopup = ({ user, setVisible, posts, dispatch, profile }) => {
  const [showPrev, setShowPrev] = useState(false);
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const popupBox = useRef(null);
  useClickOutside(popupBox, () => {
    setVisible(false);
  });
  const postSubmit = async () => {
    if (background) {
      setLoading(true);
      const response = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      if (response.status === "ok") {
        dispatch({
          type: profile ? "PROFILE_POSTS" : "POST_SUCCESS",
          payload: [response.data, ...posts],
        });
        setBackground("");
        setText("");
        setVisible(false);
      } else {
        setError(response);
      }
    } else if (images && images.length) {
      setLoading(true);
      const postImages = images.map((img) => {
        return dataURItoBlob(img);
      });
      const path = `${user.username}/post_images`;
      let formData = new FormData();
      formData.append("path", path);
      postImages.forEach((image) => {
        formData.append("file", image);
      });
      const response = await UploadImages(formData, path, user.token);
      const res = await createPost(
        null,
        null,
        text,
        response,
        user.id,
        user.token
      );
      setLoading(false);
      if (res.status === "ok") {
        dispatch({
          type: profile ? "PROFILE_POSTS" : "POST_SUCCESS",
          payload: [res.data, ...posts],
        });

        setText("");
        setImages("");
        setVisible(false);
      } else {
        setError(res);
      }
    } else if (text) {
      setLoading(true);
      const response = await createPost(
        null,
        null,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      if (response.status === "ok") {
        dispatch({
          type: profile ? "PROFILE_POSTS" : "POST_SUCCESS",
          payload: [response.data, ...posts],
        });

        setBackground("");
        setText("");
        setVisible(false);
      } else {
        setError(response);
      }
    } else {
      console.log("nothing");
    }
  };
  return (
    <div className="blur">
      <div className="postBox" ref={popupBox}>
        {error && <PostError error={error} setError={setError} />}
        <div className="box_header">
          <div className="small_circle" onClick={() => setVisible(false)}>
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
          <EmojiPickerBackground
            user={user}
            text={text}
            setText={setText}
            setBackground={setBackground}
            background={background}
          />
        ) : (
          <ImagePreview
            user={user}
            text={text}
            setText={setText}
            showPrev={showPrev}
            setShowPrev={setShowPrev}
            images={images}
            setImages={setImages}
            setError={setError}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} background={background} />
        <button
          type="submit"
          className="post_submit"
          onClick={() => postSubmit()}
          disabled={loading}
        >
          {loading ? <PulseLoader color="#fff" size={10} /> : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePostPopup;
