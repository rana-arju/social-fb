import React from 'react';

const Bio = ({ infos, handleBioChange, max, setShowBio }) => {
  return (
    <div className="add_bio_wrap">
      <textarea
        className="textarea_blue details_input"
        name="bio"
        value={infos.bio}
        maxLength="100"
        placeholder="add bio"
        onChange={handleBioChange}
      ></textarea>
      <div className="remaining">{max} charecters remaining</div>
      <div className="flex">
        <div className="flex flex_left">
          <i className="public_icon"></i>
          Public
        </div>
        <div className="flex flex_right">
          <button className="gray_btn" onClick={() => setShowBio(false)}>
            Cancel
          </button>
          <button className="blue_btn">save</button>
        </div>
      </div>
    </div>
  );
};

export default Bio;