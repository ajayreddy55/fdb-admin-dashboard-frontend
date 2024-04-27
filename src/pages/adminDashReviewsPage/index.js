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
import Popup from "../../components/PopupCompo";
import AdminReviewsDisplayCompo from "../../components/adminReviewsDisplayCompo";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const AdminDashboardReviewsPage = () => {
  const [servicesObject, setServicesObject] = useState({
    servicesList: [],
    status: apiConstants.initial,
  });
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [offset, setOffset] = useState(0);
  const [totalServicesCount, setTotalServicesCount] = useState(0);
  const [totalPages, setTotalPages] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [clickedService, setClickedService] = useState({});

  useEffect(() => {
    getServicesData();
    //eslint-disable-next-line
  }, [offset, category]);

  useEffect(() => {
    getTotalServicesCount();
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

  const getServicesData = async () => {
    try {
      setServicesObject((prevState) => ({
        ...prevState,
        servicesList: [],
        status: apiConstants.inProgress,
      }));
      const url = `http://localhost:5030/api/get-services-review-data-admin?limit=${limitPerPage}&offset=${offset}&category=${category}&search=${searchInput}`;
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
        setServicesObject((prevState) => ({
          ...prevState,
          servicesList: responseDataJson.servicesData,
          status: apiConstants.success,
        }));
      } else {
        setServicesObject((prevState) => ({
          ...prevState,
          servicesList: [],
          status: apiConstants.failure,
        }));
      }
    } catch (error) {
      console.log(error.message);
      setServicesObject((prevState) => ({
        ...prevState,
        servicesList: [],
        status: apiConstants.failure,
      }));
    }
  };

  const getTotalServicesCount = async () => {
    try {
      const url = `http://localhost:5030/api/get-services-review-count-admin?category=${category}&search=${searchInput}`;
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
        setTotalServicesCount(responseDataJson.servicesCount);
        const pages = Math.ceil(responseDataJson.servicesCount / limitPerPage);
        setTotalPages([...Array(pages + 1).keys()].slice(1));
      } else {
        setTotalServicesCount(0);
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
      <div className="admin-dash-failure-view-container-reviews pt-4 pb-4">
        <h3 className="admin-dash-failure-msg">Oops! Something Went Wrong</h3>
        <button className="btn btn-primary">Reload</button>
      </div>
    );
  };

  const displayLoaderView = () => {
    return (
      <div className="admin-dash-loader-view-container-reviews pt-4 pb-4">
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
      <div className="admin-dash-empty-view-container-reviews pt-4 pb-4">
        <h3 className="admin-dash-empty-msg">No Data Found.</h3>
      </div>
    );
  };

  const renderSuccessView = () => {
    if (servicesObject.servicesList.length === 0) {
      return emptyListView();
    }

    return (
      <div className="admin-dash-table-container-reviews">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Sub Category</th>
              <th scope="col">Address</th>
              <th scope="col">View Review</th>
            </tr>
          </thead>
          <tbody>
            {servicesObject.servicesList.map((eachItem) => {
              return (
                <tr key={eachItem._id}>
                  <td>{eachItem.name}</td>
                  <td>{eachItem.subCategory}</td>
                  <td>{eachItem.address}</td>
                  <td>
                    <button
                      className={`btn text-primary`}
                      onClick={() => {
                        setShowPopup(true);
                        setClickedService(eachItem);
                      }}
                    >
                      Click Here
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const checkForApiStatus = () => {
    switch (servicesObject.status) {
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
    getServicesData();
    getTotalServicesCount();
  };

  const requestDataKeyDown = (event) => {
    if (event.key === "Enter" && searchInput !== "") {
      getServicesData();
      getTotalServicesCount();
    }
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackPage}>
      <div className="admin-dashboard-main-container-reviews">
        <div className="container-fluid admin-height-container-reviews">
          <div className="row d-md-none">
            <div className="col-12 p-0">
              <AdminDashNavbarCompo />
            </div>
          </div>
          <div className="row admin-height-container-reviews">
            <div className="col-12 admin-height-container-reviews d-flex p-0">
              <AdminSidebarCompo />

              <div className="admin-main-content-container-dashboard-reviews">
                <div className="container-fluid">
                  <AdminDashHeader />
                  <div className="row mt-3 mb-2">
                    <div className="col-12">
                      <div className="d-flex align-items-center">
                        <h3 className="admin-dashboard-main-heading-text-reviews">
                          Services
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3 mb-3">
                    <div className="col-12">
                      <div className="d-flex align-items-center">
                        <select
                          className="admin-dash-reviews-category-select-ele"
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
                        <div className="admin-dash-searchbar-container-reviews">
                          <input
                            type="search"
                            className="admin-dash-search-bar-reviews"
                            placeholder="Search"
                            value={searchInput}
                            onChange={(event) =>
                              setSearchInput(event.target.value)
                            }
                            onKeyDown={requestDataKeyDown}
                            name="searchbar"
                          />
                          <div className="search-bar-button-container-reviews">
                            <button
                              type="button"
                              className="search-bar-icon-button-reviews"
                              onClick={requestForSearchInput}
                            >
                              <BsSearch className="search-bar-icon-reviews" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3 mb-3">
                    <div className="col-12">{checkForApiStatus()}</div>
                  </div>
                  {totalServicesCount !== 0 ? (
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
      {showPopup && (
        <Popup closePopup={setShowPopup}>
          {<AdminReviewsDisplayCompo serviceData={clickedService} />}
        </Popup>
      )}
    </ErrorBoundary>
  );
};

export default AdminDashboardReviewsPage;
