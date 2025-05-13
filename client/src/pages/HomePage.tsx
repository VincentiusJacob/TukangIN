import Logo from "../assets/tukangin.png";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Footer from "../components/Footer";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./HomePage.css";
import { useState } from "react";

const HomePage: React.FC = () => {
  const [selectedKebutuhan, setSelectedKebutuhan] =
    useState("Apa Kebutuhanmu?");
  const [selectedDomisili, setSelectedDomisili] = useState("Domisili Kamu?");
  const [showKebutuhan, setShowKebutuhan] = useState(false);
  const [showDomisili, setShowDomisili] = useState(false);
  const [selectedDomisiliRankTukang, setSelectedDomisiliRankTukang] =
    useState("All");

  const dummyData = [
    {
      id: 1,
      nama: "Budi Santoso",
      rating: 4.9,
      selesai: 124,
      domisili: "Jakarta",
    },
    {
      id: 2,
      nama: "Agus Wijaya",
      rating: 4.8,
      selesai: 117,
      domisili: "Bandung",
    },
    {
      id: 3,
      nama: "Rahmat Hidayat",
      rating: 4.7,
      selesai: 109,
      domisili: "Surabaya",
    },
    {
      id: 4,
      nama: "Joko Prasetyo",
      rating: 4.6,
      selesai: 96,
      domisili: "Bekasi",
    },
    {
      id: 5,
      nama: "Toni Saputra",
      rating: 4.5,
      selesai: 89,
      domisili: "Denpasar",
    },
    {
      id: 6,
      nama: "Timothy Ronald",
      rating: 4.3,
      selesai: 70,
      domisili: "Jakarta",
    },
  ];

  const filteredData =
    selectedDomisiliRankTukang === "All"
      ? dummyData
      : dummyData.filter(
          (item) => item.domisili === selectedDomisiliRankTukang
        );

  const sortedData = [...filteredData].sort((a, b) => b.rating - a.rating);

  const uniqueDomisili = [
    "All",
    ...new Set(dummyData.map((item) => item.domisili)),
  ];
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="homePage">
        <div className="homePage-header">
          <div className="homePage-header-left">
            <img src={Logo} id="logo" alt="TukangIN Logo" />
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
            <span className="ads-title"> Promo Mei Ceria </span>
            <span className="ads-description">
              {" "}
              Dapatkan diskon hingga 60%{" "}
            </span>
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
            <div className="dropdown">
              <DropdownButton
                id="dropdown-button-kebutuhan"
                drop="down-centered"
                variant="light"
                show={showKebutuhan}
                onToggle={() => setShowKebutuhan(!showKebutuhan)}
                title={selectedKebutuhan}
              >
                <Dropdown.Item
                  onClick={() => {
                    setSelectedKebutuhan("Tukang AC");
                    setShowKebutuhan(false);
                  }}
                >
                  Tukang AC
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setSelectedKebutuhan("Tukang Listrik");
                    setShowKebutuhan(false);
                  }}
                >
                  Tukang Listrik
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setSelectedKebutuhan("Tukang Bersih-Bersih");
                    setShowKebutuhan(false);
                  }}
                >
                  Tukang Bersih-Bersih
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setSelectedKebutuhan("Tukang Installasi");
                    setShowKebutuhan(false);
                  }}
                >
                  Tukang Installasi
                </Dropdown.Item>
              </DropdownButton>
            </div>

            <div className="dropdown">
              <DropdownButton
                id="dropdown-button-domisili"
                drop="down-centered"
                variant="light"
                show={showDomisili}
                onToggle={() => setShowDomisili(!showDomisili)}
                title={selectedDomisili}
              >
                <Dropdown.Item
                  onClick={() => {
                    setSelectedDomisili("DKI Jakarta");
                    setShowDomisili(false);
                  }}
                >
                  DKI Jakarta
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setSelectedDomisili("Bandung, Jawa Barat");
                    setShowDomisili(false);
                  }}
                >
                  Bandung, Jawa Barat
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setSelectedDomisili("Surabaya, Jawa Timur");
                    setShowDomisili(false);
                  }}
                >
                  Surabaya, Jawa Timur
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setSelectedDomisili("Denpasar, Bali");
                    setShowDomisili(false);
                  }}
                >
                  Denpasar, Bali
                </Dropdown.Item>
              </DropdownButton>
            </div>

            <div>
              <DemoItem label="">
                <DesktopDatePicker
                  defaultValue={dayjs("2022-04-17")}
                  slotProps={{ textField: { variant: "standard" } }}
                />
              </DemoItem>
            </div>

            <button id="bookBtn">Book</button>
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
          <h2> Popular Services This Week </h2>
          <div className="popular-services">
            <div className="popular-service"></div>
            <div className="popular-service"></div>
            <div className="popular-service"></div>
          </div>
        </div>

        <div className="best-overall-tukang">
          <h2>🏆 Best Overall Tukang</h2>

          <div className="ranking-controls">
            <label>Filter Domisili:</label>
            <select
              onChange={(e) => setSelectedDomisiliRankTukang(e.target.value)}
              value={selectedDomisiliRankTukang}
            >
              {uniqueDomisili.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <table className="ranking-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Rating ⭐</th>
                <th>Pekerjaan Selesai</th>
                <th>Domisili</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.slice(0, 10).map((item, index) => (
                <tr key={item.id} className={index === 0 ? "first-place" : ""}>
                  <td>{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.rating}</td>
                  <td>{item.selesai}</td>
                  <td>{item.domisili}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Footer />
      </div>
    </LocalizationProvider>
  );
};

export default HomePage;
