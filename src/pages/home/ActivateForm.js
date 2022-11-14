import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const ActivateForm = ({ type, header, text, loading }) => {
  return (
    <div className="blur">
      <div className="popup">
        <div
          className={`popup_header ${
            type === "success" ? "success_text" : "error_text"
          }`}
        >
         {header}
        </div>
        <div className="popup_message">{text}</div>
        <PulseLoader color="#1876f2" size={15} loading={loading} />
      </div>
    </div>
  );
};

export default ActivateForm;
