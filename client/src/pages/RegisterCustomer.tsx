import React, { useState } from "react";
import "./RegisterCustomer.css";
import Logo from "../assets/tukangin.png";
import Tukangs from "../assets/tukangs3.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterCustomer = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const newCustomer = {
      name: fullname,
      phone: phone,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/register/customer",
        newCustomer
      );
      const result = response.data;

      if (result.success) {
        console.log(result);
        localStorage.setItem("customerid", result.user.user_id);
        localStorage.setItem("customername", result.user.name);
        navigate("/home");
      } else {
        alert("Error creating account");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while registering");
    }
  };

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
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              <div className="register-input">
                <span> Phone Number </span>
                <input
                  type="text"
                  id="input-phonenumber-register"
                  placeholder="81292349765"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="register-input">
                <span> Email Address </span>
                <input
                  type="text"
                  id="input-email-register"
                  placeholder="JohnDoe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="register-input">
                <span> Password </span>
                <input
                  type="password"
                  id="input-password-register"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="register-input">
                <span> Confirm Password </span>
                <input
                  type="password"
                  id="input-confirmpassword-register"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="register-content-buttons">
              <button className="register-button" onClick={handleSubmit}>
                Register
              </button>
            </div>
          </div>
          <span style={{ marginTop: "2em" }}>
            {" "}
            Already have an account? <a href="/login"> Login</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterCustomer;
