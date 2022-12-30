import Cookies from "js-cookie";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CodeVerification from "./CodeVerification";
import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";
import "./style.css";
import Footer from "../../components/login/Footer";
import PasswordVerification from "./PasswordVerification";
const ResetPass = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visiable, setVisiable] = useState(0);
  const [userInfo, setUserInfo] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };

  return (
    <div className="reset">
      <div className="reset_header">
        <img src="../../../icons/facebook.svg" alt="" />
        {user ? (
          <div className="right_reset">
            <Link to="/profile">
              <img src={user.picture} alt="" />
            </Link>
            <button className="blue_btn" onClick={() => logout()}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/" className="right_reset">
            <button className="blue_btn">Login</button>
          </Link>
        )}
      </div>
      <div className="reset_wrap">
        {visiable === 0 && (
          <SearchAccount
            email={email}
            setEmail={setEmail}
            error={error}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            setUserInfo={setUserInfo}
            setVisiable={setVisiable}
          />
        )}
        {visiable === 1 && (
          <SendEmail
            userInfo={userInfo}
            error={error}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            setVisiable={setVisiable}
            email={email}
          />
        )}
        {/* {visiable === 2 && (
          <CodeVerification
            code={code}
            setCode={setCode}
            user={user}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setVisiable={setVisiable}
            userInfo={userInfo}
          />
        )} */}
        {visiable === 2 && (
          <PasswordVerification
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            setLoading={setLoading}
            error={error}
            setError={setError}
            userInfo={userInfo}
            setVisiable={setVisiable}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ResetPass;
