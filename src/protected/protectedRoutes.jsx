import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  console.log(user);
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
