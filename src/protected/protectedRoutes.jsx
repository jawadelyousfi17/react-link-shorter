import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Loader from "../comps/loader";

const ProtectedRoute = ({ children }) => {
  const { user, isAuth, loading } = useAuth();

    if (loading) return <Loader></Loader>

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
