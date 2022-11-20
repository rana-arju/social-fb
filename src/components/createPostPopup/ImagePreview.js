import React, { useRef } from "react";
import EmojiPickerBackground from "./EmojiPickerBackground";

const ImagePreview = ({
  user,
  text,
  setText,
  images,
  setImages,
  setShowPrev,
}) => {
  const imageInputRef = useRef(null);
  const handleChange = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (rederEvent) => {
        setImages((image) => [...image, rederEvent.target.result]);
      };
    });
  };
  return (
    <div className="overflow_a scrollbar">
      <EmojiPickerBackground user={user} text={text} setText={setText} type2 />
      <div className="add_pics_wrap">
        <input
          type="file"
          hidden
          multiple
          ref={imageInputRef}
          onChange={handleChange}
        />
        {images && images.length ? (
          <div className="add_pics_inside1 p0">
            <div className="preview_actions">
              <button className="hover1">
                <i className="edit_icon"></i>Edit
              </button>
              <button
                className="hover1"
                onClick={() => imageInputRef.current.click()}
              >
                <i className="addPhoto_icon"></i>Add photos/videos
              </button>
            </div>
            <div className="small_white_circle" onClick={() => setImages([])}>
              <i className="exit_icon"></i>
            </div>
            <div
              className={
                images.length === 1
                  ? "preview1"
                  : images.length === 2
                  ? "preview2"
                  : images.length === 3
                  ? "preview3"
                  : images.length === 4
                  ? "preview4"
                  : images.length === 5
                  ? "preview5" : images.length % 2 === 0 ? 
                   "preview6" : "preview6 singular_grid"
              }
            >
              {images &&
                images.map((img, i) => <img src={img} alt="" key={i} />)}
            </div>
          </div>
        ) : (
          <div className="add_pics_inside1 hover2">
            <div
              className="small_white_circle"
              onClick={() => setShowPrev(false)}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className="add_col"
              onClick={() => imageInputRef.current.click()}
            >
              <div className="add_circle">
                <i className="addPhoto_icon"></i>
              </div>
              <span>Add photo/Videos</span>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
        <div className="add_pics_inside2">
          <div className="add_circle">
            <i className="phone_icon"></i>
          </div>
          <div className="mobile_text">add photo from your mobile device</div>
          <span className="addphone_btn">Add</span>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
