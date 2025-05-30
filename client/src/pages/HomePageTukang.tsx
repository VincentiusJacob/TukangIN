import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomePageTukang.css";
import Logo from "../assets/tukangin.png";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import HeaderTukang from "../components/TukangHeader";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const HomePageTukang: React.FC<{ userId: string }> = ({ userId }) => {
  const [completionTimeData, setCompletionTimeData] = useState([]);
  const [avgCompletionTime, setAvgCompletionTime] = useState(0);

  const [serviceUsage, setServiceUsage] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [weeklyOrders, setWeeklyOrders] = useState([]);

  const [completedJobs, setCompletedJobs] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [currentUserName, setCurrentUserName] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("tukangname");
    setCurrentUserName(username || "Tukang");

    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/dashboard/completion-time/${userId}`
        );
        setCompletionTimeData(res.data.completionTime);

        if (res.data.completionTime.length > 0) {
          const total = res.data.completionTime.reduce(
            (acc: any, cur: any) => acc + Number(cur.avg_duration_minutes),
            0
          );
          setAvgCompletionTime(
            Math.round(total / res.data.completionTime.length)
          );
        }

        // Fetch services
        const servicesRes = await axios.get(
          `http://localhost:3001/dashboard/services/${userId}`
        );
        setServiceUsage(
          servicesRes.data.services.map((s: any) => ({
            name: s.name,
            value: Number(s.value),
          }))
        );

        console.log("Service Usage Data:", servicesRes.data.services);

        // Fetch revenue
        const revenueRes = await axios.get(
          `http://localhost:3001/dashboard/revenue/${userId}`
        );
        setMonthlyRevenue(revenueRes.data.revenue);

        // Hitung total revenue dan completed jobs dari revenue dan services data
        const totalRev = revenueRes.data.revenue.reduce(
          (acc: any, cur: any) => acc + Number(cur.revenue),
          0
        );
        setTotalRevenue(totalRev);

        const completed = servicesRes.data.services.reduce(
          (acc: any, cur: any) => acc + Number(cur.value),
          0
        );
        setCompletedJobs(completed);

        const weeklyOrdersRes = await axios.get(
          `http://localhost:3001/dashboard/weekly-orders/${userId}`
        );
        setWeeklyOrders(weeklyOrdersRes.data.weeklyOrders);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [userId]);

  return (
    <div className="home-page-tukang">
      <HeaderTukang />

      <div className="main-content">
        <h2>{currentUserName}'s Dashboard</h2>

        <div className="main-content-cards">
          <div className="main-content-card">
            <h3>Avg Completion Time</h3>
            <p>{avgCompletionTime} minutes</p>
          </div>
          <div className="main-content-card">
            <h3>Completed Jobs</h3>
            <p>
              {serviceUsage.length === 0 ? "Belum ada data" : completedJobs}
            </p>
          </div>
          <div className="main-content-card">
            <h3>Total Revenue</h3>
            <p>
              {monthlyRevenue.length === 0
                ? "Belum ada data"
                : `Rp ${totalRevenue.toLocaleString("id-ID")}`}
            </p>
          </div>
        </div>

        <div className="main-content-charts-1">
          <div className="rating-chart">
            <h3>Completion Time Trend</h3>
            {completionTimeData.length === 0 ? (
              <p className="no-data-text">Belum ada data</p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={completionTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="avg_duration_minutes"
                    stroke="#82ca9d"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="pie-chart">
            <h3>Service Usage</h3>
            {serviceUsage.length === 0 ? (
              <p className="no-data-text">Belum ada data layanan</p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={serviceUsage}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {serviceUsage.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="main-content-charts-2">
          <div className="revenue-chart">
            <h3>Monthly Revenue</h3>
            {monthlyRevenue.length === 0 ? (
              <p className="no-data-text">Belum ada data pendapatan</p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="weekly-orders-chart">
            <h3>Weekly Completed Orders</h3>
            {weeklyOrders.length === 0 ? (
              <p className="no-data-text">Belum ada data order mingguan</p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={weeklyOrders}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="orders"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageTukang;
