import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./LoginPage.css";
import Logo from "../assets/tukangin.png";
import Tukangs from "../assets/tukangs2.png";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });

      if (response.data.success) {
        Cookies.set("userCredentials", JSON.stringify(response.data.user), {
          expires: 7, // expires in 7 days
        });

        // Redirect to /home
        console.log(response.data.user);
        if (response.data.user.role === "tukang") {
          localStorage.setItem("tukangid", response.data.user.user_id);
          localStorage.setItem("tukangname", response.data.user.name);
        } else {
          localStorage.setItem("customerid", response.data.user.user_id);
          localStorage.setItem("customername", response.data.user.name);
        }

        if (response.data.user.role === "tukang") {
          navigate("/tukang/home");
        } else {
          navigate("/home");
        }
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Something went wrong. Please try again.");
    }
  };

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="password-input">
                <span> Password </span>
                <input
                  type="password"
                  id="input-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="login-content-buttons">
              <button className="login-button" onClick={handleSubmit}>
                Login
              </button>
            </div>
          </div>
          <span>
            {" "}
            New to TukangIN? <a href="/registercustomer">
              {" "}
              Create an account{" "}
            </a>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
