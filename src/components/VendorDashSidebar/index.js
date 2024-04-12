import { NavLink } from "react-router-dom";

import FDBLogo from "../../assets/images/dubaiFdblogo.png";

import "./index.css";
import { useState } from "react";

const VendorDashSidebarCompo = (props) => {
  const [isTogglerClicked, setIsTogglerClicked] = useState(false);

  const toggleTheSidebar = () => {
    setIsTogglerClicked((prevState) => !prevState);
  };

  let sidebarCollapse;
  let sidebarNameToggle;

  if (isTogglerClicked) {
    sidebarCollapse = "vendor-sidebar-container-collapsed";
    sidebarNameToggle = "d-none";
  } else {
    sidebarCollapse = "";
    sidebarNameToggle = "";
  }

  return (
    <aside
      className={`vendor-sidebar-container ${sidebarCollapse} d-none d-md-block`}
    >
      <div className="vendor-sidebar-inner-container">
        <div className="d-flex align-items-center justify-content-between p-3">
          <div className={sidebarNameToggle}>
            <div className="d-flex align-items-center flex-wrap">
              <img
                className={`vendor-sidebar-logo`}
                src={FDBLogo}
                alt="FDBLogo"
              />
              <span className="vendor-dashboard-logo-name">FindDubai</span>
            </div>
          </div>
          <button
            type="button"
            className="vendor-menu-button-sidebar"
            onClick={toggleTheSidebar}
          >
            <i className="fa-solid fa-bars vendor-menu-button-icon-sidebar"></i>
          </button>
        </div>
        <div>
          <div className="vendor-sidebar-menu-container">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "vendor-sidebar-menu-item-container vendor-sidebar-menu-item-container-active"
                  : "vendor-sidebar-menu-item-container"
              }
            >
              <i className="fa-solid fa-desktop vendor-sidebar-menu-item-icon"></i>
              <span
                className={`vendor-sidebar-menu-item-text ${sidebarNameToggle}`}
              >
                Dashboard
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default VendorDashSidebarCompo;
