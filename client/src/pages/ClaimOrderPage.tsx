import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./ClaimOrderPage.css";
import TukangHeader from "../components/TukangHeader";

const ClaimOrderPage: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const tukangId = localStorage.getItem("tukangid");

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const fetchPendingOrders = async () => {
    try {
      const result = await axios.get("http://localhost:3001/orders/pending");
      setOrders(result.data.orders);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  const handleClaim = async (orderId: number) => {
    try {
      const result = await axios.post("http://localhost:3001/orders/claim", {
        order_id: orderId,
        tukang_id: tukangId,
      });

      Swal.fire("Berhasil!", "Job berhasil diambil!", "success");
      fetchPendingOrders();
    } catch (err: any) {
      Swal.fire(
        "Gagal!",
        err.response?.data?.message || "Gagal mengambil job",
        "error"
      );
    }
  };

  return (
    <div className="claim-order-page">
      <TukangHeader />

      <div className="claim-page" style={{ padding: "2rem" }}>
        <h2>Daftar Order Menunggu</h2>
        {orders.length === 0 ? (
          <p>Tidak ada order yang menunggu saat ini.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Service</th>
                <th>Booking Date</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.customer_name}</td>
                  <td>{order.service_name}</td>
                  <td>
                    {new Date(order.order_date).toISOString().split("T")[0]}
                  </td>

                  <td>Rp {order.price.toLocaleString("id-ID")}</td>
                  <td>
                    <button onClick={() => handleClaim(order.order_id)}>
                      Take Job
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ClaimOrderPage;
