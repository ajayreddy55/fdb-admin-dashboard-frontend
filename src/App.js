import "./App.css";

import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/AdminSignupPage";
import AdminSignupVerifyPage from "./pages/adminSignupVerifyPage";
import AdminLoginPage from "./pages/adminLoginPage";
import AdminDashboardPage from "./pages/adminDashPage";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import VendorDashboardPage from "./pages/vendorDashPage";

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
      </Route>
      <Route exact path="/vendor-dashboard" element={<VendorDashboardPage />} />
    </Routes>
  );
};

export default App;
