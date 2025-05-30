import Logo from "../assets/tukangin.png";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import React, { useState } from "react";

const TukangHeader: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <img src={Logo} alt="TukangIN Logo" className="logo" />
        {!isCollapsed && <h1>TukangIN</h1>}
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isCollapsed ? (
            <FiChevronRight size={24} />
          ) : (
            <FiChevronLeft size={24} />
          )}
        </button>
      </div>
      <ul className="sidebar-links">
        <li>
          <a href="/tukang/home">{!isCollapsed && "Dashboard"}</a>
        </li>
        <li>
          <a href="/tukang/jobs">{!isCollapsed && "Jobs"}</a>
        </li>
        <li>
          <a href="/tukang/my-orders">{!isCollapsed && "My Orders"}</a>
        </li>
      </ul>
    </div>
  );
};

export default TukangHeader;
