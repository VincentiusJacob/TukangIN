import "./PaymentPage.css";
import Card from "../assets/abstractcard.png";

const PaymentPage: React.FC = () => {
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
              <select>
                <option value="">-- Pilih Metode Pembayaran --</option>
                <option value="bca_va">BCA Virtual Account</option>
                <option value="ovo">OVO</option>
                <option value="gopay">GoPay</option>
                <option value="dana">DANA</option>
                <option value="bank_transfer">Transfer Bank Manual</option>
              </select>
            </div>
          </div>
          <div className="payment-summary">
            <div className="summary-item">
              <span> Subtotal </span>
              <strong> Rp 200.000</strong>
            </div>
            <div className="summary-item">
              <span> Tax </span>
              <strong> Rp 10.000 </strong>
            </div>
            <div className="summary-item">
              <span> Method </span>
              <strong> BCA Virtual Account </strong>
            </div>
            <div className="summary-item">
              <span>
                {" "}
                <strong> Total </strong>
              </span>
              <strong> Rp 210.000 </strong>
            </div>
          </div>
          <button id="pay-btn"> Pay </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
