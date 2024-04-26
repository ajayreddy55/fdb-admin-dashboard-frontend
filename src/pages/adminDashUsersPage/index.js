import "./index.css";
import AdminSidebarCompo from "../../components/AdminSidebarDash";
import AdminDashHeader from "../../components/AdminDashHeader";
import AdminDashNavbarCompo from "../../components/AdminDashNavbarComp";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useState } from "react";
import ErrorFallbackPage from "../errorFallbackPage";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const AdminDashboardUsersPage = () => {
  const [usersObject, setUsersObject] = useState({
    usersList: [],
    status: apiConstants.initial,
  });
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [offset, setOffset] = useState(0);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [totalPages, setTotalPages] = useState([]);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    getUsersData();
    //eslint-disable-next-line
  }, [offset]);

  useEffect(() => {
    getTotalUsersCount();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setOffset((activePage - 1) * limitPerPage);
    //eslint-disable-next-line
  }, [activePage]);

  const getUsersData = async () => {
    try {
      setUsersObject((prevState) => ({
        ...prevState,
        usersList: [],
        status: apiConstants.inProgress,
      }));
      const url = `http://localhost:5030/api/get-all-reg-users-data?limit=${limitPerPage}&offset=${offset}`;
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
        setUsersObject((prevState) => ({
          ...prevState,
          usersList: responseDataJson.usersData,
          status: apiConstants.success,
        }));
      } else {
        setUsersObject((prevState) => ({
          ...prevState,
          usersList: [],
          status: apiConstants.failure,
        }));
      }
    } catch (error) {
      console.log(error.message);
      setUsersObject((prevState) => ({
        ...prevState,
        usersList: [],
        status: apiConstants.failure,
      }));
    }
  };

  const getTotalUsersCount = async () => {
    try {
      const url = "http://localhost:5030/api/count-all-reg-users";
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
        setTotalUsersCount(responseDataJson.usersCount);
        const pages = Math.ceil(responseDataJson.usersCount / limitPerPage);
        setTotalPages([...Array(pages + 1).keys()].slice(1));
      } else {
        setTotalUsersCount(0);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const displayFailureView = () => {
    return (
      <div className="admin-dash-failure-view-container-users pt-4 pb-4">
        <h3 className="admin-dash-failure-msg">Oops! Something Went Wrong</h3>
        <button
          className="btn btn-primary"
          onClick={() => {
            getUsersData();
            getTotalUsersCount();
          }}
        >
          Reload
        </button>
      </div>
    );
  };

  const displayLoaderView = () => {
    return (
      <div className="admin-dash-loader-view-container-users pt-4 pb-4">
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

  const emptyListView = () => {
    return (
      <div className="admin-dash-empty-view-container-users pt-4 pb-4">
        <h3 className="admin-dash-empty-msg">No Data Found.</h3>
      </div>
    );
  };

  const renderSuccessView = () => {
    if (usersObject.usersList.length === 0) {
      return emptyListView();
    }

    return (
      <div className="admin-dash-table-container-users">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {usersObject.usersList.map((eachItem) => {
              return (
                <tr key={eachItem._id}>
                  <td>{eachItem.name}</td>
                  <td>{eachItem.email}</td>
                  <td>{eachItem.phoneNumber}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const checkForApiStatus = () => {
    switch (usersObject.status) {
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
      <div className="admin-dashboard-main-container-users">
        <div className="container-fluid admin-height-container-users">
          <div className="row d-md-none">
            <div className="col-12 p-0">
              <AdminDashNavbarCompo />
            </div>
          </div>
          <div className="row admin-height-container-users">
            <div className="col-12 admin-height-container-users d-flex p-0">
              <AdminSidebarCompo />

              <div className="admin-main-content-container-dashboard-users">
                <div className="container-fluid">
                  <AdminDashHeader />
                  <div className="row mt-3 mb-2">
                    <div className="col-12">
                      <div className="d-flex align-items-center">
                        <h3 className="admin-dashboard-main-heading-text-users">
                          Users
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3 mb-3">
                    <div className="col-12">{checkForApiStatus()}</div>
                  </div>
                  {totalUsersCount !== 0 ? (
                    <div className="row mt-3 mb-3">
                      <div className="col-12">
                        <div className="w-100 d-flex align-items-center justify-content-end mt-3 mb-3">
                          <nav aria-label="Page navigation example">
                            <ul className="pagination">
                              <li className="page-item">
                                <button
                                  className={`page-link ${
                                    activePage === 1 ? "disabled" : ""
                                  }`}
                                  onClick={() =>
                                    setActivePage((prevState) =>
                                      prevState > 1 ? prevState - 1 : 1
                                    )
                                  }
                                  aria-label="Previous"
                                >
                                  <span aria-hidden="true">&laquo;</span>
                                </button>
                              </li>
                              {totalPages.map((eachPage) => {
                                return (
                                  <li
                                    className={`page-item ${
                                      eachPage === activePage ? "active" : ""
                                    }`}
                                    key={eachPage}
                                  >
                                    <button
                                      className="page-link"
                                      onClick={() => setActivePage(eachPage)}
                                    >
                                      {eachPage}
                                    </button>
                                  </li>
                                );
                              })}
                              <li className="page-item">
                                <button
                                  className={`page-link ${
                                    activePage === totalPages.length
                                      ? "disabled"
                                      : ""
                                  }`}
                                  aria-label="Next"
                                  onClick={() =>
                                    setActivePage((prevState) =>
                                      prevState < totalPages.length
                                        ? prevState + 1
                                        : totalPages.length
                                    )
                                  }
                                >
                                  <span aria-hidden="true">&raquo;</span>
                                </button>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AdminDashboardUsersPage;
