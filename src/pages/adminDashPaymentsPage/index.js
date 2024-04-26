import "./index.css";
import AdminSidebarCompo from "../../components/AdminSidebarDash";
import AdminDashHeader from "../../components/AdminDashHeader";
import AdminDashNavbarCompo from "../../components/AdminDashNavbarComp";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useState } from "react";
import ErrorFallbackPage from "../errorFallbackPage";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import { BsSearch } from "react-icons/bs";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const AdminDashboardPaymentsPage = () => {
  const [paymentsObject, setPaymentsObject] = useState({
    paymentsList: [],
    status: apiConstants.initial,
  });
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [offset, setOffset] = useState(0);
  const [totalPaymentsCount, setTotalPaymentsCount] = useState(0);
  const [totalPages, setTotalPages] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    getPaymentsData();
    //eslint-disable-next-line
  }, [offset, category]);

  useEffect(() => {
    getTotalPaymentsCount();
    //eslint-disable-next-line
  }, [category]);

  useEffect(() => {
    getCategoriesList();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setOffset((activePage - 1) * limitPerPage);
    //eslint-disable-next-line
  }, [activePage]);

  const getPaymentsData = async () => {
    try {
      setPaymentsObject((prevState) => ({
        ...prevState,
        paymentsList: [],
        status: apiConstants.inProgress,
      }));
      const url = `http://localhost:5030/api/get-service-payments-combined-all-data?limit=${limitPerPage}&offset=${offset}&category=${category}&search=${searchInput}`;
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
        setPaymentsObject((prevState) => ({
          ...prevState,
          paymentsList: responseDataJson.paymentsData,
          status: apiConstants.success,
        }));
      } else {
        setPaymentsObject((prevState) => ({
          ...prevState,
          paymentsList: [],
          status: apiConstants.failure,
        }));
      }
    } catch (error) {
      console.log(error.message);
      setPaymentsObject((prevState) => ({
        ...prevState,
        paymentsList: [],
        status: apiConstants.failure,
      }));
    }
  };

  const getTotalPaymentsCount = async () => {
    try {
      const url = `http://localhost:5030/api/get-service-payments-count-combined-all-data?category=${category}&search=${searchInput}`;
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

        setTotalPaymentsCount(Number(responseDataJson.paymentsCount));
        const pages = Math.ceil(
          Number(responseDataJson.paymentsCount) / limitPerPage
        );

        setTotalPages([...Array(pages + 1).keys()].slice(1));
      } else {
        setTotalPaymentsCount(0);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCategoriesList = async () => {
    try {
      const url = `http://localhost:5030/api/get-services-categories-data-admin`;
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
        setCategoriesList(responseDataJson.serviceCategoriesData);
      } else {
        setCategoriesList([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const displayFailureView = () => {
    return (
      <div className="admin-dash-failure-view-container-payments pt-4 pb-4">
        <h3 className="admin-dash-failure-msg">Oops! Something Went Wrong</h3>
        <button className="btn btn-primary">Reload</button>
      </div>
    );
  };

  const displayLoaderView = () => {
    return (
      <div className="admin-dash-loader-view-container-payments pt-4 pb-4">
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
      <div className="admin-dash-empty-view-container-payments pt-4 pb-4">
        <h3 className="admin-dash-empty-msg">No Data Found.</h3>
      </div>
    );
  };

  const renderSuccessView = () => {
    if (paymentsObject.paymentsList.length === 0) {
      return emptyListView();
    }

    return (
      <div className="admin-dash-table-container-payments">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Payment Id</th>
              <th scope="col">User Name</th>
              <th scope="col">Service Name</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentsObject.paymentsList.map((eachItem) => {
              return (
                <tr key={eachItem._id}>
                  <td>{eachItem.paymentId}</td>
                  <td>{eachItem.userName}</td>
                  <td>{eachItem.serviceName}</td>
                  <td>{eachItem.price}</td>
                  <td>{eachItem.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const checkForApiStatus = () => {
    switch (paymentsObject.status) {
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

  const changeTheCategory = (event) => {
    setCategory(event.target.value);
  };

  const requestForSearchInput = () => {
    getPaymentsData();
    getTotalPaymentsCount();
  };

  const requestDataKeyDown = (event) => {
    if (event.key === "Enter" && searchInput !== "") {
      getPaymentsData();
      getTotalPaymentsCount();
    }
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackPage}>
      <div className="admin-dashboard-main-container-payments">
        <div className="container-fluid admin-height-container-payments">
          <div className="row d-md-none">
            <div className="col-12 p-0">
              <AdminDashNavbarCompo />
            </div>
          </div>
          <div className="row admin-height-container-payments">
            <div className="col-12 admin-height-container-payments d-flex p-0">
              <AdminSidebarCompo />

              <div className="admin-main-content-container-dashboard-payments">
                <div className="container-fluid">
                  <AdminDashHeader />
                  <div className="row mt-3 mb-2">
                    <div className="col-12">
                      <div className="d-flex align-items-center">
                        <h3 className="admin-dashboard-main-heading-text-payments">
                          Services
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3 mb-3">
                    <div className="col-12">
                      <div className="d-flex align-items-center">
                        <select
                          className="admin-dash-services-category-select-ele"
                          value={category}
                          onChange={changeTheCategory}
                        >
                          <option value={""}>Category</option>
                          {categoriesList.map((eachCategory) => (
                            <option
                              value={eachCategory._id}
                              key={eachCategory._id}
                            >
                              {eachCategory.category}
                            </option>
                          ))}
                        </select>
                        <div className="admin-dash-searchbar-container-payments">
                          <input
                            type="search"
                            className="admin-dash-search-bar-payments"
                            placeholder="Search"
                            value={searchInput}
                            onChange={(event) =>
                              setSearchInput(event.target.value)
                            }
                            onKeyDown={requestDataKeyDown}
                            name="searchbar"
                          />
                          <div className="search-bar-button-container-payments">
                            <button
                              type="button"
                              className="search-bar-icon-button-payments"
                              onClick={requestForSearchInput}
                            >
                              <BsSearch className="search-bar-icon-payments" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3 mb-3">
                    <div className="col-12">{checkForApiStatus()}</div>
                  </div>
                  {totalPaymentsCount !== 0 ? (
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

export default AdminDashboardPaymentsPage;
