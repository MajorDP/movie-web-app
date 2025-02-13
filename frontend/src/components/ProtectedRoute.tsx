import { useContext } from "react";
import { AuthContext } from "../context/userContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { user } = useContext(AuthContext);

  if (!user.isLoggedIn) {
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
