import React, { useEffect, useState } from "react";
import Bio from "./Bio";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import EditDetails from "./EditDetails";

const ProfileIntro = ({ detailss, visitor, setOthername }) => {
  const [showBio, setShowBio] = useState(false);
  const [details, setDetails] = useState();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setDetails(detailss);
    setInfos(detailss);
  }, [detailss]);
  const { user } = useSelector((state) => ({ ...state }));
  const initial = {
    bio: details?.bio ? details.bio : "",
    otherName: details?.otherName ? details.otherName : "",
    job: details?.job ? details.job : "",
    workplace: details?.workplace ? details.workplace : "",
    highSchool: details?.highSchool ? details.highSchool : "",
    college: details?.college ? details.college : "",
    currentCity: details?.currentCity ? details.currentCity : "",
    hometown: details?.hometown ? details.hometown : "",
    relationship: details?.relationship ? details.relationship : "",
    instagram: details?.instagram ? details.instagram : "",
  };
  const [infos, setInfos] = useState(initial);
  const [max, setMax] = useState(
    details?.bio ? 100 - details?.bio?.length : 100
  );
  const updatedDetails = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/userDetailsUpdate`,
        {
          infos,
      
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setShowBio(false);
      setDetails(data);
      setOthername(data?.otherName)
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfos({ ...infos, [name]: value });
    setMax(100 - e.target.value.length);
  };
  return (
    <div className="profile_card">
      <div className="profile_card_header">Intro</div>
      {details?.bio && !showBio && (
        <div className="info_col">
          <span className="info_text">{details?.bio}</span>
          {!visitor && (
            <button
              className="gray_btn hover1"
              onClick={() => setShowBio(true)}
            >
              Edit bio
            </button>
          )}
        </div>
      )}
      {!details?.bio && !showBio && !visitor && (
        <div className="info_col">
          <span className="info_text">{details?.bio}</span>
          {!visitor && (
            <button
              className="gray_btn hover1"
              onClick={() => setShowBio(true)}
            >
              Add bio
            </button>
          )}
        </div>
      )}
      {showBio && (
        <Bio
          setShowBio={setShowBio}
          infos={infos}
          handleChange={handleChange}
          max={max}
          updatedDetails={updatedDetails}
          placeholder="Add bio"
          name="bio"
        />
      )}
      {details?.job && details?.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          Work as {details?.job} at <b>{details?.workplace}</b>
        </div>
      ) : details?.job && !details?.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          Work as {details?.job}
        </div>
      ) : (
        details?.workplace &&
        !details?.job && (
          <div className="info_profile">
            <img src="../../../icons/job.png" alt="" />
            Work at {details?.workplace}
          </div>
        )
      )}
      {details?.college && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          Studied at {details?.college}
        </div>
      )}
      {details?.highSchool && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          Studied at {details?.highSchool}
        </div>
      )}
      {details?.currentCity && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          Lives in {details?.currentCity}
        </div>
      )}
      {details?.hometown && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          From {details?.hometown}
        </div>
      )}
      {details?.relationship && (
        <div className="info_profile">
          <img src="../../../icons/relationship.png" alt="" />
          {details?.relationship}
        </div>
      )}
      {details?.instagram && (
        <div className="info_profile">
          <img src="../../../icons/instagram.png" alt="" />

          <a
            href={`https://www.instagram.com/${details?.instagram}`}
            target="_blank"
          >
            {details?.instagram}
          </a>
        </div>
      )}
      {!visitor && (
        <button
          className="gray_btn hover1 w100"
          onClick={() => setVisible(true)}
        >
          Edit details
        </button>
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100">add hobbies</button>
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100">add featured</button>
      )}
      {visible && (
        <EditDetails
          setShowEditDetails={setVisible}
          details={details}
          handleChange={handleChange}
          updatedDetails={updatedDetails}
          infos={infos}
          setVisible={setVisible}
        />
      )}
    </div>
  );
};

export default ProfileIntro;
