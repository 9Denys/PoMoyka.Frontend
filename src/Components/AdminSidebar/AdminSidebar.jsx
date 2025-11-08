import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <h2 className="admin-title">Admin panel</h2>

      <nav className="admin-nav">
        <NavLink to="/admin/employers" className="admin-link">
          <img src="/img/icon-employers.png" alt="Employers" className="admin-icon" />
          Employers
        </NavLink>

        <NavLink to="/admin/services" className="admin-link">
          <img src="/img/icon-services.png" alt="Services" className="admin-icon" />
          Services
        </NavLink>

        <NavLink to="/admin/centers" className="admin-link">
          <img src="/img/icon-centers.png" alt="Centers" className="admin-icon" />
          Centers
        </NavLink>

        <NavLink to="/admin/reports" className="admin-link">
          <img src="/img/icon-reports.png" alt="Reports" className="admin-icon" />
          Reports
        </NavLink>

        <NavLink to="/admin/request" className="admin-link">
          <img src="/img/icon-request.png" alt="Request" className="admin-icon" />
          Request
        </NavLink>

        <NavLink to="/admin/set-price" className="admin-link">
          <img src="/img/icon-price.png" alt="Set price" className="admin-icon" />
          Set price
        </NavLink>
      </nav>

      <div className="logout-section">
        <hr className="logout-line" />
        <a href="/" className="logout-link">Log out</a>
      </div>
    </aside>
  );
}

export default AdminSidebar;
