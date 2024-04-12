import { Link } from "react-router-dom";

import "./index.css";

const VendorDashHeaderCompo = () => {
  return (
    <div className="vendor-header-container row">
      <div className="col-12 mt-2 mb-3">
        <div className="vendor-header-logout-profile-container">
          <Link className="vendor-header-profile-container mt-2">
            <i className="fa-solid fa-circle-user vendor-header-profile-icon"></i>
            <span className="vendor-header-profile-text">Vendor</span>
          </Link>
          <div className="d-flex align-items-center mt-2">
            <button className="vendor-header-logout-button">
              <span className="vendor-header-logout-text">Logout</span>
              <i className="fa-solid fa-right-from-bracket vendor-header-logout-icon"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="w-100">
          <hr className="vendor-header-hr-line" />
        </div>
      </div>
    </div>
  );
};

export default VendorDashHeaderCompo;
