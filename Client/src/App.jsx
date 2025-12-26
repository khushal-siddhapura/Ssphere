import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminBanner from "./pages/admin-view/Banner";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import DashboardView from "./pages/admin-view/DashboardView";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import PaypalCancelPage from "./pages/shopping-view/paypal-cancel";
import AboutUs from "./pages/shopping-view/AboutUs";
import ContactUs from "./pages/shopping-view/ContactUs";
import ComplaintPanel from "./pages/shopping-view/ComplaintPanel";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ComplainView from "./pages/admin-view/ComplainView";
import AdminList from "./pages/admin-view/AdminList";
import UserManagement from "./components/admin-view/UserManagement";
import RevenueData from "./pages/admin-view/RevenueData";
// import PrivateRoute from "./components/PrivateRoute";  // import PrivateRoute component

const PrivateRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }
  return children;
};

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Public Routes */}
        {/* <Route path="/" element={<ShoppingHome />} /> */}
        <Route path="/" element={<Navigate to="/shop/home" />} />
        {/* <Route path="/shop/home" element={<ShoppingHome />} /> */}
        <Route path="/shop" element={<ShoppingLayout />}>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="paypal-cancel" element={<PaypalCancelPage />} />
          <Route
            path="payment-success/:orderId"
            element={<PaymentSuccessPage />}
          />
          <Route path="search" element={<SearchProducts />} />
        </Route>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/complaint/:id" element={<ComplaintPanel />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/unauth-page" element={<UnauthPage />} />

        {/* Authentication Routes (Accessible for all users) */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Protected (Private) Routes */}
        <Route
          path="/admin"
          element={
            // <PrivateRoute isAuthenticated={isAuthenticated}>
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="banner" element={<AdminBanner />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="complaint" element={<ComplainView />} />
          <Route path="sales" element={<RevenueData />} />
          <Route path="manageadmins" element={<AdminList />} />
          <Route path="user" element={<UserManagement />} />
          <Route path="dashboard" element={<DashboardView />} />
        </Route>

        {/* Protected Shopping Routes */}
        <Route
          path="/shop/account"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ShoppingAccount />
            </PrivateRoute>
          }
        />

        {/* Catch-all Route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
