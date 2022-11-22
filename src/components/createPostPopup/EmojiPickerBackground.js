import React, { useEffect, useRef, useState } from "react";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
const EmojiPickerBackground = ({
  user,
  text,
  setText,
  type2,
  setBackground,
  background,
}) => {
  const [picker, setPicker] = useState(false);
  const [bgShow, setBgShow] = useState(false);
  const textRef = useRef(null);
  const bgRef = useRef(null);
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
  const postBackgrounds = [
    "../../../images/postbackgrounds/1.jpg",
    "../../../images/postbackgrounds/2.jpg",
    "../../../images/postbackgrounds/3.jpg",
    "../../../images/postbackgrounds/4.jpg",
    "../../../images/postbackgrounds/5.jpg",
    "../../../images/postbackgrounds/6.jpg",
    "../../../images/postbackgrounds/7.jpg",
    "../../../images/postbackgrounds/8.jpg",
    "../../../images/postbackgrounds/9.jpg",
  ];
  const BackgroundHandler = (i) => {
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
    setBackground(postBackgrounds[i]);
    bgRef.current.classList.add("bgHandler");
  };
  const removeBackground = (i) => {
    bgRef.current.style.backgroundImage = "";
    setBackground("");
    bgRef.current.classList.remove("bgHandler");
  };
  return (
    <div className={` overflow_a ${type2 ? "images_input" : ""}`}>
      <div className={`${!type2 ? "flex_center" : ""}`} ref={bgRef}>
        <textarea
          ref={textRef}
          value={text}
          minLength="250"
          className={`post_input ${type2 ? "input2" : ""}`}
          placeholder={`What's on your mind, ${user.first_name}?`}
          onChange={(e) => setText(e.target.value)}
          style={{
            paddingTop: `${
              background
                ? Math.abs(textRef.current.value.length * 0.1 - 10)
                : "0"
            }%`,
            textAlign: `${background && "center"}`,
          }}
        ></textarea>
      </div>
      <div className={`${!type2 ? "post_emojis_wrap" : ""}`}>
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
        {!type2 && (
          <img
            src="../../../icons/colorful.png"
            alt=""
            onClick={() => setBgShow((prev) => !prev)}
          />
        )}
        {!type2 && bgShow && (
          <div className="post_backgrounds">
            <div className="no_background" onClick={() => removeBackground()}>
              {" "}
            </div>
            {postBackgrounds.map((bg, i) => (
              <img
                src={bg}
                alt=""
                key={i}
                onClick={() => {
                  BackgroundHandler(i);
                }}
              />
            ))}
          </div>
        )}
        <i
          className={`emoji_icon_large ${type2 ? "moveleft" : ""}`}
          onClick={() => setPicker((prev) => !prev)}
        ></i>
      </div>
    </div>
  );
};

export default EmojiPickerBackground;
