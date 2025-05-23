import "./LandingPage.css";
import Logo from "../assets/tukangin.png";
import Mascot from "../assets/tukangin-mascot.png";
import VerifiedWorkers from "../assets/verified_workers.png";
import SafeInsured from "../assets/safe_insured.png";
import FastOnTime from "../assets/fast_ontime.png";
import Footer from "../components/Footer";
import TukangAC from "../assets/TukangAC.jpeg";
import AboutUs from "../assets/aboutusmascot.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LandingPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleBookClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="landing-page">
      <div className="first_section">
        <div className="header">
          <div className="header-left">
            <img src={Logo} alt="TukangiN Logo" />
            <h1> TukangIN </h1>
          </div>
          <button id="bookNowHeader" onClick={handleBookClick}>
            Book Now
          </button>
        </div>
        <div className="content">
          <div className="content_text">
            <h2>
              {" "}
              Need Help Fast? <br /> <strong>TukangIN</strong> Aja!
            </h2>
            <span>
              {" "}
              Trusted workers for cleaning, repairs, and more - just a fan away.{" "}
            </span>
            <button id="bookNowSectionOne" onClick={handleBookClick}>
              Book a Tukang now
            </button>
          </div>
          <img src={Mascot} alt="TukangIN Mascot" />
        </div>
      </div>

      <div className="second_section">
        <div className="second_section_text">
          <h2>About Us</h2>
          <span>
            {" "}
            At TukangIN, we're dedicated to making your life easier by
            connecting you with skilled and reliable service professionals—right
            when you need them. Whether it's fixing a leaky faucet, installing
            air conditioning, or handling a full home renovation, we’ve got the
            right person for the job. We offer a wide range of household and
            maintenance services tailored to your daily needs. All of our
            workers are carefully selected, trained, and experienced to ensure
            high-quality workmanship, professionalism, and trust. Your comfort,
            safety, and satisfaction are our top priorities. No more wasting
            time searching for a trustworthy handyman. With just a few clicks,
            TukangIN brings dependable help to your doorstep—on time, every
            time.
          </span>
          <button id="learn-more"> Learn More </button>
        </div>
        <img src={AboutUs} alt="TukangIN Image" />
      </div>

      <div className="third_section">
        <h2> Why TukangIN </h2>
        <div className="third_section_why">
          <div className="reason">
            <img src={VerifiedWorkers} alt="Verified Workers" />
            <h4> Verified Workers </h4>
          </div>
          <div className="reason">
            <img src={FastOnTime} alt="Fast & On Time" />
            <h4>Fast & On-Time </h4>
          </div>
          <div className="reason">
            <img src={SafeInsured} alt="Safe & Insured" />
            <h4> Safe & Insured </h4>
          </div>
        </div>
      </div>

      <div className="fourth_section">
        <h2> Our Services </h2>
        <div className="fourth_section_services">
          <div className="fourth_section_service">
            <img src="" />
            <h4> Service 1 </h4>
            <span> Gunakan layanan kami untuk Service 1 </span>
            <button> Read More For Details </button>
          </div>
          <div className="fourth_section_service">
            <img src="" />
            <h4> Service 1 </h4>
            <span> Gunakan layanan kami untuk Service 1 </span>
            <button> Read More For Details </button>
          </div>
          <div className="fourth_section_service">
            <img src="" />
            <h4> Service 1 </h4>
            <span> Gunakan layanan kami untuk Service 1 </span>
            <button> Read More For Details </button>
          </div>
          <div className="fourth_section_service">
            <img src="" />
            <h4> Service 1 </h4>
            <span> Gunakan layanan kami untuk Service 1 </span>
            <button> Read More For Details </button>
          </div>
          <div className="fourth_section_service">
            <img src="" />
            <h4> Service 1 </h4>
            <span> Gunakan layanan kami untuk Service 1 </span>
            <button> Read More For Details </button>
          </div>
          <div className="fourth_section_service">
            <img src="" />
            <h4> Service 1 </h4>
            <span> Gunakan layanan kami untuk Service 1 </span>
            <button> Read More For Details </button>
          </div>
        </div>
        <button id="explore-more-service"> Explore More </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Silakan Login atau Register Terlebih Dahulu</h3>
            <div className="modal-buttons">
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/registercustomer")}>
                Register as Customer
              </button>
              <button onClick={() => navigate("/registertukang")}>
                Register as Tukang
              </button>
            </div>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default LandingPage;
