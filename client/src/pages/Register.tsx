import React from 'react';
import './Register.css';
import Logo from '../assets/tukangin.png';

const Register: React.FC = () => {
  return (
    <div className="register-container">
      <header className="header">
        <div className="logo-container">
          <img src={Logo} alt="TukangIN Logo" className="logo-image" />
          <span className="brand-text">Tukang<span className="brand-highlight">IN</span></span>
        </div>
        <button className="signup-button">Sign up</button>
      </header>

      <main className="form-wrapper">
        <h2>Get Started Now</h2>
        <form className="register-form">
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

          {/* New Section */}
          <input type="date" placeholder="Date of Birth" className="spaced-input" />
          <select className="form-select spaced-input">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <button className="register-button" type="submit">Register</button>
        </form>
      </main>
    </div>
  );
};

export default Register;