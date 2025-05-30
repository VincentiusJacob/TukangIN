import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrdersTukang.css";
import TukangHeader from "../components/TukangHeader";

interface Order {
  order_id: number;
  customer_name: string;
  service_name: string;
  order_date: string;
  status: string;
  total_price: number;
}

const OrdersTukang: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  const userId = localStorage.getItem("tukangid");

  const fetchOrders = async (page: number) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/dashboard/orders/${userId}?page=${page}`
      );
      setOrders(res.data.orders);
      setTotalOrders(res.data.total);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchOrders(currentPage);
    }
  }, [userId, currentPage]);

  const totalPages = Math.ceil(totalOrders / 10);

  return (
    <div className="home-page-tukang">
      <TukangHeader />

      <div className="orders-tukang-page">
        <h1> Riwayat Order</h1>

        <div className="orders-tukang-list">
          {orders.length === 0 ? (
            <p> You have not completed anything.</p>
          ) : (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.order_id}>
                    <td>{order.customer_name}</td>
                    <td>{order.service_name}</td>
                    <td>
                      {new Date(order.order_date).toLocaleDateString("id-ID")}
                    </td>
                    <td>{order.status}</td>
                    <td>Rp {order.total_price.toLocaleString("id-ID")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {orders.length > 0 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span>
                {" "}
                Page {currentPage} of {totalPages}{" "}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < totalPages ? prev + 1 : prev
                  )
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersTukang;
