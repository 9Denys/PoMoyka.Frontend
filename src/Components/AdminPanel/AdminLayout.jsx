import React from "react";
import "./AdminLayout.css";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { images } from "../../assets/image.jsx";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/Auth");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-header">
          <h3 className="admin-title">Admin panel</h3>
        </div>

        <nav className="admin-menu">
          <Link to="/admin/employers">
            <button
              className={`admin-menu-item ${
                location.pathname === "/admin/employers" ? "active" : ""
              }`}
            >
              <img src={images.userIconAdmin} alt="Employers" className="menu-icon" />
              Employers
            </button>
          </Link>

          <Link to="/admin/services">
            <button
              className={`admin-menu-item ${
                location.pathname === "/admin/services" ? "active" : ""
              }`}
            >
              <img src={images.servicesIcon} alt="Services" className="menu-icon" />
              Services
            </button>
          </Link>

          <Link to="/admin/centers">
            <button
              className={`admin-menu-item ${
                location.pathname === "/admin/centers" ? "active" : ""
              }`}
            >
              <img src={images.centersIcon} alt="Centers" className="menu-icon" />
              Centers
            </button>
          </Link>

          <Link to="/admin/reports">
            <button
              className={`admin-menu-item ${
                location.pathname === "/admin/reports" ? "active" : ""
              }`}
            >
              <img src={images.reportsIcon} alt="Reports" className="menu-icon" />
              Reports
            </button>
          </Link>

          <Link to="/admin/request">
            <button
              className={`admin-menu-item ${
                location.pathname === "/admin/request" ? "active" : ""
              }`}
            >
              <img src={images.requestIcon} alt="Request" className="menu-icon" />
              Request
            </button>
          </Link>

          <Link to="/admin/setprice">
            <button
              className={`admin-menu-item ${
                location.pathname === "/admin/setprice" ? "active" : ""
              }`}
            >
              <img src={images.priceIcon} alt="Set price" className="menu-icon" />
              Set price
            </button>
          </Link>
        </nav>

        <div className="admin-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <img src={images.logoutIcon} alt="Logout" className="menu-icon" />
            Log out
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
