import React, { useState } from "react";
import Bio from "./Bio";

const Details = ({
  value,
  header,
  img,
  placeholder,
  name,
  handleChange,
  updatedDetails,
  infos,
  text, rel
}) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="details_header">{header}</div>
      <div className="add_details_flex ">
        {value ? (
          <div className="info_profile no_underline">
            <img src={`../../../icons/${img}.png`} alt="" />
            {value}
            <i className="edit_icon" onClick={() => setShow(true)}></i>
          </div>
        ) : (
          <div className="flex" onClick={() => setShow(true)}>
            <i className="rounded_plus_icon"></i>
            <span className="underline">

            Add {text}
            </span>
          </div>
        )}
      </div>
      {show && (
        <Bio
          placeholder={placeholder}
          name={name}
          handleChange={handleChange}
          updatedDetails={updatedDetails}
          infos={infos}
          detail
          setShow={setShow}
          rel={rel}
        />
      )}
    </div>
  );
};

export default Details;
