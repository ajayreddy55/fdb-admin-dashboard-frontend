import "./App.css";

import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/AdminSignupPage";
import AdminSignupVerifyPage from "./pages/adminSignupVerifyPage";
import AdminLoginPage from "./pages/adminLoginPage";
import AdminDashboardPage from "./pages/adminDashPage";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import VendorDashboardPage from "./pages/vendorDashPage";
import AdminDashPopularCategoriesPage from "./pages/popularCategoriesPage";
import AdminDashSearchQueriesPage from "./pages/searchQueriesPage";

const App = () => {
  return (
    <Routes>
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
      </Route>
      <Route exact path="/vendor-dashboard" element={<VendorDashboardPage />} />
    </Routes>
  );
};

export default App;
