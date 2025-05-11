import React from "react";
import "./ServicePage.css";
import Footer from "../components/Footer";

const ServicePage = () => {
  return (
    <div className="service-page">
      <header className="navbar">
        <div className="logo">TukangIN</div>
        <div className="profile-area">
          <div className="notif">V</div>
          <img src="/profile.png" alt="User Profile" className="profile-img" />
        </div>
      </header>

      <section className="section riwayat">
        <h2>Riwayat Pesanan</h2>
      </section>

      <section className="section paling-sering">
        <h2>Paling Sering Dipesan</h2>
        <div className="card-row">
          <div className="card" />
          <div className="card" />
          <div className="card" />
          <div className="card" />
        </div>
      </section>

      <section className="section kategori">
        <h2>Kategori</h2>
        <div className="card-row">
          <div className="kategori-card" />
          <div className="kategori-card" />
          <div className="kategori-card" />
          <div className="kategori-card" />
          <div className="kategori-card" />
        </div>
      </section>

      <section className="section rekomendasi">
        <div className="rekomendasi-box" />
      </section>

      {/* Footer Baru */}
      <Footer />
    </div>
  );
};

export default ServicePage;
