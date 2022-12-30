import { Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput/LoginInput";
import * as Yup from "yup";
import axios from "axios";

const PasswordVerification = ({
  setConfirmPassword,
  confirmPassword,
  setPassword,
  password,
  error,
  setError,
  setLoading,
  userInfo,
  setVisiable,
}) => {
  const navigate = useNavigate();
  const validPassword = Yup.object({
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers, letters and punctuation marks (such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    confirmPassword: Yup.string()
      .required("Comfirm Your Password")
      .oneOf([Yup.ref("password")], "Password must match"),
  });
  const {email} =userInfo;
  const passwordUpdate = async () => {
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/ChangePassword`, {
        email,
        password
      });
      setVisiable(2);
      setError("");
      setLoading(false);
      navigate("/")
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <div className="reset_form" style={{ height: "320px" }}>
      <div className="reset_form_header">Change Password</div>
      <div className="reset_form_text">Pick a Strong Password</div>
      <Formik
        enableReinitialize
        initialValues={{ password, confirmPassword }}
        validationSchema={validPassword}
        onSubmit={() => {
          passwordUpdate();
        }}
      >
        {(Formik) => (
          <Form>
            <LoginInput
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
            />
            <LoginInput
              type="password"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter Confirm Password"
              bottom
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancle
              </Link>
              <button className="blue_btn">Continue</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PasswordVerification;
