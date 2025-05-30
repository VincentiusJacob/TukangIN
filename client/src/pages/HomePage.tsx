import Select from "react-select";
import type { SingleValue } from "react-select";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Footer from "../components/Footer";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./HomePage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import WaitingIcon from "./../assets/waiting.png";
import Discount from "./../assets/discount.png";
import Header from "../components/Header";

type OptionType = { value: string; label: string } | null;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [bookingDate, setBookingDate] = useState("");
  const [upcomingOrder, setUpcomingOrder] = useState<any | null>(null);
  const [selectedDomisiliRankTukang, setSelectedDomisiliRankTukang] =
    useState("All");
  const [userOrderHistory, setUserOrderHistory] = useState<any[]>([]);
  const [servicesForYou, setServicesForYou] = useState<any[]>([]);
  const [servicesByLocation, setServicesByLocation] = useState<any[]>([]);
  const [selectedDomisili, setSelectedDomisili] = useState<OptionType>(null);
  const [selectedKebutuhan, setSelectedKebutuhan] = useState<OptionType>(null);

  useEffect(() => {
    const userId = localStorage.getItem("customerid");

    const fetchOrderHistory = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3001/order-history/${userId}`
          );

          console.log("order-history ", response.data);
          const orders = response.data.orders;
          setUserOrderHistory(orders);
          setUpcomingOrder(getNearestUpcomingOrder(orders));
        } catch (error) {
          console.error("Error fetching order history:", error);
        }
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/services");

        if (response.data) {
          console.log(response.data);
          const allServices = response.data.services;

          const shuffled = allServices.sort(() => 0.5 - Math.random());
          const randomSix = shuffled.slice(0, 6);

          console.log("Random 6 services:", randomSix);
          return randomSix;
        } else {
          console.error("Failed to fetch services:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchOrderHistory();
    fetchServices().then(setServicesForYou);
  }, []);

  const fetchServicesByLocation = async (city: any) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/services/by-location?city=${city}`
      );

      if (response.data) {
        console.log(response.data);
        setServicesByLocation(response.data);
      } else {
        console.error("Failed to fetch services by location");
        setServicesByLocation([]);
      }
    } catch (error) {
      console.error("Error fetching services by location:", error);
    }
  };

  const handleBook = () => {
    if (!selectedDomisili || !selectedKebutuhan || !bookingDate) {
      toast.error("Harap pilih domisili, kebutuhan, dan tanggal booking!");
      return;
    }

    navigate("/payment", {
      state: {
        domisili: selectedDomisili.value,
        service: selectedKebutuhan.value,
        bookingDate: bookingDate,
      },
    });
  };

  const getNearestUpcomingOrder = (orders: any[]) => {
    const today = dayjs().startOf("day");

    const pendingOrders = orders
      .filter(
        (order) =>
          order.status.toLowerCase() === "pending" &&
          dayjs(order.order_date).isAfter(today)
      )
      .sort(
        (a, b) => dayjs(a.order_date).valueOf() - dayjs(b.order_date).valueOf()
      );

    return pendingOrders.length > 0 ? pendingOrders[0] : null;
  };

  const domisiliOptions = [
    { value: "Jakarta", label: "Jakarta" },
    { value: "Bandung", label: "Bandung" },
    { value: "Surabaya", label: "Surabaya" },
    { value: "Semarang", label: "Semarang" },
    { value: "Tangerang", label: "Tangerang" },
    { value: "Bekasi", label: "Bekasi" },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="homePage">
        <Header />

        <div className="homePage-ads">
          <div className="homePage-ads-texts">
            <span className="ads-title">
              {" "}
              Promo Mei <strong>Ceria!</strong>{" "}
            </span>
            <span className="ads-description">
              {" "}
              Dapatkan diskon <span className="ads-highlight">
                hingga 60%
              </span>{" "}
            </span>
            <div className="slogan shine-effect">
              <span>
                {" "}
                <span id="slogan-firstword"> Makin Hemat,</span>{" "}
                <span id="slogan-secondword"> Hidup Tenang</span>
              </span>
            </div>
          </div>
          <div
            className="homePage-ads-img"
            style={{
              width: "40%",
              borderRadius: "10px",
              backgroundImage: `url(${Discount})`,
              backgroundSize: "cover",
            }}
          ></div>
        </div>

        <div className="order-status-live">
          {upcomingOrder ? (
            <div className="order-status-live-order">
              <table className="order-status-table">
                <tbody>
                  <tr>
                    <th>Service</th>
                    <td>{upcomingOrder.order_title}</td>
                  </tr>
                  <tr>
                    <th>Tanggal</th>
                    <td>
                      {dayjs(upcomingOrder.order_date).format("DD MMM YYYY")}
                    </td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>{upcomingOrder.status}</td>
                  </tr>
                </tbody>
              </table>
              <img
                src={WaitingIcon}
                alt="waiting-icon"
                height={230}
                width={230}
              />
            </div>
          ) : (
            <div className="order-status-live-order-unactive">
              <h3> You have no pending order... </h3>
            </div>
          )}
        </div>

        <div className="order-tukang">
          <h2>Pesan Tukang</h2>

          <div className="order-tukang-fields">
            <div className="dropdown">
              <Select
                placeholder="Pilih Domisili"
                options={domisiliOptions}
                value={selectedDomisili}
                onChange={(option: SingleValue<OptionType>) => {
                  setSelectedDomisili(option);
                  fetchServicesByLocation(option?.value);
                  setSelectedKebutuhan(null);
                }}
              />
            </div>

            <div className="dropdown">
              <Select
                placeholder="Apa Kebutuhanmu?"
                options={servicesByLocation.map((job) => ({
                  value: job.service_name,
                  label: job.service_name,
                }))}
                value={selectedKebutuhan}
                onChange={(option) => setSelectedKebutuhan(option)}
                isDisabled={!selectedDomisili}
                noOptionsMessage={() => "Pilih domisili dulu"}
              />
            </div>

            <div>
              <DemoItem label="">
                <DesktopDatePicker
                  value={bookingDate ? dayjs(bookingDate) : null}
                  onChange={(value) => {
                    if (value) {
                      const today = dayjs().startOf("day");
                      if (value.isBefore(today)) {
                        toast.error(
                          "Tanggal booking tidak boleh di masa lalu!"
                        );
                      } else {
                        setBookingDate(value.format("YYYY-MM-DD"));
                      }
                    }
                  }}
                  slotProps={{ textField: { variant: "standard" } }}
                />
              </DemoItem>
            </div>

            <button id="bookBtn" onClick={handleBook}>
              Book
            </button>
          </div>
        </div>

        <div className="order-history">
          <div className="order-history-top">
            <h2> Riwayat Order </h2>
            <a href="/history" style={{ cursor: "pointer" }}>
              {" "}
              See More
            </a>
          </div>
          <div className="order-history-content">
            {userOrderHistory.length > 0 ? (
              <table className="order-history-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userOrderHistory.map((order) => (
                    <tr key={order.id}>
                      <td>{order.order_title}</td>
                      <td>Rp {order.price}</td>
                      <td>{dayjs(order.order_date).format("DD/MM/YYYY")}</td>
                      <td>
                        {dayjs(order.order_date)
                          .startOf("day")
                          .isAfter(dayjs().startOf("day"))
                          ? "On Process"
                          : "Completed"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <span id="no-order-history"> You have no order history yet.</span>
            )}
          </div>
        </div>

        <div className="services-designed-around-you">
          <div className="services-designed-around-you-top">
            <h2> Services designed around you</h2>
            <a href="/services" style={{ cursor: "pointer" }}>
              {" "}
              See More
            </a>
          </div>
          <div className="services-designed-around-you-content">
            {servicesForYou.length > 0
              ? servicesForYou.map((service) => {
                  return (
                    <div className="services-designed-sample" key={service.id}>
                      <div
                        style={{
                          width: "100%",
                          height: "300px",
                          backgroundImage: `url(${service.image_url})`,
                          backgroundSize: "cover",
                        }}
                      >
                        {" "}
                      </div>
                      <div className="service-description">
                        <h3>{service.service_name}</h3>
                        <p>{service.description}</p>
                      </div>
                    </div>
                  );
                })
              : "No services available at the moment."}
          </div>
        </div>

        <Footer />
        <ToastContainer />
      </div>
    </LocalizationProvider>
  );
};

export default HomePage;
