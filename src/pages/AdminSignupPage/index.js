import AdminSignupCompo from "../../components/AdminSignupCompo";

import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackPage from "../errorFallbackPage/index";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import FDBImage from "../../assets/images/dubaiFdblogo.png";

import "./index.css";
import { useEffect } from "react";

const SignupPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("fdb_admin_jwt_token");

    if (jwtToken !== undefined) {
      return navigate("/admin-dashboard", { replace: true });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackPage}>
      <div className="signup-page-main-container">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="signup-page-logo-container">
                <img
                  alt="logo"
                  src={FDBImage}
                  className="signup-page-logo-image"
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <AdminSignupCompo />
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default SignupPage;
