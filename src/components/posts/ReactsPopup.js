import React from "react";
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
  // {
  //   name: "care",
  //   image: "../../../reacts/care.gif",
  // },
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
const ReactsPopup = ({ visible, setVisible, reactHandler, reactRef }) => {
  return (
    <>
      {visible && (
        <div ref={reactRef}
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
              onClick={() => reactHandler(react?.name)}
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
