import React, { useState } from "react";
import "./style.css";
import LoginForm from "../../components/login/LoginForm";
import Footer from "../../components/login/Footer";
import RegisterForm from "../../components/login/RegisterForm";

const Login = () => {
  const [visible, setVisible] = useState(false)
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setVisible={setVisible} />
        {visible && <RegisterForm setVisible={setVisible} />}
        <Footer />
      </div>
    </div>
  );
};

export default Login;
