import Logo from "../assets/tukangin.png";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Footer from "../components/Footer";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const HomePage: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="homePage">
        <div className="homePage-header">
          <div className="homePage-header-left">
            <img src={Logo} alt="TukangIN Logo" />
            <h1> TukangIN </h1>
            <div className="searchBar-container">
              <input type="text" id="search-field" placeholder="Search" />
            </div>
          </div>

          <div className="homePage-header-right">
            <h3> Hello, Prindapan </h3>
            {/* <img src="" id="profile-picture" alt="profile-picture" /> */}
          </div>
        </div>

        <div className="homePage-ads">
          <div className="homePage-ads-texts">
            <span> Promo Mei Ceria </span>
            <span> Dapatkan diskon hingga 60% </span>
            <div className="slogan">
              <span>
                {" "}
                <span id="slogan-firstword"> Makin Hemat,</span>{" "}
                <span id="slogan-secondword"> Hidup Tenang</span>
              </span>
            </div>
          </div>
          <div className="homePage-ads-img">{/* <img src="" /> */}</div>
        </div>

        <div className="order-status-live">
          <h3> You have no order right now...</h3>
        </div>

        <div className="order-tukang">
          <h2> Pesen Tukang </h2>

          <div className="order-tukang-fields">
            {/* Ni gw buat yg apa kebutuhanmu dropdown */}
            <DropdownButton
              id="dropdown-button-kebutuhan"
              drop="down-centered"
              variant="secondary"
              title={`Apa Kebutuhanmu?`}
            >
              <Dropdown.Item eventKey="1">Tukang AC</Dropdown.Item>
              <Dropdown.Item eventKey="2">Tukang Listrik</Dropdown.Item>
              <Dropdown.Item eventKey="3">
                Tukang Bersih-Bersih Rumah
              </Dropdown.Item>
              <Dropdown.Item eventKey="4">
                Tukang Installasi Elektronik
              </Dropdown.Item>
            </DropdownButton>

            {/* Ni buat yang domisili  */}
            <DropdownButton
              id="dropdown-button-domisili"
              drop="down-centered"
              variant="secondary"
              title={`Domisili Kamu?`}
            >
              <Dropdown.Item eventKey="1">DKI Jakarta</Dropdown.Item>
              <Dropdown.Item eventKey="2">Bandung, Jawa Barat</Dropdown.Item>
              <Dropdown.Item eventKey="3">Surabaya, Jawa Timur</Dropdown.Item>
              <Dropdown.Item eventKey="4">Denpasar, Bali</Dropdown.Item>
            </DropdownButton>

            {/* ini buat pick date */}
            <DemoItem label="Desktop variant">
              <DesktopDatePicker defaultValue={dayjs("2022-04-17")} />
            </DemoItem>

            <button id="bookBtn"> Book </button>
          </div>
        </div>

        <div className="order-history">
          <div className="order-history-top">
            <h2> Your Order History </h2>
            <a> See More</a>
          </div>
          <div className="order-history-content"></div>
        </div>

        <div className="services-designed-around-you">
          <div className="services-designed-around-you-top">
            <h2> Services designed around you</h2>
            <a> See More</a>
          </div>
          <div className="services-designed-around-you-content">
            <div className="services-designed-sample"></div>
            <div className="services-designed-sample"></div>
            <div className="services-designed-sample"></div>
            <div className="services-designed-sample"></div>
            <div className="services-designed-sample"></div>
            <div className="services-designed-sample"></div>
          </div>
        </div>

        <div className="popular-services-this-week">
          <div className="popular-service"></div>
          <div className="popular-service"></div>
          <div className="popular-service"></div>
        </div>

        <div className="best-overall-tukang">
          <table>
            <thead>
              <tr>
                <th> No </th>
                <th> Nama </th>
                <th> Rating </th>
                <th> Pekerjaan Selesai </th>
                <th> Domisili </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>

        <Footer />
      </div>
    </LocalizationProvider>
  );
};

export default HomePage;
