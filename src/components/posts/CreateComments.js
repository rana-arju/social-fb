import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { createComment } from "../../functions/Post";
import { UploadImages } from "../../functions/UploadImages";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { ClipLoader } from "react-spinners";
const CreateComments = ({ user, postId, setCount, setComment}) => {
  const [picker, setPicker] = useState(false);
  const [text, setText] = useState("");
  const [commentImage, setCommentImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const commentRef = useRef(null);
  const imgInput = useRef(null);
  const [cursorPosition, setCursorPosition] = useState();
  useEffect(() => {
    commentRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const handleEmoji = ({ emoji }, e) => {
    const ref = commentRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
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
  const handleComment = async (e) => {
    if (e.key === "Enter") {
      if (commentImage != "") {
        setLoading(true);
        const img = dataURItoBlob(commentImage);

        const path = `${user.username}/post_images/${postId}`;
        let formData = new FormData();
        formData.append("path", path);
        formData.append("file", img);

        const image = await UploadImages(formData, path, user.token);
        const comments = await createComment(postId, text, image[0].url, user.token);
        setComment(comments)
        setLoading(false);
        setText("");
        setCount((prev) => ++prev)
        setCommentImage("");
      } else {
        setLoading(true);
        const comments = await createComment(postId, text, "", user.token);
     
        setComment(comments)
        setLoading(false);
        setText("");
        setCount((prev) => ++prev)
      }
    }
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
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            onKeyUp={handleComment}
          />
          <div className="comment_circle" style={{ marginTop: "5px" }}>
            {loading && <ClipLoader size={20} color="#1876f2" />}
          </div>
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
