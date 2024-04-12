import { Link, useNavigate } from "react-router-dom";

import "./index.css";
import Cookies from "js-cookie";

const AdminDashHeader = (props) => {
  const navigate = useNavigate();

  const logoutTheUser = () => {
    Cookies.remove("fdb_admin_jwt_token");
    navigate("/admin-login", { replace: true });
  };

  return (
    <div className="admin-header-container row">
      <div className="col-12 mt-2 mb-3">
        <div className="admin-header-logout-profile-container">
          <Link className="admin-header-profile-container mt-2">
            <i className="fa-solid fa-circle-user admin-header-profile-icon"></i>
            <span className="admin-header-profile-text">Admin</span>
          </Link>
          <div className="d-flex align-items-center mt-2">
            <button
              className="admin-header-logout-button"
              onClick={logoutTheUser}
            >
              <span className="admin-header-logout-text">Logout</span>
              <i className="fa-solid fa-right-from-bracket admin-header-logout-icon"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="w-100">
          <hr className="admin-header-hr-line" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashHeader;
