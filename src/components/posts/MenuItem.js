import React from "react";

const MenuItem = ({ icon, title, subtitle, img }) => {
  return (
    <li className="hover1">
      {img ? <img src={img} alt="" style={{width: "20px", height: "20px"}} /> : <i className={icon}></i>}
      <div className="post_menu_text">
        <span>{title}</span>
        {subtitle && <div className="post_menu_col">{subtitle}</div>}
      </div>
    </li>
  );
};

export default MenuItem;
