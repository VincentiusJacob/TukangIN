import React from "react";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <header className="login-header">
        <div className="logo">TukangIN</div>
        <div className="login-tab">
          <div className="tab-background">
            <div className="tab-active">Log in</div>
          </div>
        </div>
      </header>

      <main className="login-content">
        <h2>Log in</h2>
        <input
          type="email"
          placeholder="Email Address"
          className="input-field"
        />
        <input type="password" placeholder="Password" className="input-field" />
        <button className="login-btn">Log in</button>
      </main>
    </div>
  );
};

export default LoginPage;
