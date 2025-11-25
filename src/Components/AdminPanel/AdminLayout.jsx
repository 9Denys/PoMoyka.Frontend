import React, { useEffect, useState } from "react";
import "./AdminLayout.css";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { images } from "../../assets/image.jsx";
import { tokenService } from "../../core/tokenService";
import { getMyProfile } from "../../api/userApi";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getMyProfile();
        if (profile && profile.firstName) {
          setAdminName(profile.firstName);
        }
      } catch (err) {
        console.error("Failed to load admin profile:", err);
      }
    };

    loadProfile();
  }, []);

  const handleLogout = () => {
    tokenService.clearTokens();
    tokenService.clearUserRole();
    localStorage.removeItem("userFirstName");

    navigate("/Auth");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-header">
          <h3 className="admin-title">Admin panel</h3>
          <p className="admin-name">{adminName}</p>
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

          <Link to="/admin/adminservices">
            <button
              className={`admin-menu-item ${
                location.pathname === "/admin/adminservices" ? "active" : ""
              }`}
            >
              <img src={images.servicesIcon} alt="Services" className="menu-icon" />
              AdminServices
            </button>
          </Link>

          <Link to="/admin/admincenters">
            <button
              className={`admin-menu-item ${
                location.pathname === "/admin/admincenters" ? "active" : ""
              }`}
            >
              <img src={images.centersIcon} alt="AdminCenters" className="menu-icon" />
              AdminCenters
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

          <Link to="/admin/adminsetprice">
            <button
              className={`admin-menu-item ${
                location.pathname === "/admin/adminsetprice" ? "active" : ""
              }`}
            >
              <img src={images.priceIcon} alt="Admin Set price" className="menu-icon" />
              Admin Set price
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
