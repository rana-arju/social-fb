import React, { useRef } from "react";
import useClickOutside from "../../helpers/ClickOutside";
import Details from "./Details";

const EditDetails = ({
  details,
  handleChange,
  updatedDetails,
  infos,
  setVisible,
}) => {
  const modal = useRef(null);
  useClickOutside(modal, () => setVisible(false))
  return (
    <div className="blur">
      <div className="postBox infoBox" ref={modal}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setVisible(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Edit details</span>
        </div>
        <div className="details_wrapper scrollbar">
          <div className="details_col">
            <span>Customize your intro</span>
            <span>Details you select will be public</span>
          </div>
          <div className="details_header">Other name</div>
          <Details
            value={details?.otherName}
            img="studies"
            placeholder="Add other name"
            name="otherName"
            handleChange={handleChange}
            updatedDetails={updatedDetails}
            infos={infos}
            text="Other name"
          />
          <div className="details_header">Work</div>
          <Details
            value={details?.job}
            img="job"
            placeholder="Add a job"
            name="job"
            handleChange={handleChange}
            updatedDetails={updatedDetails}
            infos={infos}
            text="job"
          />
          <Details
            value={details?.workplace}
            img="job"
            placeholder="Add workplace"
            name="workplace"
            handleChange={handleChange}
            updatedDetails={updatedDetails}
            infos={infos}
            text="a workplace"
          />
          <div className="details_header">Education</div>
          <Details
            value={details?.highSchool}
            img="studies"
            placeholder="Add a high school"
            name="highSchool"
            handleChange={handleChange}
            updatedDetails={updatedDetails}
            infos={infos}
            text="high school"
          />
          <Details
            value={details?.college}
            img="studies"
            placeholder="Add a collage"
            name="college"
            handleChange={handleChange}
            updatedDetails={updatedDetails}
            infos={infos}
            text="a collage"
          />
          <div className="details_header">Current City</div>
          <Details
            value={details?.currentCity}
            img="home"
            placeholder="Add a current city"
            name="currentCity"
            handleChange={handleChange}
            updatedDetails={updatedDetails}
            infos={infos}
            text="current city"
          />
          <div className="details_header">Hometown</div>
          <Details
            value={details?.hometown}
            img="home"
            placeholder="Add a hometown"
            name="hometown"
            handleChange={handleChange}
            updatedDetails={updatedDetails}
            infos={infos}
            text="hometown"
          />
          <div className="details_header">Relationship</div>
          <Details
            value={details?.relationship}
            img="relationship"
            placeholder="Your relationship status"
            name="relationship"
            handleChange={handleChange}
            updatedDetails={updatedDetails}
            infos={infos}
            text="relationship status"
            rel
          />
          <div className="details_header">Social media</div>
          <Details
            value={details?.instagram}
            img="instagram"
            placeholder="Add Instagram username"
            name="instagram"
            handleChange={handleChange}
            updatedDetails={updatedDetails}
            infos={infos}
            text="instagram"
          />
          <Details
            value={details?.facebook}
            img="instagram"
            placeholder="Add facebook username"
            name="facebook"
            handleChange={handleChange}
            updatedDetails={updatedDetails}
            infos={infos}
            text="facebook"
          />
          <Details
            value={details?.youtube}
            img="instagram"
            placeholder="Add youtube username"
            name="youtube"
            handleChange={handleChange}
            updatedDetails={updatedDetails}
            infos={infos}
            text="youtube"
          />
        </div>
      </div>
    </div>
  );
};

export default EditDetails;
