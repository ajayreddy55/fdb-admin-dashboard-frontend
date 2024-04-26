import "./index.css";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useState } from "react";
import ErrorFallbackPage from "../../pages/errorFallbackPage";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const AdminReviewsDisplayCompo = ({ serviceData }) => {
  const [reviewsObject, setReviewsObject] = useState({
    reviewsList: [],
    status: apiConstants.initial,
  });

  useEffect(() => {
    getReviewsData();
    //eslint-disable-next-line
  }, [serviceData._id]);

  const getReviewsData = async () => {
    try {
      setReviewsObject((prevState) => ({
        ...prevState,
        reviewsList: [],
        status: apiConstants.inProgress,
      }));
      const url = `http://localhost:5030/api/get-service-reviews-combined-all-data/${serviceData._id}`;
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
        setReviewsObject((prevState) => ({
          ...prevState,
          reviewsList: responseDataJson.reviews,
          status: apiConstants.success,
        }));
      } else {
        setReviewsObject((prevState) => ({
          ...prevState,
          reviewsList: [],
          status: apiConstants.failure,
        }));
      }
    } catch (error) {
      console.log(error.message);
      setReviewsObject((prevState) => ({
        ...prevState,
        reviewsList: [],
        status: apiConstants.failure,
      }));
    }
  };

  const displayFailureView = () => {
    return (
      <div className="admin-dash-failure-view-container-reviews-dis pt-4 pb-4">
        <h3 className="admin-dash-failure-msg-dis">
          Oops! Something Went Wrong
        </h3>
        <button className="btn btn-primary">Reload</button>
      </div>
    );
  };

  const displayLoaderView = () => {
    return (
      <div className="admin-dash-loader-view-container-reviews-dis pt-4 pb-4">
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
      <div className="admin-dash-empty-view-container-reviews-dis pt-4 pb-4">
        <h3 className="admin-dash-empty-msg-dis">No Data Found.</h3>
      </div>
    );
  };

  const renderSuccessView = () => {
    if (reviewsObject.reviewsList.length === 0) {
      return emptyListView();
    }

    return (
      <div className="admin-dash-table-container-reviews-dis">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Service Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Review</th>
              <th scope="col">Rating</th>
            </tr>
          </thead>
          <tbody>
            {reviewsObject.reviewsList.map((eachItem) => {
              return (
                <tr key={eachItem._id}>
                  <td>{serviceData.name}</td>
                  <td>{eachItem.userName}</td>
                  <td>{eachItem.review}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <i className="fa-solid fa-star-half-stroke admin-reviews-display-star-icon"></i>
                      <span className="admin-reviews-rating-text">
                        {eachItem.rating}
                      </span>
                    </div>
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
    switch (reviewsObject.status) {
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
      <div className="admin-dashboard-review-dis-container mt-3">
        <div>
          <h3 className="admin-dashboard-main-heading-text-reviews-dis mb-3">
            Reviews
          </h3>
        </div>
        {checkForApiStatus()}
      </div>
    </ErrorBoundary>
  );
};

export default AdminReviewsDisplayCompo;
