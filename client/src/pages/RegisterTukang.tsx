import React from "react";
import "./RegisterTukang.css";
import Logo from "../assets/tukangin.png";

const RegisterTukang = () => {
  return (
    <div className="register-container">
      <div className="header">
        <img src={Logo} alt="TukangIN Logo" className="logo" />
        <span className="logo-text">TukangIN</span>
        <button className="signup-button">Sign up</button>
      </div>

      <h2 className="title">Get Started Now</h2>

      <form className="form">
        <div className="row">
          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Phone Number" />
        </div>
        <input type="email" placeholder="Email Address" />
        <input type="text" placeholder="Home Address" />
        <div className="row">
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
        </div>
        <input type="date" placeholder="Date of Birth" />
        <div className="row">
          <input type="text" placeholder="Gender" />
          <input type="text" placeholder="Specialty Services" />
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterTukang;
