import "./ServicesPage.css";
import axios from "axios";
import { useState, useEffect } from "react";
import DiscoverBg from "./../assets/discover.png";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/services");
        console.log(response.data);
        setServicesList(response.data.services);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = servicesList.filter((service) =>
    service.service_name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleReadMore = (serviceName: string) => {
    navigate(`/services/${encodeURIComponent(serviceName)}`);
  };

  return (
    <div className="services-page-container">
      <Header />
      <div
        className="services-page-poster"
        style={{
          backgroundImage: `url(${DiscoverBg})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <h1>
          Discover How We <br /> Can Help You <br /> Thrive
        </h1>
      </div>

      <div className="services-page-content">
        <div className="services-search-bar">
          <input
            type="text"
            placeholder="Search ..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button>
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className="services-grid">
          {loading ? (
            <p>Loading services...</p>
          ) : filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <div className="service-card" key={index}>
                <div
                  style={{
                    width: "100%",
                    height: "300px",
                    backgroundImage: `url(${service.image_url})`,
                    backgroundSize: "cover",
                  }}
                />
                <div className="card-body">
                  <h4>{service.service_name}</h4>
                  <button onClick={() => handleReadMore(service.service_name)}>
                    Read More
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No matching services found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
