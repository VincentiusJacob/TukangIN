import Logo from "../assets/tukangin.png";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Header.css";

interface User {
  id: string;
  name: string;
  email: string;
  dob: string;
  gender: string;
  address: string;
}

const Header: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("customerid");
    const fetchUserData = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            "http://localhost:3001/user/" + userId
          );
          console.log("currentuser: ", response.data);
          setCurrentUser(response.data.user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className="homePage-header">
      <div className="homePage-header-left">
        <img src={Logo} id="logo" alt="TukangIN Logo" />
        <h1> TukangIN </h1>
      </div>
      <div className="homePage-header-middle">
        <ul>
          <li>
            <a href="/home"> Home</a>
          </li>
          <li>
            <a href="/history"> Orders</a>
          </li>
          <li>
            <a href="/services"> Services</a>
          </li>
        </ul>
      </div>
      <div className="homePage-header-right">
        <h3> Hello, {currentUser?.name} </h3>
      </div>
    </div>
  );
};

export default Header;
