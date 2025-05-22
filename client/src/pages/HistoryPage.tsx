import React, { useState } from "react";
import "./HistoryPage.css";
import Footer from "../components/Footer";
import Logo from "../assets/tukangin.png";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(dummyHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = dummyHistory.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const totalSpent = dummyHistory.reduce((acc, item) => {
    const numericPrice = parseInt(item.price.replace(/[^\d]/g, ""));
    return acc + numericPrice;
  }, 0);

  const categoryCount = dummyHistory.reduce<Record<string, number>>(
    (acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    },
    {}
  );

  const topCategories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const chartData = Object.entries(categoryCount).map(([category, count]) => ({
    category,
    count,
  }));

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
          <h3>Hello, Prindapan</h3>
        </div>
      </div>

      {/* Total Pengeluaran */}
      <div className="total-spent">
        <h2>Total Pengeluaran: Rp {totalSpent.toLocaleString("id-ID")}</h2>
      </div>

      {/* Riwayat */}
      <div className="history-overview">
        <h1>Riwayat Pesanan</h1>
        <div className="history-overview-cards">
          {currentItems.map((item, index) => (
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

        <div className="pagination-controls">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span style={{ margin: "0 10px" }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Top Order */}
      <div className="top-order">
        <h1>Paling Sering Dipesan</h1>
        <div className="top-order-cards">
          {topCategories.map(([category, count], index) => (
            <div className="top-order-card" key={index}>
              <h3>{category}</h3>
              <p>{count} kali dipesan</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="usage-chart">
        <h1>Statistik Penggunaan Layanan</h1>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#007acc" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Footer />
    </div>
  );
};

export default HistoryPage;
