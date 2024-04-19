import { Link } from "react-router-dom";
import "./index.css";

import VendorDashSidebarCompo from "../../components/VendorDashSidebar";
import VendorDashNavbarCompo from "../../components/VendorDashNavbarCompo";
import VendorDashHeaderCompo from "../../components/VendorDashHeaderCompo";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";

const VendorDashboardPage = () => {
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [clicksCountGraphList, setClicksCountGraphList] = useState([]);
  const [viewsCountGraphList, setViewsCountGraphList] = useState([]);

  useEffect(() => {
    getTotalClicksCount();
    getTotalViewsCount();
    getClicksGraphList();
    getViewsGraphList();
  }, []);

  const getTotalClicksCount = async () => {
    try {
      const url = "http://localhost:5030/api/vendor-clicks-count";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const responseObj = await fetch(url, options);

      if (responseObj.ok) {
        const responseObjJson = await responseObj.json();
        setTotalClicks(responseObjJson.clicksCount);
      } else {
        setTotalClicks(0);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTotalViewsCount = async () => {
    try {
      const url = "http://localhost:5030/api/vendor-views-count";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const responseObj = await fetch(url, options);

      if (responseObj.ok) {
        const responseObjJson = await responseObj.json();
        setTotalViews(responseObjJson.viewsCount);
      } else {
        setTotalViews(0);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getClicksGraphList = async () => {
    try {
      const url = "http://localhost:5030/api/vendor-service-clicks-graph";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const responseObj = await fetch(url, options);

      if (responseObj.ok) {
        const responseObjJson = await responseObj.json();
        setClicksCountGraphList(responseObjJson.clickCount);
      } else {
        setClicksCountGraphList([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getViewsGraphList = async () => {
    try {
      const url = "http://localhost:5030/api/vendor-service-views-graph";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const responseObj = await fetch(url, options);

      if (responseObj.ok) {
        const responseObjJson = await responseObj.json();
        setViewsCountGraphList(responseObjJson.viewsCount);
      } else {
        setViewsCountGraphList([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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
                          <p className="vendor-dashboard-card-number">
                            {totalViews}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-12 col-md-4 col-lg-3 min-h-100 mt-3 mb-2">
                    <Link className="vendor-dashboard-card-link-item me-2">
                      <div className="vendor-dashboard-card vendor-dashboard-card-active-users">
                        <div className="vendor-dashboard-card-stats-container">
                          <h3 className="vendor-dashboard-card-text">Clicks</h3>
                          <p className="vendor-dashboard-card-number">
                            {totalClicks}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="row mt-4 mb-3">
                  <div className="col-12 col-md-6 mt-3">
                    <div className="vendor-graph-main-container me-2">
                      <ResponsiveContainer width={"100%"} height={"100%"}>
                        <LineChart
                          // width={500}
                          // height={300}
                          data={viewsCountGraphList}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="_id" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="viewsCount"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mt-3">
                    <div className="vendor-graph-main-container me-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          // width={500}
                          // height={300}
                          data={clicksCountGraphList}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="_id" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="clicksCount"
                            stackId="1"
                            stroke="#ffc658"
                            fill="#ffc658"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
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
