import React from "react";
import "./style.css";
import "../../../styles/icons/icons.css";
import { ErrorMessage, useField } from "formik";
import { useMediaQuery } from "react-responsive";


const LoginInput = ({ placeholder, bottom, ...props }) => {
  const [field, meta] = useField(props);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 850px)",
  });

  return (
    <div className="input_wrap">
      {meta.touched && meta.error && !bottom && (
        <div
          className={
            isDesktopOrLaptop
              ? "input_error input_error_desktop"
              : "input_error"
          }
          style={{ transform: "translateY(3px)" }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                isDesktopOrLaptop ? "error_arrow_left" : "error_arrow_top"
              }
            ></div>
          )}
        </div>
      )}

      <input
        className={meta.touched && meta.error ? "input_error_border " : ""}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && bottom && (
        <div
          className={
            isDesktopOrLaptop
              ? "input_error input_error_desktop"
              : "input_error"
          }
          style={{ transform: "translateY(2px)" }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                isDesktopOrLaptop ? "error_arrow_left" : "error_arrow_bottom"
              }
            ></div>
          )}
        </div>
      )}
      {meta.touched && meta.error && (
        <i
          className="error_icon"
          style={{ top: `${!bottom && !isDesktopOrLaptop ? "60%" : "15px"}` }}
        ></i>
      )}
    </div>
  );
};

export default LoginInput;
