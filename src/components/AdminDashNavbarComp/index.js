import { NavLink } from "react-router-dom";

import FDBLogo from "../../assets/images/dubaiFdblogo.png";

import "./index.css";

const AdminDashNavbarCompo = () => {
  return (
    <nav className="admin-navbar-container">
      <div className="admin-navbar-inner-container">
        <div className="d-flex align-items-center justify-content-between p-3">
          <div className="d-flex align-items-center flex-wrap">
            <img className={`admin-navbar-logo`} src={FDBLogo} alt="FDBLogo" />
            <span className="admin-dashboard-logo-name-nav">FindDubai</span>
          </div>
          <button
            type="button"
            className="admin-menu-button-navbar"
            data-bs-toggle="collapse"
            data-bs-target="#adminNavMenu"
            aria-expanded="false"
            aria-controls="adminNavMenu"
          >
            <i className="fa-solid fa-bars admin-menu-button-icon-navbar"></i>
          </button>
        </div>
        <div className="collapse" id="adminNavMenu">
          <div className="admin-navbar-menu-container">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "admin-navbar-menu-item-container admin-navbar-menu-item-container-active"
                  : "admin-navbar-menu-item-container"
              }
            >
              <i className="fa-solid fa-desktop admin-navbar-menu-item-icon"></i>
              <span className="admin-navbar-menu-item-text">Dashboard</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminDashNavbarCompo;
