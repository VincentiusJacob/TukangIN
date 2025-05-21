import React from "react";
import "./HistoryPage.css";
import Footer from "../components/Footer";
import Logo from "../assets/tukangin.png";

const HistoryPage = () => {
  const dummyHistory = [
    {
      title: "Tukang Pasang Listrik",
      date: "12/12/2023",
      duration: "3 Jam",
      category: "Instalasi",
      price: "Rp 200.000",
    },
    {
      title: "Tukang Pipa Bocor",
      date: "05/01/2024",
      duration: "2 Jam",
      category: "Perbaikan",
      price: "Rp 150.000",
    },
    {
      title: "Tukang AC",
      date: "10/01/2024",
      duration: "1 Jam",
      category: "Servis",
      price: "Rp 250.000",
    },
    {
      title: "Tukang Taman",
      date: "14/01/2024",
      duration: "4 Jam",
      category: "Pembersihan",
      price: "Rp 180.000",
    },
    {
      title: "Tukang Cat Rumah",
      date: "20/01/2024",
      duration: "5 Jam",
      category: "Pengecatan",
      price: "Rp 400.000",
    },
    {
      title: "Tukang Pasang Keramik",
      date: "25/01/2024",
      duration: "6 Jam",
      category: "Renovasi",
      price: "Rp 500.000",
    },
    {
      title: "Tukang Ledeng",
      date: "28/01/2024",
      duration: "2 Jam",
      category: "Perbaikan",
      price: "Rp 170.000",
    },
    {
      title: "Tukang Bersih Rumah",
      date: "01/02/2024",
      duration: "3 Jam",
      category: "Kebersihan",
      price: "Rp 130.000",
    },
    {
      title: "Tukang Perbaiki Genteng",
      date: "05/02/2024",
      duration: "4 Jam",
      category: "Perbaikan",
      price: "Rp 300.000",
    },
    {
      title: "Tukang Servis Mesin Cuci",
      date: "10/02/2024",
      duration: "2 Jam",
      category: "Servis",
      price: "Rp 220.000",
    },
  ];

  return (
    <div className="history-page">
      <div className="history-header">
        <div className="history-header-left">
          <img src={Logo} id="logo" alt="TukangIN Logo" />
          <h1> TukangIN </h1>
          <div className="searchBar-container">
            <input type="text" id="search-field" placeholder="Search" />
          </div>
        </div>

        <div className="history-header-right">
          <h3> Hello, Prindapan </h3>
          {/* <img src="" id="profile-picture" alt="profile-picture" /> */}
        </div>
      </div>

      {/* Section Pertama */}
      <div className="history-overview">
        <h1> Riwayat Pesanan</h1>
        <div className="history-overview-cards">
          <div className="history-overview-cards">
            {dummyHistory.map((item, index) => (
              <div className="history-overview-card" key={index}>
                <div className="history-overview-card-left">
                  <h3>{item.title}</h3>
                  <div className="history-overview-card-left-detail">
                    <span>{item.date}</span>
                    <span>{item.duration}</span>
                    <span>{item.category}</span>
                  </div>
                </div>
                <h3>{item.price}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Baru */}
      <Footer />
    </div>
  );
};

export default HistoryPage;
