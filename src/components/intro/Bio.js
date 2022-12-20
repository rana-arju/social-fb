import React from 'react';

const Bio = ({ infos, handleBioChange }) => {
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
    </div>
  );
};

export default Bio;