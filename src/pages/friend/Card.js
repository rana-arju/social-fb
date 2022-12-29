import React from "react";
import { Link } from "react-router-dom";

const Card = ({ user, type }) => {
  return (
    <div className="req_card">
      <Link to={`/profile/${user.username}`}>
        <img src={user.picture} alt="" />
      </Link>
      <div className="req_name">
        {user.first_name} {user.last_name}
      </div>
      {type === "sent" ? (
        <button className="blue_btn">Cancel request</button>
      ) : type === "request" ? (
        <>
          <button className="blue_btn">Confirm</button>
          <button className="gray_btn">Delete</button>
        </>
      ) : (
        ""
      )}
    </div> 
  );
};

export default Card;
