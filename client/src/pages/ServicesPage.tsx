import "./ServicesPage.css";

const services = [
  { title: "Cleaning" },
  { title: "Repair" },
  { title: "Installation" },
  { title: "Painting" },
  { title: "Plumbing" },
  { title: "Air Conditioning" },
  { title: "Gardening" },
  { title: "Furniture Assembly" },
  { title: "Electrical" },
];

const ServicesPage: React.FC = () => {
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
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="image-placeholder" />
              <div className="card-body">
                <h4>{service.title}</h4>
                <button>Read More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
