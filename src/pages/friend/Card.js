import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  acceptRequest,
  cancelRequest,
  deleteRequest,
} from "../../functions/user";

const Card = ({ userr, type, getData }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const cancelRequestHandler = async (id) => {
    const res = await cancelRequest(id, user.token);
    if (res === "ok") {
      getData();
    }
  };
  const deleteRequestHandler = async (id) => {
    const res = await deleteRequest(id, user.token);
    if (res === "ok") {
      getData();
    }
  };
  const confirmRequestHandler = async (id) => {
    const res = await acceptRequest(id, user.token);
    if (res === "ok") {
      getData();
    }
  };
  return (
    <div className="req_card">
      <Link to={`/profile/${userr.username}`}>
        <img src={userr.picture} alt="" />
      </Link>
      <div className="req_name">
        {userr.first_name} {userr.last_name}
      </div>
      {type === "sent" ? (
        <button
          className="blue_btn"
          onClick={() => cancelRequestHandler(userr._id)}
        >
          Cancel request
        </button>
      ) : type === "request" ? (
        <>
          <button
            className="blue_btn"
            onClick={() => confirmRequestHandler(userr._id)}
          >
            Confirm
          </button>
          <button
            className="gray_btn"
            onClick={() => deleteRequestHandler(userr._id)}
          >
            Delete
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Card;
