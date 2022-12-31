import React from "react";

const Bio = ({
  infos,
  handleChange,
  max,
  setShowBio,
  updatedDetails,
  placeholder,
  name,
  detail,
  setShow,
  rel,
}) => {
  return (
    <div className="add_bio_wrap">
      {rel ? (
        <select name={name} className="select_rel" value={infos.relationship} onChange={handleChange}>
          <option value="Single">Single</option>
          <option value="In a relationship">In a relationship</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
        </select>
      ) : (
        <textarea
          className="textarea_blue details_input"
          name={name}
          value={infos?.name}
          maxLength={detail ? 25 : 100}
          placeholder={placeholder}
          onChange={handleChange}
        ></textarea>
      )}
      {!detail && <div className="remaining">{max} charecters remaining</div>}
      <div className="flex">
        <div className="flex flex_left">
          <i className="public_icon"></i>
          Public
        </div>
        <div className="flex flex_right">
          <button
            className="gray_btn"
            onClick={() => (!detail ? setShowBio(false) : setShow(false))}
          >
            Cancel
          </button>
          <button
            className="blue_btn"
            onClick={() => {
              updatedDetails();
              setShow(false);
            }}
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bio;
