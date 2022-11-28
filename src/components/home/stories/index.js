import React from "react";
import { ArrowRight, Plus } from "../../../svg";
import { stories } from "../../../data/home";
import "./style.css";
import Story from "./Story";
import { useMediaQuery } from "react-responsive";
const Stories = ({ user }) => {
  const query1175px = useMediaQuery({
    query: "(max-width: 1175px)",
  });
  const query1030px = useMediaQuery({
    query: "(max-width: 1030px)",
  });
  const query960px = useMediaQuery({
    query: "(max-width: 960px)",
  });
  const query880px = useMediaQuery({
    query: "(max-width: 880px)",
  });
  const query680px = useMediaQuery({
    query: "(max-width: 680px)",
  });
  const max = query680px
    ? 4
    : query880px
    ? 5
    : query960px
    ? 4
    : query1030px
    ? 5
    : query1175px
    ? 4
    : stories.length;
  return (
    <div className="stories">
      <div className="create_story_card">
        <img src={user?.picture} alt="" className="create_story_img" />
        <div className="plus_story">
          <Plus color="#fff" />
        </div>
        <div className="story_create_text">Create Story</div>
      </div>
      {stories.slice(0, max).map((story, i) => (
        <Story story={story} key={i} />
      ))}
      <div className="white_circle">
        <ArrowRight color="#65676b" />
      </div>
    </div>
  );
};

export default Stories;
