import React, { useState } from "react";
import Bio from "./Bio";
import "./style.css";
const ProfileIntro = ({ details, visitor }) => {
  const [showBio, setShowBio] = useState(true);
  const initial = {
    bio: details?.bio ? details.bio : "welcome to my profile",
    otherName: details?.otherName ? details.otherName : "",
    job: details?.job ? details.job : "Student",
    workplace: details?.workplace ? details.workplace : "Google",
    highSchool: details?.highSchool
      ? details.highSchool
      : "Morichya palong high school",
    college: details?.college
      ? details.college
      : "Cox's bazar polytechnic institute",
    currentCity: details?.currentCity ? details.currentCity : "cox's bazar",
    hometown: details?.hometown ? details.hometown : "cox's bazar",
    relationship: details?.relationship ? details.relationship : "single",
    instagram: details?.instagram ? details.instagram : "rana-arju",
  };
  const [infos, setInfos] = useState(initial);
  const handleBioChange = () => {
    
  }
  return (
    <div className="profile_card">
      <div className="profile_card_header">Intro</div>
      {infos.bio && (
        <div className="info_col">
          <span className="info_text">{infos.bio}</span>
          {!visitor && <button className="gray_btn hover1">Edit bio</button>}
        </div>
      )}
      {showBio && (
        <Bio
          setShowBio={setShowBio}
          infos={infos}
          handleBioChange={handleBioChange}
        />
      )}
      {infos.job && infos.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          work as {infos.job} at <b>{infos.workplace}</b>
        </div>
      ) : infos.job && !infos.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          work as {infos.job}
        </div>
      ) : (
        infos.workplace &&
        !infos.job && (
          <div className="info_profile">
            <img src="../../../icons/job.png" alt="" />
            work at {infos.workplace}
          </div>
        )
      )}
      {infos.college && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          studied at {infos.college}
        </div>
      )}
      {infos.highSchool && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          studied at {infos.highSchool}
        </div>
      )}
      {infos.currentCity && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          Lives in {infos.currentCity}
        </div>
      )}
      {infos.hometown && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          From {infos.hometown}
        </div>
      )}
      {infos.relationship && (
        <div className="info_profile">
          <img src="../../../icons/relationship.png" alt="" />
          {infos.relationship}
        </div>
      )}
      {infos.instagram && (
        <div className="info_profile">
          <img src="../../../icons/instagram.png" alt="" />

          <a
            href={`https://www.instagram.com/${infos.instagram}`}
            target="_blank"
          >
            {infos.instagram}
          </a>
        </div>
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100">Edit details</button>
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100">add hobbies</button>
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100">add featured</button>
      )}
    </div>
  );
};

export default ProfileIntro;
