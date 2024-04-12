import { Link } from "react-router-dom";
import "./index.css";

import VendorDashSidebarCompo from "../../components/VendorDashSidebar";
import VendorDashNavbarCompo from "../../components/VendorDashNavbarCompo";
import VendorDashHeaderCompo from "../../components/VendorDashHeaderCompo";

const VendorDashboardPage = () => {
  return (
    <div className="vendor-dashboard-main-container">
      <div className="container-fluid vendor-height-container">
        <div className="row d-md-none">
          <div className="col-12 p-0">
            <VendorDashNavbarCompo />
          </div>
        </div>
        <div className="row vendor-height-container">
          <div className="col-12 vendor-height-container d-flex p-0">
            <VendorDashSidebarCompo />

            <div className="vendor-main-content-container-dashboard">
              <div className="container-fluid">
                <VendorDashHeaderCompo />
                <div className="row mt-3 mb-2">
                  <div className="col-12">
                    <div className="d-flex align-items-center">
                      <h3 className="vendor-dashboard-main-heading-text">
                        Dashboard
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="row mt-2 mb-3">
                  <div className="col-12 col-md-4 col-lg-3 min-h-100 mt-3 mb-2">
                    <Link className="vendor-dashboard-card-link-item me-2">
                      <div className="vendor-dashboard-card vendor-dashboard-card-reg-users">
                        <div className="vendor-dashboard-card-stats-container">
                          <h3 className="vendor-dashboard-card-text">Views</h3>
                          <p className="vendor-dashboard-card-number">19203</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-12 col-md-4 col-lg-3 min-h-100 mt-3 mb-2">
                    <Link className="vendor-dashboard-card-link-item me-2">
                      <div className="vendor-dashboard-card vendor-dashboard-card-active-users">
                        <div className="vendor-dashboard-card-stats-container">
                          <h3 className="vendor-dashboard-card-text">Clicks</h3>
                          <p className="vendor-dashboard-card-number">20912</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboardPage;
