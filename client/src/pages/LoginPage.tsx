import React from "react";
import "./LoginPage.css";
import Logo from "../assets/tukangin.png";
import Tukangs from "../assets/tukangs2.png";

const LoginPage: React.FC = () => {
  return (
    <div className="login-page-container">
      <div className="login-page">
        <div
          className="login-left"
          style={{
            backgroundImage: `url(${Tukangs})`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className="login-right">
          <img src={Logo} alt="TukangIN Logo" width={150} height={120} />

          <div className="login-content">
            <h2> Welcome Back!</h2>
            <span style={{ color: "#7E99A3", fontWeight: "bold" }}>
              Login to your account{" "}
            </span>
            <div className="login-content-input-fields">
              <div className="email-input">
                <span> Email </span>
                <input
                  type="email"
                  id="input-email"
                  placeholder="tukang@gmail.com"
                />
              </div>
              <div className="password-input">
                <span> Password </span>
                <input type="password" id="input-password" />
              </div>
            </div>
            <div className="login-content-buttons">
              <button className="login-button"> Login</button>
            </div>
          </div>
          <span>
            {" "}
            Already have an account? <a href=""> Sign up </a>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
