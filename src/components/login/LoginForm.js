import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput/LoginInput";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const loginInfos = {
  email: "",
  password: "",
};

const LoginForm = ({ setVisible }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email is required!")
      .email("Must be a valid email"),
    password: Yup.string().required("Password is required"),
  });
  const loginSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        login
      );
      setSuccess(data.message);
     
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: data });
        Cookies.set("user", JSON.stringify(data));
        navigate("/");
      }, 2000);
      setLoading(true)
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
      setSuccess("");
    }
  };
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
            onSubmit={() => {
              loginSubmit();
            }}
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
                <BeatLoader
                  color="#1876f2"
                  loading={loading}
                  // cssOverride={override}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </Form>
            )}
          </Formik>
          <Link to="/reset" className="forgot_password">
            Forgotten password?
          </Link>
          {error && <div className="error_text">{error}</div>}
          {success && <div className="success_text">{success}</div>}
          <div className="sign_splitter"></div>
          <button
            type=""
            className="blue_btn open_signup"
            onClick={() => setVisible(true)}
          >
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
