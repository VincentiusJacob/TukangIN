import "./LandingPage.css";
import Logo from "../assets/tukangin.png";
import Mascot from "../assets/tukangin-mascot.png";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <div className="first_section">
        <div className="header">
          <div className="header-left">
            <img src={Logo} alt="TukangiN Logo" />
            <h1> TukangIN </h1>
          </div>
          <button id="bookNowHeader">Book Now</button>
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
            <button id="bookNowSectionOne">Book a Tukang now</button>
          </div>
          <img src={Mascot} alt="TukangIN Mascot" />
        </div>
      </div>

      <div className="second_section">
        <div className="second_section_text">
          <h2>About Us</h2>
          <span>
            {" "}
            We offer a wide range of services to meet your needs. Our workers
            are trained and experienced, ensuring quality and reliability.
          </span>
          <button id="learn-more"> Learn More </button>
        </div>
        <img src="" alt="About TukangIN" />
      </div>
    </div>
  );
};

export default LandingPage;
