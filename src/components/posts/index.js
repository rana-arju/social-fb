import React, {  useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Moment from "react-moment";
import { Dots, Public } from "../../svg";
import ReactsPopup from "./ReactsPopup";
import CreateComments from "./CreateComments";
import PostMenu from "./PostMenu";
const Posts = ({ post, user }) => {
  const [visible, setVisible] = useState(false);
  const [postMenuVisible, setPostMenuVisible] = useState(false);
  return (
    <div className="post">
      <div className="post_header">
        <Link
          to={`/profile/${post.user.username}`}
          className="post_header_left"
        >
          <img src={post.user.picture} alt="" />
          <div className="header_col">
            <div className="post_profile_name">
              {post.user.first_name} {post.user.last_name}
              <div className="updated_p">
                {post.type === "profilePicture" &&
                  `updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } profile picture`}
                {post.type === "cover" &&
                  `updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } cover picture`}
              </div>
            </div>
            <div className="post_profile_privacy_date">
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
              . <Public color="#828387" />
            </div>
          </div>
        </Link>
        <div
          className="post_header_right hover1"
          onClick={() => setPostMenuVisible((prev) => !prev)}
        >
          <Dots color="#828387" />
        </div>
      </div>
      {post.background ? (
        <div
          className="post_background"
          style={{ backgroundImage: `url(${post.background})` }}
        >
          <div className="post_bg_text">{post.text}</div>
        </div>
      ) : (
        <>
          <div className="post_text">{post.text}</div>
          {post.images && post.images.length && (
            <div
              className={
                post.images.length === 1
                  ? "grid_1"
                  : post.images.length === 2
                  ? "grid_2"
                  : post.images.length === 3
                  ? "grid_3"
                  : post.images.length === 4
                  ? "grid_4"
                  : post.images.length >= 5 && "grid_5"
              }
            >
              {post.images.slice(0, 5).map((img, i) => (
                <img src={img.url} alt="" key={i} className={`img-${i}`} />
              ))}
              {post.images.length > 5 && (
                <div className="more-pics-shadow">
                  + {post.images.length - 5}
                </div>
              )}
            </div>
          )}
        </>
      )}
      <div className="post_infos">
        <div className="react_counts">
          <div className="react_count_imgs"></div>
          <div className="react_count_num"></div>
        </div>
        <div className="to_right">
          <div className="comment_counts">14 comments</div>
          <div className="share_count">2 share</div>
        </div>
      </div>
      <div className="post_actions ">
        <ReactsPopup
          visible={visible}
          setVisible={setVisible}
          postId={post._id}
        />
        <div
          className="post_action hover1"
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
          <i className="like_icon"></i>
          <span>Like</span>
        </div>
        <div className="post_action hover1">
          <i className="comment_icon"></i>
          <span>Comment</span>
        </div>
        <div className="post_action hover1">
          <i className="share_icon"></i>
          <span>Share</span>
        </div>
      </div>
      <div className="comments_wrap">
        <div className="comments_order">
          <CreateComments user={user} />
        </div>
      </div>
      {postMenuVisible && (
        <PostMenu
          userId={user.id}
          postUserId={post.user._id}
          imageLength={post?.images?.length}
          setPostMenuVisible={setPostMenuVisible}
        />
      )}
    </div>
  );
};

export default Posts;
