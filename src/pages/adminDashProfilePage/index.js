import "./index.css";
import AdminSidebarCompo from "../../components/AdminSidebarDash";
import AdminDashHeader from "../../components/AdminDashHeader";
import AdminDashNavbarCompo from "../../components/AdminDashNavbarComp";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useState } from "react";
import ErrorFallbackPage from "../errorFallbackPage";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import { TextField } from "@mui/material";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const AdminDashboardProfilePage = () => {
  const [adminObject, setAdminObject] = useState({
    adminDetails: {},
    status: apiConstants.initial,
  });

  useEffect(() => {
    getAdminObject();
    //eslint-disable-next-line
  }, []);

  const getAdminObject = async () => {
    try {
      setAdminObject((prevState) => ({
        ...prevState,
        adminDetails: {},
        status: apiConstants.inProgress,
      }));
      const url = `http://localhost:5030/auth/profile-admin`;
      const token = Cookies.get("fdb_admin_jwt_token");
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const responseData = await fetch(url, options);

      if (responseData.ok) {
        const responseDataJson = await responseData.json();

        setAdminObject((prevState) => ({
          ...prevState,
          adminDetails: responseDataJson.adminData,
          status: apiConstants.success,
        }));
      } else {
        setAdminObject((prevState) => ({
          ...prevState,
          adminDetails: {},
          status: apiConstants.failure,
        }));
      }
    } catch (error) {
      console.log(error.message);
      setAdminObject((prevState) => ({
        ...prevState,
        adminDetails: {},
        status: apiConstants.failure,
      }));
    }
  };

  const displayFailureView = () => {
    return (
      <div className="admin-dash-failure-view-container-profile pt-4 pb-4">
        <h3 className="admin-dash-failure-msg">Oops! Something Went Wrong</h3>
        <button className="btn btn-primary" onClick={() => getAdminObject()}>
          Reload
        </button>
      </div>
    );
  };

  const displayLoaderView = () => {
    return (
      <div className="admin-dash-loader-view-container-profile pt-4 pb-4">
        <ThreeDots
          visible={true}
          height="62"
          width="62"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          color="#306cce"
          radius={"10"}
        />
      </div>
    );
  };

  const renderSuccessView = () => {
    return (
      <>
        <div className="col-12 col-md-6 col-lg-6 gap-2 mt-3 mb-5">
          <div className="admin-dash-inputs-container-profile">
            {/* <label
              className="admin-dash-input-label-profile"
              htmlFor="emailProfile"
            >
              Email
            </label>
            <input
              className="admin-dash-input-ele-profile"
              type="text"
              placeholder="Email"
              id="emailProfile"
            /> */}
            <TextField
              id="emailInput"
              type="text"
              placeholder="email"
              fullWidth={true}
              size="normal"
              variant="outlined"
              label="Email"
              value={adminObject.adminDetails.email}
              inputProps={{ readOnly: true }}
            />
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-6 gap-2 mt-3 mb-5">
          <div className="admin-dash-inputs-container-profile">
            <TextField
              id="phoneNumberInput"
              type="text"
              placeholder="Phone Number"
              fullWidth={true}
              size="normal"
              variant="outlined"
              label="Phone Number"
              value={adminObject.adminDetails.phoneNumber}
              inputProps={{ readOnly: true }}
            />
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-6 gap-2 mt-3 mb-5">
          <div className="admin-dash-inputs-container-profile">
            <TextField
              id="userNameInput"
              type="text"
              placeholder="Username"
              fullWidth={true}
              size="normal"
              variant="outlined"
              label="User Name"
              value={adminObject.adminDetails.name}
              inputProps={{ readOnly: true }}
            />
          </div>
        </div>
      </>
    );
  };

  const checkForApiStatus = () => {
    switch (adminObject.status) {
      case apiConstants.failure:
        return displayFailureView();

      case apiConstants.inProgress:
        return displayLoaderView();

      case apiConstants.success:
        return renderSuccessView();

      default:
        return null;
    }
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackPage}>
      <div className="admin-dashboard-main-container-profile">
        <div className="container-fluid admin-height-container-profile">
          <div className="row d-md-none">
            <div className="col-12 p-0">
              <AdminDashNavbarCompo />
            </div>
          </div>
          <div className="row admin-height-container-profile">
            <div className="col-12 admin-height-container-profile d-flex p-0">
              <AdminSidebarCompo />

              <div className="admin-main-content-container-dashboard-profile">
                <div className="container-fluid">
                  <AdminDashHeader />
                  <div className="row mt-3 mb-2">
                    <div className="col-12">
                      <div className="d-flex align-items-center">
                        <h3 className="admin-dashboard-main-heading-text-profile">
                          Profile
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3 mb-3">{checkForApiStatus()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AdminDashboardProfilePage;
