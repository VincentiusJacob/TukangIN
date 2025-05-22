import React from "react";
import "./RegisterCustomer.css";
import Logo from "../assets/tukangin.png";
import Tukangs from "../assets/tukangs3.png";

const RegisterCustomer = () => {
  return (
    <div className="register-container">
      <div className="register-page">
        <div
          className="register-left"
          style={{
            backgroundImage: `url(${Tukangs})`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className="register-right">
          <img src={Logo} alt="TukangIN Logo" width={100} height={100} />
          <div className="register-content">
            <h2> Create an account </h2>
            <div className="register-content-input-fields">
              <div className="register-input">
                <span> Full Name </span>
                <input
                  type="text"
                  id="input-fullname-register"
                  placeholder="John Doe"
                />
              </div>
              <div className="register-input">
                <span> Phone Number </span>
                <input
                  type="number"
                  id="input-phonenumber-register"
                  placeholder="81292349765"
                />
              </div>
              <div className="register-input">
                <span> Email Address </span>
                <input
                  type="text"
                  id="input-email-register"
                  placeholder="JohnDoe@gmail.com"
                />
              </div>
              <div className="register-input">
                <span> Password</span>
                <input type="text" id="input-password-register" />
              </div>
              <div className="register-input">
                <span> Confirm Password </span>
                <input type="text" id="input-confirmpassword-register" />
              </div>
            </div>
            <div className="register-content-buttons">
              <button className="register-button"> Register</button>
            </div>
          </div>
          <span style={{ marginTop: "2em" }}>
            {" "}
            Alread have an account? <a href="/login"> Login</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterCustomer;
