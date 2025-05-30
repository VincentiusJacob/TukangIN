import React from "react";
import "./RegisterTukang.css";
import Logo from "../assets/tukangin.png";
import Tukangs from "../assets/tukangs3.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterTukang = () => {
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
        "http://localhost:3001/api/register/tukang",
        newCustomer
      );
      const result = response.data;

      if (result.success) {
        console.log(result);
        localStorage.setItem("tukangid", result.user.user_id);
        localStorage.setItem("tukangname", result.user.name);
        navigate("/tukang/home");
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
      <div className="register-page-tukang">
        <div
          className="register-left-tukang"
          style={{
            backgroundImage: `url(${Tukangs})`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className="register-right-tukang">
          <img src={Logo} alt="TukangIN Logo" width={100} height={100} />
          <div className="register-content-tukang">
            <h2> Create an account </h2>
            <div className="register-content-input-fields-tukang">
              <div className="register-input">
                <span> Full Name </span>
                <input
                  type="text"
                  id="input-fullname-register"
                  placeholder="John Doe"
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              <div className="register-input">
                <span> Phone Number </span>
                <input
                  type="number"
                  id="input-phonenumber-register"
                  placeholder="81292349765"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="register-input">
                <span> Email Address </span>
                <input
                  type="text"
                  id="input-email-register"
                  placeholder="JohnDoe@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="register-input">
                <span> Password</span>
                <input
                  type="text"
                  id="input-password-register"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="register-input">
                <span> Confirm Password </span>
                <input
                  type="text"
                  id="input-confirmpassword-register"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="register-content-buttons">
              <button className="register-button" onClick={handleSubmit}>
                {" "}
                Register
              </button>
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

export default RegisterTukang;
