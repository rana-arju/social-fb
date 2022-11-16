import { Form, Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import LoginInput from '../../components/inputs/loginInput/LoginInput';

const CodeVerification = ({code, setCode, error,user}) => {
    return (
      <div className="reset_form">
        <div className="reset_form_header">Code Verification</div>
        <div className="reset_form_text">
          Please enter that been send your email.
        </div>
        <Formik enableReinitialize initialValues={{ code }}>
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