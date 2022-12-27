import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";

const CreateComments = ({ user }) => {
  const [picker, setPicker] = useState(false);
  const [comment, setComment] = useState("");
  const [commentImage, setCommentImage] = useState("");
  const [error, setError] = useState("");
  const commentRef = useRef(null);
  const imgInput = useRef(null);
  const [cursorPosition, setCursorPosition] = useState();
  useEffect(() => {
    commentRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const handleEmoji = ({ emoji }, e) => {
    const ref = commentRef.current;
    ref.focus();
    const start = comment.substring(0, ref.selectionStart);
    const end = comment.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setComment(newText);
    setCursorPosition(start.length + emoji.length);
  };
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
      setCommentImage(event.target.result);
    };
  };
  return (
    <div className="create_comment_wrap">
      <div className="create_comment">
        <img src={user?.picture} alt="" />
        <div className="comment_input_wrap">
          {picker && (
            <div className={`comment_emojis_picker`}>
              <EmojiPicker
                onEmojiClick={handleEmoji}
                height={350}
                width="100%"
                skinTonesDisabled
                searchDisabled={true}
                EmojiStyle={EmojiStyle.FACEBOOK}
                previewConfig={{ showPreview: false }}
                categories={{}}
              />
            </div>
          )}
          <input
            type="file"
            hidden
            ref={imgInput}
            accept="image/jpeg, image/png, image/gif, image/webp"
            onChange={handleImage}
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
          <input
            type="text"
            ref={commentRef}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <div
            className="comment_circle_icon hover2"
            onClick={() => setPicker((prev) => !prev)}
          >
            <i className="emoji_icon"></i>
          </div>
          <div
            className="comment_circle_icon hover2"
            onClick={() => imgInput.current.click()}
          >
            <i className="camera_icon"></i>
          </div>
          <div className="comment_circle_icon hover2">
            <i className="gif_icon"></i>
          </div>
          <div className="comment_circle_icon hover2">
            <i className="sticker_icon"></i>
          </div>
        </div>
      </div>
      {commentImage && (
        <div className="comment_img_preview">
          <img src={commentImage} alt="" />
          <div
            className="small_white_circle"
            onClick={() => setCommentImage("")}
          >
            <i className="exit_icon"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateComments;
