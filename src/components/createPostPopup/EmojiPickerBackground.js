import React, { useEffect, useRef, useState } from "react";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
const EmojiPickerBackground = ({ user, text, setText, type2 }) => {
  const [picker, setPicker] = useState(false);
  const textRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState();
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const handleEmoji = ({ emoji }, e) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  return (
    <div className={`${type2 ? 'images_input' : ""}`}>
      <div className={`${!type2 ? "flex_center" : ""}`}>
        <textarea
          ref={textRef}
          value={text}
          minLength="100"
          className={`post_input ${type2 ? "input2" : ""}`}
          placeholder={`What's on your mind, ${user.first_name}?`}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div className={`${!type2 ?  "post_emojis_wrap" : ""}`}>
        {picker && (
          <div
            className={`comment_emojis_picker ${
              type2 ? "movePicker2" : "rlmove"
            } `}
          >
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
        {!type2 && <img src="../../../icons/colorful.png" alt="" />}
        <i
          className={`emoji_icon_large ${type2 ? "moveleft" : ""}`}
          onClick={() => setPicker((prev) => !prev)}
        ></i>
      </div>
    </div>
  );
};

export default EmojiPickerBackground;
