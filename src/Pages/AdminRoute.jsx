import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute= ({ children }) => {
  const location = useLocation();
  const user =  JSON.parse(localStorage.getItem('user'));
  const token =  localStorage.getItem('access_token');

  if (token && user?.email && user?.user_type === "admin") {
    return children;
  }
  return <Navigate to="/signin" state={{ from: location }} />;
};

export default AdminRoute;