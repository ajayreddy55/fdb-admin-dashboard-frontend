import { Link } from "react-router-dom";
import "./index.css";
import AdminSidebarCompo from "../../components/AdminSidebarDash";
import AdminDashHeader from "../../components/AdminDashHeader";
import AdminDashNavbarCompo from "../../components/AdminDashNavbarComp";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useState } from "react";
import ErrorFallbackPage from "../errorFallbackPage";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Rectangle,
  ResponsiveContainer,
} from "recharts";
import Cookies from "js-cookie";

const AdminDashboardPage = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [activeUsersGraph, setActiveUsersGraph] = useState([]);
  const [avgUsersDurationGraph, setAvgUsersDurationGraph] = useState([]);

  const [allRegisteredUsers, setAllRegisteredUsers] = useState(0);
  const [allActiveUsers, setAllActiveUsers] = useState(0);
  const [totalAvgSessionDuration, setTotalAvgSessionDuration] = useState(0);

  useEffect(() => {
    getRegisteredUsers();
  }, []);

  useEffect(() => {
    getActiveUsersGraph();
  }, []);

  useEffect(() => {
    getAvgUsersDurationGraph();
  }, []);

  useEffect(() => {
    getAllRegisteredUsers();
    getAllActiveUsers();
    getTotalAvgSessionDuration();
  }, []);

  const getRegisteredUsers = async () => {
    try {
      const url = "http://localhost:5030/api/user-count-registered";
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
        setRegisteredUsers(responseDataJson.usersCount);
      } else {
        setRegisteredUsers([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getActiveUsersGraph = async () => {
    try {
      const url = "http://localhost:5030/api/user-active-count-graph";
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
        setActiveUsersGraph(responseDataJson.activeUsersCount);
      } else {
        setActiveUsersGraph([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAvgUsersDurationGraph = async () => {
    try {
      const url = "http://localhost:5030/api/user-avg-session-graph";
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
        setAvgUsersDurationGraph(responseDataJson.avgUsersDuration);
      } else {
        setAvgUsersDurationGraph([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllRegisteredUsers = async () => {
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
        setAllRegisteredUsers(responseDataJson.usersCount);
      } else {
        setAllRegisteredUsers(0);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllActiveUsers = async () => {
    try {
      const url = "http://localhost:5030/api/count-all-active-users";
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
        setAllActiveUsers(responseDataJson.usersCount);
      } else {
        setAllActiveUsers(0);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTotalAvgSessionDuration = async () => {
    try {
      const url = "http://localhost:5030/api/user-avg-all-session";
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
        const hoursCount = (
          responseDataJson.avgUsersDuration[0].avgUsersDuration / 3600
        ).toFixed(2);
        setTotalAvgSessionDuration(hoursCount);
      } else {
        setTotalAvgSessionDuration(0);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackPage}>
      <div className="admin-dashboard-main-container">
        <div className="container-fluid admin-height-container">
          <div className="row d-md-none">
            <div className="col-12 p-0">
              <AdminDashNavbarCompo />
            </div>
          </div>
          <div className="row admin-height-container">
            <div className="col-12 admin-height-container d-flex p-0">
              <AdminSidebarCompo />

              <div className="admin-main-content-container-dashboard">
                <div className="container-fluid">
                  <AdminDashHeader />
                  <div className="row mt-3 mb-2">
                    <div className="col-12">
                      <div className="d-flex align-items-center">
                        <h3 className="admin-dashboard-main-heading-text">
                          Dashboard
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2 mb-3">
                    <div className="col-12 col-md-4 col-lg-3 min-h-100 mt-3 mb-2">
                      <Link className="admin-dashboard-card-link-item me-2">
                        <div className="admin-dashboard-card admin-dashboard-card-reg-users">
                          <div className="admin-dashboard-card-stats-container">
                            <h3 className="admin-dashboard-card-text">
                              Registered Users
                            </h3>
                            <p className="admin-dashboard-card-number">
                              {allRegisteredUsers}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="col-12 col-md-4 col-lg-3 min-h-100 mt-3 mb-2">
                      <Link className="admin-dashboard-card-link-item me-2">
                        <div className="admin-dashboard-card admin-dashboard-card-active-users">
                          <div className="admin-dashboard-card-stats-container">
                            <h3 className="admin-dashboard-card-text">
                              Active Users
                            </h3>
                            <p className="admin-dashboard-card-number">
                              {allActiveUsers}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="col-12 col-md-4 col-lg-3 min-h-100 mt-3 mb-2">
                      <Link className="admin-dashboard-card-link-item me-2">
                        <div className="admin-dashboard-card admin-dashboard-card-avg-ses-dur">
                          <div className="admin-dashboard-card-stats-container">
                            <h3 className="admin-dashboard-card-text">
                              Average Session Duration
                            </h3>
                            <p className="admin-dashboard-card-number">
                              {totalAvgSessionDuration}
                            </p>{" "}
                            hours
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="row mt-4 mb-2">
                    <div className="col-12 col-md-6 mt-3">
                      <div className="admin-graph-main-container me-2">
                        <ResponsiveContainer width={"100%"} height={"100%"}>
                          <LineChart
                            // width={500}
                            // height={300}
                            data={registeredUsers}
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
                              dataKey="registeredUsersCount"
                              stroke="#8884d8"
                              activeDot={{ r: 8 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mt-3">
                      <div className="admin-graph-main-container me-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            // width={500}
                            // height={300}
                            data={activeUsersGraph}
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
                            <Bar
                              dataKey="activeUsersCount"
                              fill="#82ca9d"
                              activeBar={
                                <Rectangle fill="pink" stroke="blue" />
                              }
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mt-3">
                      <div className="admin-graph-main-container me-2">
                        <ResponsiveContainer width={"100%"} height={"100%"}>
                          <LineChart
                            width={500}
                            height={300}
                            data={avgUsersDurationGraph}
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
                              dataKey="avgUsersDuration"
                              stroke="#ff7300"
                              activeDot={{ r: 8 }}
                            />
                          </LineChart>
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
    </ErrorBoundary>
  );
};

export default AdminDashboardPage;
