import React, { useRef, useState } from "react";
import useClickOutside from "../../helpers/ClickOutside";
import MenuItem from "./MenuItem";
import { saveAs } from "file-saver";
import { UploadImages } from "../../functions/UploadImages";
import { deletePost, savePost } from "../../functions/Post";

const PostMenu = ({
  postUserId,
  userId,
  imageLength,
  setPostMenuVisible,
  images,
  token,
  id,
  postRef,
  setCheckSaved,
  checkSaved,
}) => {
  const [test, setText] = useState(postUserId === userId ? true : false);
  const downloadImage = () => {
    images.map((img) => {
      saveAs(img.url, "image.jpg");
    });
    setPostMenuVisible(false)
  };
  const deletePostHandler = async () => {
    const res = await deletePost(id, token);
    if (res.status === "ok") {
      postRef.current.remove();
    }
  };
  const saveHandler = async () => {
    await savePost(id, token);
    if (checkSaved) {
      setCheckSaved(false);
      setPostMenuVisible(false);
    } else {
      setCheckSaved(true);
      setPostMenuVisible(false);
    }
  };
  return (
    <ul className="post_menu">
      {test && <MenuItem icon="pin_icon" title="pin post" />}
      <div onClick={() => saveHandler()}>
        {checkSaved ? (
          <MenuItem
            icon="save_icon"
            title="Unsave post"
            subtitle="Remove this from your saved items"
          />
        ) : (
          <MenuItem
            icon="save_icon"
            title="Save post"
            subtitle="Add this to your saved items"
          />
        )}
      </div>
      {imageLength && <div className="line"></div>}
      {test && <MenuItem icon="edit_icon" title="Edit post" />}
      {imageLength && (
        <div onClick={() => downloadImage()}>
          <MenuItem icon="download_icon" title="Download" />
        </div>
      )}
      {imageLength && (
        <MenuItem icon="fullscreen_icon" title="Enter fullscreen" />
      )}
      {!test && (
        <MenuItem
          icon="turnOnNotification_icon"
          title="Turn on notification for this post"
        />
      )}
      {test && <MenuItem img="../../../icons/lock.png" title="Edit audience" />}
      {test && (
        <MenuItem
          icon="turnOffNotifications_icon"
          title="Turn off notification for this post"
        />
      )}
      {test && <MenuItem icon="delete_icon" title="Turn off transelations" />}
      {test && <MenuItem icon="date_icon" title="Edit date" />}
      {test && (
        <MenuItem icon="refresh_icon" title="Refresh share attechment" />
      )}
      <div className="line"></div>
      {test && <MenuItem icon="archive_icon" title="Move to archive" />}
      {test && (
        <div onClick={() => deletePostHandler()}>
          <MenuItem
            icon="trash_icon"
            title="Move to trash"
            subtitle="Items in your trash are deleted after 30 days."
          />
        </div>
      )}
      {!test && (
        <MenuItem
          img="../../../icons/report.png"
          title="Report post"
          subtitle="I'm concerned about this post."
        />
      )}
    </ul>
  );
};

export default PostMenu;
