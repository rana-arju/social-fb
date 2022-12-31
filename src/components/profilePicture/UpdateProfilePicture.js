import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helpers/getCroppedImg";
import { useDispatch, useSelector } from "react-redux";
import { UploadImages } from "../../functions/UploadImages";
import { updateProfilepicture } from "../../functions/user";
import { createPost } from "../../functions/Post";
import { PulseLoader } from "react-spinners";
import Cookies from "js-cookie";

const UpdateProfilePicture = ({ setImage, image, setError, setShow, pRef }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const slider = useRef(null);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const zoomOut = () => {
    slider.current.stepDown();
    setZoom(slider.current.value);
  };
  const zoomIn = () => {
    slider.current.stepUp();
    setZoom(slider.current.value);
  };
  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setImage(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );
  const updateProfilePic = async () => {
    try {
      setLoading(true);

      let img = await getCroppedImage();
      let blob = await fetch(img).then((b) => b.blob());
      const path = `${user.username}/profile_pictures`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      const res = await UploadImages(formData, path, user.token);

      const update_picture = await updateProfilepicture(
        res[0].url,

        user.token
      );
      if (update_picture === "ok") {
        const new_post = await createPost(
          "profilePicture",
          null,
          description,
          res,
          user.id,
          user.token
        );
        if (new_post.status === "ok") {
          setLoading(false);
          setImage("");
          pRef.current.style.backgroundImage = `url(${res[0].url})`;
          Cookies.set(
            "user",
            JSON.stringify({
              ...user,
              picture: res[0].url,
            })
          );
     

          dispatch({
            type: "UPDATEPICTURE",
            payload: res[0].url,
          });
          setShow(false);
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
    <div className="postBox update_img">
      <div className="box_header">
        <div className="small_circle" onClick={() => setImage("")}>
          <i className="exit_icon"></i>
        </div>
        <span>update profile picture</span>
      </div>
      <div className="update_img_dsc">
        <textarea
          placeholder="Description"
          value={description}
          className="textarea_blue details_input"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="update_center">
        <div className="cropper">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            showGrid={false}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className="slider">
          <div className="circle_slider hover1" onClick={() => zoomOut()}>
            <i className="minus_icon"></i>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            value={zoom}
            step={0.2}
            ref={slider}
            onChange={(e) => setZoom(e.target.value)}
          />
          <div className="circle_slider hover1" onClick={() => zoomIn()}>
            <i className="plus_icon"></i>
          </div>
        </div>
      </div>
      <div className="flex_up">
        <div className="gray_btn" onClick={() => getCroppedImage("show")}>
          <i className="crop_icon"></i> Crop photo{" "}
        </div>
        <div className="gray_btn">
          <i className="temp_icon"></i> Make Temporary
        </div>
      </div>
      <div className="flex_p_t">
        <i className="public_icon"></i>
        Your profile picture is public
      </div>
      <div className="update_submit_wrap">
        <div className="blue_link" onClick={() => setImage("")}>
          Cancel
        </div>
        <button
          className="blue_btn"
          disabled={loading}
          onClick={() => updateProfilePic()}
        >
          {loading ? <PulseLoader color="#fff" size={10} /> : "Save"}
        </button>
      </div>
    </div>
  );
};

export default UpdateProfilePicture;
