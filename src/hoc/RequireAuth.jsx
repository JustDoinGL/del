import { useLocation, Navigate } from "react-router-dom";
import checkToken from "../utils/checkToken";

// eslint-disable-next-line react/prop-types
const RequireAuth = ({ children }) => {
  const location = useLocation();
  const token = checkToken()

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export { RequireAuth };