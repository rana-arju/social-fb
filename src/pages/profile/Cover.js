import React, { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { createPost } from "../../functions/Post";
import { UploadImages } from "../../functions/UploadImages";
import { updateProfileCover } from "../../functions/user";
import useClickOutside from "../../helpers/ClickOutside";
import getCroppedImg from "../../helpers/getCroppedImg";
import OldCover from "./OldCover";

const Cover = ({ cover, visitor, photos }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const [showCoverMneu, setShowCoverMenu] = useState(false);
  const [coverPicture, setCoverPicture] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const menuRef = useRef(null);
  const inputRef = useRef(null);
  const coverRef = useRef(null);
  const cRef = useRef(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  useClickOutside(menuRef, () => setShowCoverMenu(false));
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/gif" &&
      file.type !== "image/webp"
    ) {
      setError(`${file.name}  format is not supported`);
      return;
    } else if (file.size === 1024 * 1024 * 2) {
      setError(`${file.name}  is too large max 2mb allowed`);

      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCoverPicture(event.target.result);
    };
  };
  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setCoverPicture(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );
  const [width, setWidth] = useState();
  useEffect(() => {
    setWidth(coverRef.current.clientWidth);
  }, [window.innerWidth]);
  const updateCoverPicture = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then((b) => b.blob());
      const path = `${user.username}/cover_pictures`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      const res = await UploadImages(formData, path, user.token);
      const update_picture = await updateProfileCover(
        res[0].url,
        user.token
      );
      if (update_picture === "ok") {
        const new_post = await createPost(
          "cover",
          null,
          null,
          res,
          user.id,
          user.token
        );
        if (new_post.status === "ok") {
          setLoading(false);
          setCoverPicture("");
          cRef.current.src = res[0].url;
        } else {
          setLoading(false);
          setError(new_post);
        }
      } else {
        setLoading(false);
        setError(update_picture);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="profile_cover" ref={coverRef}>
      {coverPicture && (
        <div className="save_changes_cover">
          <div className="save_changes_left">
            <i className="public_icon"></i>
            Your cover photo is public
          </div>
          <div className="save_changes_right">
            <button
              className="blue_btn opacity_btn"
              onClick={() => setCoverPicture("")}
            >
              cancel
            </button>
            <button
              className="blue_btn opacity_btn"
              onClick={() => updateCoverPicture()}
            >
              {loading ? (
                <PulseLoader color="#fff" size={10} />
              ) : (
                "save changes"
              )}
            </button>
          </div>
        </div>
      )}
      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={handleImage}
        accept="image/jpeg, image/png, image/gif, image/webp"
      />
      {error && (
        <div className="postError comment_error">
          <div className="postError_error">{error}</div>
          <button
            type="submit"
            className="blue_btn"
            onClick={() => setError("")}
          >
            Try again
          </button>
        </div>
      )}
      {coverPicture && (
        <div className="cover_crooper">
          <Cropper
            image={coverPicture}
            crop={crop}
            zoom={zoom}
            aspect={width / 350}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={true}
            objectFit="horizontal-cover"
          />
        </div>
      )}
      {cover && !coverPicture && (
        <img src={cover} className="cover" alt="" ref={cRef} />
      )}
      {!visitor && (
        <div className="udpate_cover_wrapper">
          <div
            className="open_cover_update"
            onClick={() => setShowCoverMenu((prev) => !prev)}
          >
            <i className="camera_filled_icon"></i>
            Add Cover Photo
          </div>
          {showCoverMneu && (
            <div className="open_cover_menu" ref={menuRef}>
              <div
                className="open_cover_menu_item hover1"
                onClick={() => setShow(true)}
              >
                <i className="photo_icon"></i>
                Select Photo
              </div>
              <div
                className="open_cover_menu_item hover1"
                onClick={() => inputRef.current.click()}
              >
                <i className="upload_icon"></i>
                Uplaod Photo
              </div>
            </div>
          )}
        </div>
      )}
      {show && (
        <OldCover
          photos={photos}
          setCoverPicture={setCoverPicture}
          setShow={setShow}
        />
      )}
    </div>
  );
};

export default Cover;
