import { Form, Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import LoginInput from '../../components/inputs/loginInput/LoginInput';

const PasswordVerification = ({
  setConfirmPassword,
  confirmPassword,
  setPassword,
  password,
  error,
  user,
}) => {
  return (
    <div className="reset_form" style={{height: "320px"}}>
      <div className="reset_form_header">Change Password</div>
      <div className="reset_form_text">
        Pick a Strong Password
      </div>
      <Formik enableReinitialize initialValues={{ password, confirmPassword}}>
        {(Formik) => (
          <Form>
            <LoginInput
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            /> 
            <LoginInput
              type="password"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter Confirm Password"
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