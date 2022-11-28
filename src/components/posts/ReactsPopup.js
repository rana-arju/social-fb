import React from "react";
import { reactPost } from "../../functions/Post";
import { useSelector } from "react-redux";
const reactsArray = [
  {
    name: "like",
    image: "../../../reacts/like.gif",
  },
  {
    name: "love",
    image: "../../../reacts/love.gif",
  },
  {
    name: "haha",
    image: "../../../reacts/haha.gif",
  },
  {
    name: "wow",
    image: "../../../reacts/wow.gif",
  },
  {
    name: "sad",
    image: "../../../reacts/sad.gif",
  },
  {
    name: "angry",
    image: "../../../reacts/angry.gif",
  },
];
const ReactsPopup = ({ visible, setVisible, postId }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const reactHandler = async (type) => {
    reactPost(postId, type, user.token, user.id);
  };
  return (
    <>
      {visible && (
        <div
          className="reacts_popup"
          onMouseOver={() =>
            setTimeout(() => {
              setVisible(true);
            }, 500)
          }
          onMouseLeave={() =>
            setTimeout(() => {
              setVisible(false);
            }, 500)
          }
        >
          {reactsArray?.map((react, i) => (
            <div
              className="react"
              key={i}
              onClick={() => reactHandler(react.name)}
            >
              <img src={react?.image} alt="" />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ReactsPopup;
