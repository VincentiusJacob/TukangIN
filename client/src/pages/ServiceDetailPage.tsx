// src/pages/ServiceDetailPage.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ServiceDetailPage.css"; // Ensure you have this CSS file for styling
import { useNavigate } from "react-router-dom";

const ServiceDetailPage: React.FC = () => {
  const navigation = useNavigate();
  const { serviceName } = useParams();
  const [serviceDetail, setServiceDetail] = useState<any>(null);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/service/search/${encodeURIComponent(
            serviceName || ""
          )}`
        );
        if (res.data.success) {
          setServiceDetail(res.data.service);
        }
      } catch (err) {
        console.error("Error loading service detail", err);
      }
    };

    fetchServiceDetail();
  }, [serviceName]);

  if (!serviceDetail) return <p>Loading service detail...</p>;

  return (
    <div className="service-detail-page">
      <img src={serviceDetail.image_url} alt={serviceDetail.service_name} />
      <div className="service-detail-content">
        <h1>{serviceDetail.service_name}</h1>
        <div className="service-detail-content-topic">
          <span> Category :</span>
          <strong> {serviceDetail.category} </strong>
        </div>
        <div className="service-detail-content-topic">
          <span> Location :</span>
          <strong> {serviceDetail.location_coverage} </strong>
        </div>
        <div className="service-detail-content-topic">
          <span> Duration :</span>
          <strong> {serviceDetail.duration_minutes} minutes </strong>
        </div>
        <div className="service-detail-content-topic">
          <span> Price :</span>
          <strong> Rp {serviceDetail.price_per_hour} / hour </strong>
        </div>
        <div className="service-detail-content-topic">
          <span> {serviceDetail.description}</span>
        </div>
        <button id="return-btn" onClick={() => navigation("/services")}>
          Back to Services
        </button>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
