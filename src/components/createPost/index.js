import React from "react";
import { Feeling, LiveVideo, Photo } from "../../svg";
import "./style.css";
const CreatePost = ({ user, setVisible }) => {
  return (
    <div className="createPost">
      <div className="create_post_header">
        <img src={user?.picture} alt="" />
        <div
          className="open_post hover2"
          onClick={() => setVisible((prev) => !prev)}
        >
          What's your mind, {user?.first_name}?
        </div>
      </div>
      <div className="create_splitter"></div>
      <div className="createPost_body">
        <div className="createPost_icon hover1">
          <LiveVideo color="#f3425f" />
          Live Video
        </div>
        <div
          className="createPost_icon hover1"
          onClick={() => setVisible((prev) => !prev)}
        >
          <Photo color="#4bbf67" />
          Photo/Video
        </div>
        <div className="createPost_icon hover1">
          <Feeling color="#f7b928" />
          Feeling/Activity
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
