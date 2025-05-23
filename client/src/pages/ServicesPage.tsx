import "./ServicesPage.css";
import axios from "axios";
import { useState, useEffect } from "react";

const ServicesPage: React.FC = () => {
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/services");
        setServicesList(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="services-page-container">
      <div className="services-page-poster">
        <h1>
          Discover How We <br /> Can Help You <br /> Thrive
        </h1>
      </div>

      <div className="services-page-content">
        <div className="services-search-bar">
          <input type="text" placeholder="Search ..." />
          <button>
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className="services-grid">
          {loading ? (
            <p>Loading services...</p>
          ) : (
            servicesList.map((service, index) => (
              <div className="service-card" key={index}>
                <div className="image-placeholder" />
                <div className="card-body">
                  <h4>{service.title}</h4>
                  <button>Read More</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
