import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Moment from "react-moment";
import { Dots, Public } from "../../svg";
import ReactsPopup from "./ReactsPopup";
import CreateComments from "./CreateComments";
import PostMenu from "./PostMenu";
import useClickOutside from "../../helpers/ClickOutside";
import { getReacts, reactPost } from "../../functions/Post";
import Comment from "./Comment";
const Posts = ({ post, user, profile }) => {
  const [visible, setVisible] = useState(false);
  const [reacts, setReact] = useState([]);
  const [check, setCheck] = useState([]);
  const [total, setTotal] = useState(0);
  const [checkSaved, setCheckSaved] = useState();
  const [comments, setComment] = useState();
  const [count, setCount] = useState(1);
  const [postMenuVisible, setPostMenuVisible] = useState(false);
  const menu = useRef(null);
  useClickOutside(menu, () => setPostMenuVisible(false));
  useEffect(() => {
    getPostReacts();
  }, [post]);
  useEffect(() => {
    setComment(post?.comments);
  }, [post]);
  const getPostReacts = async () => {
    const res = await getReacts(post._id, user.token);
    if (res) {
      setReact(res?.reacts);
      setCheck(res?.check);
      setTotal(res?.total);
      setCheckSaved(res.checkSaved);
    }
  };
  const reactHandler = async (type) => {
    await reactPost(post._id, type, user.token);
    if (check == type) {
      setCheck();
      let index = reacts.findIndex((x) => x.react == check);
      if (index !== -1) {
        setReact([...reacts, (reacts[index].count = --reacts[index].count)]);
        setTotal((prev) => --prev);
      }
    } else {
      setCheck(type);
      let index = reacts.findIndex((x) => x.react == type);
      let index1 = reacts.findIndex((x) => x.react == check);
      if (index !== -1) {
        setReact([...reacts, (reacts[index].count = ++reacts[index].count)]);
        setTotal((prev) => ++prev);
      }
      if (index1 !== -1) {
        setReact([...reacts, (reacts[index1].count = --reacts[index1].count)]);
        setTotal((prev) => --prev);
       
      }
    }
  };
  const seeMore = () => {
    setCount((prev) => prev + 3);
  };
  const postRef = useRef(null);
  const reactRef = useRef(null);
  useClickOutside(reactRef, () => setVisible(false));

  return (
    <div
      className="post"
      style={{ width: `${profile && "100%"}` }}
      ref={postRef}
    >
      <div className="post_header">
        <Link
          to={`/profile/${post.user.username}`}
          className="post_header_left"
        >
          <img src={post.user.picture} alt="" />
          <div className="header_col">
            <div className="post_profile_name">
              {post.user.first_name} {post.user.last_name}
              {post?.user?.verified && !post.type && (
                <i className="blue_tick"></i>
              )}
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
          <div className="post_bg_text">{post.text.slice(0, 250)} </div>
        </div>
      ) : post.type === null ? (
        <>
          <div className="post_text">{post.text.slice(0, 250)}</div>
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
      ) : post.type === "profilePicture" ? (
        <div className="post_profile_wrap">
          <div className="profile_update_bg">
            <img src={post.user.cover} alt="" />
          </div>
          <img
            src={post.images[0].url}
            className="post_updated_picture"
            alt=""
          />
        </div>
      ) : (
        <div className="post_cover_wrap">
          <img src={post.images[0].url} alt="" />
        </div>
      )}
      <div className="post_infos">
        <div className="react_counts">
          <div className="react_count_imgs">
            {reacts &&
              reacts
                .sort((a, b) => {
                  return b.count - a.count;
                })
                .slice(0, 3)
                .map(
                  (react, i) =>
                    react.count > 0 && (
                      <img
                        src={`../../../reacts/${react.react}.svg`}
                        key={i}
                        alt=""
                      />
                    )
                )}
          </div>
          <div className="react_count_num">{total > 0 && total}</div>
        </div>
        <div className="to_right">
          <div className="comment_counts">{comments?.length} comments</div>
          <div className="share_count">0 share</div>
        </div>
      </div>
      <div className="post_actions ">
        <ReactsPopup
          visible={visible}
          setVisible={setVisible}
          reactHandler={reactHandler}
          reactRef={reactRef}
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
          onClick={() => reactHandler(check ? check : "like")}
        >
          {check ? (
            <img
              src={`../../../reacts/${check}.svg`}
              alt=""
              className="small_react"
              style={{ width: "18px" }}
            />
          ) : (
            <i className="like_icon"></i>
          )}
          <span
            style={{
              textTransform: "capitalize",
              color: `${
                check === "like"
                  ? "#4267b2"
                  : check === "love"
                  ? "#f63459"
                  : check === "haha"
                  ? "#f7b125"
                  : check === "sad"
                  ? "#f7b125"
                  : check === "angry"
                  ? "#e4605a"
                  : check === "wow"
                  ? "#f7b125"
                  : ""
              }`,
            }}
          >
            {check ? check : "Like"}
          </span>
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
          <CreateComments
            user={user}
            postId={post._id}
            setCount={setCount}
            setComment={setComment}
          />
          {comments &&
            comments
              .sort((a, b) => {
                return new Date(b.commentAt) - new Date(a.commentAt);
              })
              .slice(0, count)
              .map((comment) => (
                <Comment comment={comment} key={comment._id} />
              ))}
          {comments && count < comments?.length && (
            <div className="view_comments" onClick={() => seeMore()}>
              View more comment
            </div>
          )}
        </div>
      </div>
      <div ref={menu}>
        {postMenuVisible && (
          <PostMenu
            userId={user.id}
            postUserId={post.user._id}
            imageLength={post?.images?.length}
            setPostMenuVisible={setPostMenuVisible}
            images={post?.images}
            token={user.token}
            id={post._id}
            postRef={postRef}
            checkSaved={checkSaved}
            setCheckSaved={setCheckSaved}
          />
        )}
      </div>
    </div>
  );
};

export default Posts;
