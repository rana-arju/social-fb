import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput/LoginInput";
const loginInfos = {
  email: "",
  password: "",
};

const LoginForm = () => {
    const [login, setLogin] = useState(loginInfos);
    console.log("login", login);
    const { email, password } = login;
    const handleOnChange = (e) => {
      const { name, value } = e.target;
      setLogin({ ...login, [name]: value });
    };
    const loginValidation = Yup.object({
      email: Yup.string()
        .required("Email is required!")
        .email("Must be a valid email"),
      password: Yup.string()
        .required("Password is required!")
        .email("Must be a valid password"),
    });
    return (
      <div className="login_wrap">
        <div className="login_1">
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
            alt=""
          />
          <span>
            Facebook helps you contact and share with the people in your life.
          </span>
        </div>
        <div className="login_2">
          <div className="login_2_wrap">
            <Formik
              enableReinitialize
              initialValues={{ email, password }}
              validationSchema={loginValidation}
            >
              {(formik) => (
                <Form>
                  <LoginInput
                    placeholder="Eamil address or phone number"
                    type="text"
                    name="email"
                    onChange={handleOnChange}
                  />
                  <LoginInput
                    placeholder="Enter password"
                    type="password"
                    name="password"
                    onChange={handleOnChange}
                    bottom
                  />
                  <button type="submit" className="blue_btn">
                    Log in
                  </button>
                </Form>
              )}
            </Formik>
            <Link to="/forgot" className="forgot_password">
              Forgotten password?
            </Link>
            <div className="sign_splitter"></div>
            <button type="" className="blue_btn open_signup">
              Create Account
            </button>
          </div>
          <Link to="/" className="sign_extra">
            <b>Create a Page</b> for a celebrity or business.
          </Link>
        </div>
      </div>
    );
};

export default LoginForm;