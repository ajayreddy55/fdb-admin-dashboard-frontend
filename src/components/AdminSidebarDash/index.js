import { NavLink } from "react-router-dom";

import FDBLogo from "../../assets/images/dubaiFdblogo.png";

import "./index.css";
import { useState } from "react";

const AdminSidebarCompo = (props) => {
  const [isTogglerClicked, setIsTogglerClicked] = useState(false);

  const toggleTheSidebar = () => {
    setIsTogglerClicked((prevState) => !prevState);
  };

  let sidebarCollapse;
  let sidebarNameToggle;

  if (isTogglerClicked) {
    sidebarCollapse = "admin-sidebar-container-collapsed";
    sidebarNameToggle = "d-none";
  } else {
    sidebarCollapse = "";
    sidebarNameToggle = "";
  }

  return (
    <aside
      className={`admin-sidebar-container ${sidebarCollapse} d-none d-md-block`}
    >
      <div className="admin-sidebar-inner-container">
        <div className="d-flex align-items-center justify-content-between p-3">
          <div className={sidebarNameToggle}>
            <div className="d-flex align-items-center flex-wrap">
              <img
                className={`admin-sidebar-logo`}
                src={FDBLogo}
                alt="FDBLogo"
              />
              <span className="admin-dashboard-logo-name">FindDubai</span>
            </div>
          </div>
          <button
            type="button"
            className="admin-menu-button-sidebar"
            onClick={toggleTheSidebar}
          >
            <i className="fa-solid fa-bars admin-menu-button-icon-sidebar"></i>
          </button>
        </div>
        <div>
          <div className="admin-sidebar-menu-container">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "admin-sidebar-menu-item-container admin-sidebar-menu-item-container-active"
                  : "admin-sidebar-menu-item-container"
              }
            >
              <i className="fa-solid fa-desktop admin-sidebar-menu-item-icon"></i>
              <span
                className={`admin-sidebar-menu-item-text ${sidebarNameToggle}`}
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

export default AdminSidebarCompo;
