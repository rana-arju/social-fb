import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput/LoginInput";
import * as Yup from "yup";
import axios from "axios";

const CodeVerification = ({
  code,
  setCode,
  error,
  setError,
  setLoading,
  setVisiable,
  userInfo,
}) => {
  const validateCode = Yup.object({
    code: Yup.string()
      .required("Please Enter code")
      .min(5, "Code Must be 5 digit")
      .max(5, "Code Must be 5 digit"),
  });
  const { email } = userInfo;
  const verifyCode = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/ValidationResetCode`,
        { email, code }
      );
      setVisiable(3);
      setError("");
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <div className="reset_form">
      <div className="reset_form_header">Code Verification</div>
      <div className="reset_form_text">
        Please enter that been send your email.
      </div>
      <Formik
        enableReinitialize
        initialValues={{ code }}
        validationSchema={validateCode}
        onSubmit={() => {
          verifyCode();
        }}
      >
        {(Formik) => (
          <Form>
            <LoginInput
              type="text"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter Code"
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

export default CodeVerification;
