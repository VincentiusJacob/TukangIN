import "./PaymentPage.css";
import Card from "../assets/abstractcard.png";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [certainService, setCertainService] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [subtotal, setSubtotal] = useState<number>(0);
  const location = useLocation();
  const { domisili, service, bookingDate } = location.state || {};

  useEffect(() => {
    const fetchCertainService = async () => {
      if (!service) return;
      try {
        const result = await axios.get(
          `http://localhost:3001/service/search/${encodeURIComponent(service)}`
        );
        if (result.data.success) {
          setCertainService(result.data.service);
          const durationHours = result.data.service.duration_minutes / 60;
          const subtotalPrice =
            durationHours * result.data.service.price_per_hour;
          setSubtotal(subtotalPrice);
        }
      } catch (error: any) {
        console.log("Error fetching service: ", error.message || error);
      }
    };

    fetchCertainService();
  }, [service]);

  const handlePayment = async () => {
    if (!certainService || !paymentMethod) return alert("Lengkapi semua data!");

    try {
      const userId = localStorage.getItem("customerid");

      const orderResult = await axios.post("http://localhost:3001/order", {
        user_id: userId,
        service_id: certainService.service_id,
        booking_date: bookingDate,
        duration_minutes: certainService.duration_minutes,
        subtotal,
        service_name: certainService.service_name,
      });

      const order_id = orderResult.data.order_id;

      await axios.post("http://localhost:3001/payment", {
        order_id,
        method: paymentMethod,
        amount: subtotal + 10000,
      });

      Swal.fire({
        title: "Berhasil!",
        text: "Order Anda sedang menunggu tukang yang sesuai.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/home");
      });
    } catch (error: any) {
      console.error("Payment error: ", error);
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat memproses pembayaran.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <div className="payment-card-left">
          <h1> Service Booked </h1>
          <img src={Card} width={400} height={300} />
          <span>
            <strong>Pesan tukang dengan percaya diri!</strong> TukangIN hadir
            untuk bantu Anda temukan tukang terbaik—cepat, aman, dan transparan.
          </span>
          <span>
            <strong>Layanan sesuai kebutuhan Anda!</strong> Mau renovasi rumah,
            pasang AC, atau servis motor? Semua bisa Anda booking langsung dari
            genggaman.
          </span>
        </div>
        <div className="payment-card-right">
          <h2> Payment Details</h2>
          <div className="payment-card-right-description">
            <div className="payment-card-right-description-left">
              {/* <div className="description-payment">
                <strong> Tukang: </strong>
                <span></span>
              </div> */}
              <div className="description-payment">
                <strong>Service: </strong>
                <span> {certainService?.service_name || service || "-"}</span>
              </div>
              <div className="description-payment">
                <strong> Date: </strong>
                <span> {bookingDate || "-"}</span>
              </div>
            </div>
            <div className="payment-card-right-description-right">
              <div className="description-payment">
                <strong> Domisili: </strong>
                <span> {domisili || "-"}</span>
              </div>
              <div className="description-payment">
                <strong> Duration: </strong>
                <span> {certainService?.duration_minutes || "-"} menit</span>
              </div>
            </div>
          </div>
          <span> Complete your purchase by providing the payment details</span>
          <div className="payment-card-right-form">
            <div className="payment-field">
              <label>Alamat Email</label>
              <input type="email" placeholder="contoh@email.com" />
            </div>

            <div className="payment-field">
              <label>Nomor Telepon</label>
              <input type="tel" placeholder="0812xxxxxxx" />
            </div>

            <div className="payment-field">
              <label>Metode Pembayaran</label>
              <select
                onChange={(e) => setPaymentMethod(e.target.value)}
                value={paymentMethod}
              >
                <option value="">-- Pilih Metode Pembayaran --</option>
                <option value="BCA Virtual Account">BCA Virtual Account</option>
                <option value="OVO">OVO</option>
                <option value="Gopay">GoPay</option>
                <option value="Dana">DANA</option>
              </select>
            </div>
          </div>
          <div className="payment-summary">
            <div className="summary-item">
              <span> Subtotal </span>
              <strong> Rp {subtotal.toLocaleString("id-ID")}</strong>
            </div>
            <div className="summary-item">
              <span> Tax </span>
              <strong> Rp 10.000 </strong>
            </div>
            <div className="summary-item">
              <span> Method </span>
              <strong> {paymentMethod || "-"} </strong>
            </div>
            <div className="summary-item">
              <span>
                <strong> Total </strong>
              </span>
              <strong> Rp {(subtotal + 10000).toLocaleString("id-ID")} </strong>
            </div>
          </div>
          <button id="pay-btn" onClick={handlePayment}>
            {" "}
            Pay{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
