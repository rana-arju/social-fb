import React from "react";

const AllMenuItems = ({ name, description, icon }) => {
  return (
    <div className="all_menu_item hover1">
      <img src={`../../left/${icon}.png`} alt="" />
      <div className="all_menu_col">
        <span>{name}</span>
        <span>{description}</span>
      </div>
    </div>
  );
};

export default AllMenuItems;
