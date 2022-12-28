import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
const Comment = ({ comment, setCount }) => {
  return (
    <div className="comment">
      <Link to={`/profile/${comment.commentBy.username}`}>
        <img src={comment?.commentBy?.picture} alt="" className="comment_img" />
      </Link>
      <div className="comment_col">
        <div className="comment_wrap">
          <div className="comment_name">
            {comment?.commentBy?.first_name} {comment?.commentBy?.last_name}
          </div>
          <div className="comment_text">{comment.comment}</div>
        </div>
        {comment.image && (
          <img src={comment.image} alt="" className="comment_image" />
        )}
        <div className="comment_action">
          <span>Like</span>
          <span>Reply</span>
          <span>
            <Moment fromNow interval={30}>
              {comment.commentAt}
            </Moment>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
