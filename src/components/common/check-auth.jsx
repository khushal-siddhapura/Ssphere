import { Navigate, useLocation } from "react-router-dom";

const protectedRoutes = [
  "/admin/dashboard",
  "/admin/manageadmins",
  "/admin/user",
  "/admin/revenue",
  "/admin/banner",
  "/admin/products",
  "/admin/orders",
  "/admin/complaint",
];

const superAdminRoutes = [
  "/admin/dashboard",
  "/admin/manageadmins",
  "/admin/user",
  "/admin/revenue",
];

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  if (user?.role === "user" && protectedRoutes.includes(location.pathname)) {
    return <Navigate to="/unauth-page" />;
  }

  if (user?.role === "admin" && superAdminRoutes.includes(location.pathname)) {
    return <Navigate to="/unauth-page" />;
  }
  return <>{children}</>;
}

export default CheckAuth;
