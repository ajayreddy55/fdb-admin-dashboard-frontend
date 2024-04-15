import "./index.css";
import AdminSidebarCompo from "../../components/AdminSidebarDash";
import AdminDashHeader from "../../components/AdminDashHeader";
import AdminDashNavbarCompo from "../../components/AdminDashNavbarComp";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackPage from "../errorFallbackPage";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const AdminDashPopularCategoriesPage = () => {
  const [popularCategoriesList, setPopularCategoriesList] = useState([]);

  useEffect(() => {
    getPopularCategories();
  }, []);

  const getPopularCategories = async () => {
    try {
      const url = "http://localhost:5030/api/popular-categories-admin";
      const token = Cookies.get("fdb_admin_jwt_token");
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const responseObject = await fetch(url, options);
      if (responseObject.ok) {
        const responseObjectJson = await responseObject.json();
        setPopularCategoriesList(responseObjectJson.popularCategories);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackPage}>
      <div className="admin-pop-cat-dash-main-container">
        <div className="container-fluid admin-height-container">
          <div className="row d-md-none">
            <div className="col-12 p-0">
              <AdminDashNavbarCompo />
            </div>
          </div>
          <div className="row admin-height-container">
            <div className="col-12 admin-height-container d-flex p-0">
              <AdminSidebarCompo />

              <div className="admin-main-content-container-pop-cat-dash">
                <div className="container-fluid">
                  <AdminDashHeader />
                  <div className="row mt-3 mb-2">
                    <div className="col-12">
                      <div className="d-flex align-items-center">
                        <h3 className="admin-pop-cat-dash-main-heading-text">
                          Popular Categories
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2 mb-3">
                    <div className="col-12 mt-3 mb-2">
                      <ul className="admin-pop-cat-dash-card-list-container">
                        {popularCategoriesList.map((eachItem) => (
                          <li
                            className="admin-pop-cat-dash-card-list-item"
                            key={eachItem._id}
                          >
                            {eachItem.category}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AdminDashPopularCategoriesPage;
