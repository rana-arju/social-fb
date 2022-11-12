import React from 'react';
import { ArrowRight, Plus } from '../../../svg';
import { stories } from '../../../data/home';
import "./style.css";
import Story from './Story';
const Stories = ({user}) => {
    return (
      <div className="stories">
        <div className="create_story_card">
          <img src={user?.picture} alt="" className="create_story_img" />
          <div className="plus_story">
            <Plus color="#fff" />
          </div>
          <div className="story_create_text">Create Story</div>
        </div>
        {stories.map((story, i) => (
          <Story story={story} key={i} />
        ))}
        <div className="white_circle">
          <ArrowRight color="#65676b" />
        </div>
      </div>
    );
};

export default Stories;