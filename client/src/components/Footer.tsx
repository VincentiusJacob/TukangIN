import Logo from "../assets/tukangin.png";
import {
  FaFacebook,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-brand">
            <img src={Logo} alt="TukangIN Logo" className="footer-logo" />
            <span className="brand-text">TukangIN</span>
          </div>
          <p className="copyright">© 2025 TukangIN. All rights reserved.</p>
        </div>

        <div className="footer-middle">
          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li>About Us</li>
              <li>Our Services</li>
              <li>Privacy Policy</li>
              <li>Our Team</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Help</h3>
            <ul>
              <li>Contact Us</li>
              <li>Help Center</li>
              <li>FAQ</li>
              <li>Report an issue</li>
            </ul>
          </div>
        </div>

        <div className="footer-right">
          <h3>Follow us</h3>
          <div className="social-icons">
            <FaFacebook />
            <FaXTwitter />
            <FaInstagram />
            <FaYoutube />
          </div>
          <p className="address">
            Jl. Melati Indah No. 27, RT 04 / RW 09
            <br />
            Kelurahan Sukamaju, Kecamatan Serpong
            <br />
            Kota Tangerang Selatan, Banten 15310
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
