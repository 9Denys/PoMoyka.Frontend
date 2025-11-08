import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";
import { images } from "../../assets/image.jsx"; // 👈 как и в WorkerLayout

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/Auth");
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h3 className="admin-panel-title">Admin Panel</h3>
        <p className="admin-name">Administrator</p>
      </div>

      <nav className="admin-nav">
        <NavLink to="/admin/employers" className="admin-link">
          <img src={images.userIconAdmin} alt="Employers" className="admin-icon" />
          Employers
        </NavLink>

        <NavLink to="/admin/services" className="admin-link">
          <img src={images.servicesIcon} alt="Services" className="admin-icon" />
          Services
        </NavLink>

        <NavLink to="/admin/centers" className="admin-link">
          <img src={images.centersIcon} alt="Centers" className="admin-icon" />
          Centers
        </NavLink>

        <NavLink to="/admin/reports" className="admin-link">
          <img src={images.reportsIcon} alt="Reports" className="admin-icon" />
          Reports
        </NavLink>

        <NavLink to="/admin/request" className="admin-link">
          <img src={images.requestIcon} alt="Requests" className="admin-icon" />
          Requests
        </NavLink>

        <NavLink to="/admin/set-price" className="admin-link">
          <img src={images.priceIcon} alt="Set Price" className="admin-icon" />
          Set Price
        </NavLink>
      </nav>

      <div className="admin-sidebar-footer">
        <button className="admin-logout" onClick={handleLogout}>
          <img
            src={images.logoutIcon} 
            alt="Logout"
            className="admin-icon"
          />
          Log out
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
