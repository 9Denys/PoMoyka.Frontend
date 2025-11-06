import React from "react";
import "./WorkerLayout.css";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"; 
import { images } from "../../assets/image.jsx"; 

function WorkerLayout() {
  const location = useLocation();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    navigate("/Auth"); 
  };

  return (
    <div className="worker-layout">
      <aside className="worker-sidebar">
        <div className="worker-sidebar-header">
          <h3 className="worker-panel-title">Coworker panel</h3>
          <p className="worker-name">Tim Kadilak</p>
        </div>

        <div className="worker-menu">
          <Link to="/worker/myinfo">
            <button
              className={`worker-menu-item ${
                location.pathname === "/worker/myinfo" ? "active" : ""
              }`}
            >
              <img
                src={images.userIcon}
                alt="My Info"
                className="menu-icon"
              />
              My info
            </button>
          </Link>

          <Link to="/worker/sendrequest">
            <button
              className={`worker-menu-item ${
                location.pathname === "/worker/sendrequest" ? "active" : ""
              }`}
            >
              <img
                src={images.sendIcon}
                alt="Send Request"
                className="menu-icon"
              />
              Send request
            </button>
          </Link>
        </div>

        <div className="worker-sidebar-footer">
          <button className="worker-logout" onClick={handleLogout}>
            <img
              src={images.logoutIcon}
              alt="Logout"
              className="menu-icon"
            />
            Log out
          </button>
        </div>
      </aside>

      <main className="worker-main">
        <Outlet />
      </main>
    </div>
  );
}

export default WorkerLayout;
