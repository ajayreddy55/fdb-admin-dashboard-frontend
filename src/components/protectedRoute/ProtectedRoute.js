import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = (props) => {
  const jwtToken = Cookies.get("fdb_admin_jwt_token");

  if (jwtToken === undefined) {
    return <Navigate to={"/admin-login"} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
