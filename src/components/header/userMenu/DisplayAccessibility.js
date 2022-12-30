import React from "react";
import Cookies from "js-cookie";

import { useDispatch, useSelector } from "react-redux";
const DisplayAccessibility = ({ setVisible }) => {
  const { darkTheme } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  return (
    <div className="absolute_wrap">
      <div className="absolute_wrap_header">
        <div className="circle hover1">
          <i className="arrow_back_icon" onClick={() => setVisible(0)}></i>
        </div>
        Display & accessibility
      </div>
      <div className="mmenu_main">
        <div className="small_circle" style={{ width: "50px" }}>
          <i className="dark_filled_icon"></i>
        </div>
        <div className="mmenu_col">
          <span className="mmenu_span1">Dark Mode</span>
          <span className="mmenu_span2">
            Adjust the appearance of Facebook to reduce glare and give your eyes
            a break.
          </span>
        </div>
      </div>
      <label
        htmlFor="darkoff"
        className="hover1"
        onClick={() => {
          Cookies.set("darkTheme", false);
          dispatch({ type: "LIGHT" });
        }}
      >
        <span>Off</span>
        {darkTheme ? (
          <input type="radio" name="dark" id="darkoff" />
        ) : (
          <input type="radio" name="dark" id="darkoff" checked />
        )}
      </label>
      <label
        htmlFor="darkon"
        className="hover1"
        onClick={() => {
          Cookies.set("darkTheme", true);
          dispatch({ type: "DARK" });
        }}
      >
        <span>On</span>
        {darkTheme ? (
          <input type="radio" name="dark" id="darkon" checked />
        ) : (
          <input type="radio" name="dark" id="darkon"  />
        )}
      </label>{" "}
      <div className="mmenu_main">
        <div className="small_circle" style={{ width: "50px" }}>
          <i className="compact_icon"></i>
        </div>
        <div className="mmenu_col">
          <span className="mmenu_span1">Compact Mode</span>
          <span className="mmenu_span2">
            Make your font size smaller so more content can fit on the screen.
          </span>
        </div>
      </div>
      <label htmlFor="compactOff" className="hover1">
        <span>Off</span>
        <input type="radio" name="compact" id="compactOff" />
      </label>
      <label htmlFor="compacton" className="hover1">
        <span>On</span>
        <input type="radio" name="compact" id="compacton" />
      </label>
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="keyboard_icon"></i>
        </div>
        <span>Keyboard</span>
        <div className="rArrow">
          <i className="right_icon"></i>
        </div>
      </div>
    </div>
  );
};

export default DisplayAccessibility;
