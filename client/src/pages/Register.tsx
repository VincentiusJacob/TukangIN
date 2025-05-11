// import React from "react";
import "./ServicePage.css";
import Logo from "../assets/tukangin.png";

const ServicePage = () => {
  return (
    <div className="service-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src={Logo} alt="TukangIN Logo" className="logo-img" />
        </div>
        <div className="profile-icons">
          <div className="notif">V</div>
          <div className="avatar">
            <img src="https://via.placeholder.com/35" alt="Profile" />
          </div>
        </div>
      </header>

      {/* Riwayat */}
      <section className="section">
        <h2 className="section-title">Riwayat Pesanan</h2>
        <div className="history-placeholder" />
      </section>

      {/* Paling sering dipesan */}
      <section className="section">
        <h2 className="section-title">Paling sering dipesan</h2>
        <div className="card-row">
          <div className="card" />
          <div className="card" />
          <div className="card" />
        </div>
      </section>

      {/* Kategori */}
      <section className="section">
        <h2 className="section-title">Kategori</h2>
        <div className="category-row">
          {[...Array(5)].map((_, i) => (
            <div className="category-card" key={i}>
              <div className="category-thumbnail" />
              <div className="category-label" />
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Block */}
      <div className="bottom-block" />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">
          <img src={Logo} alt="TukangIN Footer Logo" className="footer-logo-img" />
        </div>

        <div className="footer-sections">
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Our Services</li>
              <li>Privacy Policy</li>
              <li>Our Team</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Help</h4>
            <ul>
              <li>Contact Us</li>
              <li>Help Center</li>
              <li>FAQ</li>
              <li>Report an issue</li>
            </ul>
          </div>
          <div className="footer-section address">
            <h4>Follow us</h4>
            <div className="social-icons">
              <span>📘</span>
              <span>𝕏</span>
              <span>📸</span>
              <span>▶️</span>
            </div>
            <p>
              Jl. Melati Indah No. 27, RT 04 / RW 09 <br />
              Kelurahan Sukamaju, Kecamatan Serpong <br />
              Kota Tangerang Selatan, Banten 15310
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          © 2025 TukangIN. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ServicePage;
