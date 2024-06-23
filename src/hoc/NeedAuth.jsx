import { useLocation, Navigate } from "react-router-dom";
import checkToken from "../utils/checkToken";

// eslint-disable-next-line react/prop-types
const NeedAuth = ({ children }) => {
  const location = useLocation();
  const token = checkToken()

  if (token) {
    return <Navigate to="/content" state={{ from: location }} replace />;
  }

  return children;
};

export { NeedAuth };