import React, { useRef, useState } from "react";
import useClickOutside from "../../helpers/ClickOutside";
import MenuItem from "./MenuItem";

const PostMenu = ({ postUserId, userId, imageLength, setPostMenuVisible }) => {
  const [test, setText] = useState(postUserId === userId ? true : false);

  return (

    <ul className="post_menu" >
      {test && <MenuItem icon="pin_icon" title="pin post" />}
      <MenuItem
        icon="save_icon"
        title="Save post"
        subtitle="Add this to your saved items"
      />
      {imageLength && <div className="line"></div>}
      {test && <MenuItem icon="edit_icon" title="Edit post" />}
      {imageLength && <MenuItem icon="download_icon" title="Download" />}
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
        <MenuItem
          icon="trash_icon"
          title="Move to trash"
          subtitle="Items in your trash are deleted after 30 days."
        />
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
