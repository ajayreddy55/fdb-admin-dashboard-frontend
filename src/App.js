import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/AdminSignupPage";
import AdminSignupVerifyPage from "./pages/adminSignupVerifyPage";
import AdminLoginPage from "./pages/adminLoginPage";
import AdminDashboardPage from "./pages/adminDashPage";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import VendorDashboardPage from "./pages/vendorDashPage";
import AdminDashPopularCategoriesPage from "./pages/popularCategoriesPage";
import AdminDashSearchQueriesPage from "./pages/searchQueriesPage";
import AdminDashboardUsersPage from "./pages/adminDashUsersPage";
import AdminDashboardServicesPage from "./pages/adminDashServicesPage";
import AdminDashboardReviewsPage from "./pages/adminDashReviewsPage";
import AdminDashboardPaymentsPage from "./pages/adminDashPaymentsPage";
import AdminDashboardProfilePage from "./pages/adminDashProfilePage";

const App = () => {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Navigate to="/admin-dashboard" replace={true} />}
      />
      <Route exact path="/admin-signup" element={<SignupPage />} />
      <Route
        exact
        path="/admin-signup-verify-page/:token"
        element={<AdminSignupVerifyPage />}
      />
      <Route exact path="/admin-login" element={<AdminLoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route exact path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route
          exact
          path="/admin-popular-categories"
          element={<AdminDashPopularCategoriesPage />}
        />
        <Route
          exact
          path="/admin-search-queries"
          element={<AdminDashSearchQueriesPage />}
        />
        <Route
          exact
          path="/admin-dash-users"
          element={<AdminDashboardUsersPage />}
        />
        <Route
          exact
          path="/admin-dash-services"
          element={<AdminDashboardServicesPage />}
        />
        <Route
          exact
          path="/admin-dash-reviews"
          element={<AdminDashboardReviewsPage />}
        />
        <Route
          exact
          path="/admin-dash-payments"
          element={<AdminDashboardPaymentsPage />}
        />
        <Route
          exact
          path="/admin-dash-profile"
          element={<AdminDashboardProfilePage />}
        />
      </Route>
      <Route exact path="/vendor-dashboard" element={<VendorDashboardPage />} />
    </Routes>
  );
};

export default App;
