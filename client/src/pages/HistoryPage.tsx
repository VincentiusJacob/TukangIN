import React, { useState, useEffect } from "react";
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
import Header from "../components/Header";
import axios from "axios";

const HistoryPage: React.FC = () => {
  const [historyOrder, setHistoryOrder] = useState<any[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userId = localStorage.getItem("customerid");
        if (userId) {
          const response = await axios.get(
            `http://localhost:3001/history/${userId}`
          );

          console.log("History Data:", response.data);
          setHistoryOrder(response.data.history || []);
        } else {
          console.error("User ID not found in localStorage.");
        }
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };

    fetchHistory();
  }, []);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(historyOrder.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = historyOrder.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const totalSpent = historyOrder.reduce((acc, item) => {
    const numericPrice = parseInt((item.price || "").replace(/[^\d]/g, ""));
    return acc + (isNaN(numericPrice) ? 0 : numericPrice);
  }, 0);

  const categoryCount = historyOrder.reduce<Record<string, number>>(
    (acc, item) => {
      if (item.category) {
        acc[item.category] = (acc[item.category] || 0) + 1;
      }
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
      <Header />

      <div className="total-spent">
        <h2>Total Expenses: Rp {totalSpent.toLocaleString("id-ID")}</h2>
      </div>

      <div className="history-overview">
        <h1>Orders History </h1>
        <div className="history-overview-cards">
          {currentItems.length === 0 ? (
            <p style={{ textAlign: "center", fontStyle: "italic" }}>
              You have no order history...
            </p>
          ) : (
            currentItems.map((item, index) => (
              <div className="history-overview-card" key={index}>
                <div className="history-overview-card-left">
                  <h3>{item.title}</h3>
                  <div className="history-overview-card-left-detail">
                    <span>{item.date}</span>
                    <span>{item.duration} minutes</span>
                    <span>{item.category}</span>
                  </div>
                </div>
                <h3> Rp {item.price}</h3>
              </div>
            ))
          )}
        </div>

        {historyOrder.length > 0 && (
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
        )}
      </div>

      {historyOrder.length > 0 && (
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
      )}

      {historyOrder.length > 0 && (
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
      )}

      <Footer />
    </div>
  );
};

export default HistoryPage;
