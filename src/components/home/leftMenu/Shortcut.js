import React from "react";

const Shortcut = ({ img, link, name }) => {
  return (
   
      <a href={link} target="_blank" rel="noreferrer" className="shortcut_item">
        <img src={img} alt={name} />
        <span>{name}</span>
      </a>
  );
};

export default Shortcut;
