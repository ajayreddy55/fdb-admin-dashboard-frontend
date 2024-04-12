import { NavLink } from "react-router-dom";

import FDBLogo from "../../assets/images/dubaiFdblogo.png";

import "./index.css";

const VendorDashNavbarCompo = () => {
  return (
    <nav className="vendor-navbar-container">
      <div className="vendor-navbar-inner-container">
        <div className="d-flex align-items-center justify-content-between p-3">
          <div className="d-flex align-items-center flex-wrap">
            <img className={`vendor-navbar-logo`} src={FDBLogo} alt="FDBLogo" />
            <span className="vendor-dashboard-logo-name-nav">FindDubai</span>
          </div>
          <button
            type="button"
            className="vendor-menu-button-navbar"
            data-bs-toggle="collapse"
            data-bs-target="#vendorNavMenu"
            aria-expanded="false"
            aria-controls="vendorNavMenu"
          >
            <i className="fa-solid fa-bars vendor-menu-button-icon-navbar"></i>
          </button>
        </div>
        <div className="collapse" id="vendorNavMenu">
          <div className="vendor-navbar-menu-container">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "vendor-navbar-menu-item-container vendor-navbar-menu-item-container-active"
                  : "vendor-navbar-menu-item-container"
              }
            >
              <i className="fa-solid fa-desktop vendor-navbar-menu-item-icon"></i>
              <span className="vendor-navbar-menu-item-text">Dashboard</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default VendorDashNavbarCompo;
