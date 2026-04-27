import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import AdminLayout from "./components/Layout/AdminLayout";
import ForgotPassword from "./pages/ForgotPassword";
import AppSettings     from "./pages/AppSettings";
import ProfileSettings from "./pages/ProfileSettings";
import AllUsers from "./pages/users/AllUsers";
import RolesPage from "./pages/users/RolesPage";
import UserActivity  from "./pages/users/UserActivity";
import AnalyticsOverview from "./pages/analytics/AnalyticsOverview";
import AnalyticsReports  from "./pages/analytics/AnalyticsReports";
import AnalyticsInsights from "./pages/analytics/AnalyticsInsights";
import Products from "./pages/ecommerce/Products";
import Orders from "./pages/ecommerce/Orders";
import Customers from "./pages/ecommerce/Customers";
import Inventory    from "./pages/Inventory";
import Transactions from "./pages/Transactions";
import Messages     from "./pages/Messages";
import CalendarPage from "./pages/CalendarPage";
import Reports      from "./pages/Reports";

function App() {
  const token = localStorage.getItem("token");
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <Routes>

        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Forgot Password Page */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            token ? (
              <AdminLayout onToggleTheme={toggleTheme} />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          {/* Default inside admin → Dashboard */}
          <Route index element={<Dashboard />} />

          {/* App Settings */}
          <Route path="settings" element={<AppSettings />} />

          {/* Profile Settings */}
          <Route path="profile/settings" element={<ProfileSettings />} />
          <Route path="profile" element={<Navigate to="profile/settings" replace />} />

          {/* Users */}
          <Route path="users" element={<Navigate to="users/all-users" replace />} />
          <Route path="users/all-users" element={<AllUsers />} />
          <Route path="users/activity" element={<UserActivity />} />
          <Route path="roles" element={<RolesPage />} />

          {/* Analytics */}
          <Route path="analytics/overview" element={<AnalyticsOverview />} />
          <Route path="analytics/reports"  element={<AnalyticsReports />} />
          <Route path="analytics/insights" element={<AnalyticsInsights />} />
          <Route path="analytics" element={<Navigate to="analytics/overview" replace />} />

          {/* E-commerce */}
          <Route path="ecommerce/products" element={<Products />} />
          <Route path="ecommerce/orders" element={<Orders />} />
          <Route path="ecommerce/customers" element={<Customers />} />
          <Route path="ecommerce" element={<Navigate to="ecommerce/products" replace />} />

          {/* Inventory */}
          <Route path="inventory"    element={<Inventory />} />

          {/* Transactions */}
          <Route path="transactions" element={<Transactions />} />

          {/* Messages */}
          <Route path="messages"     element={<Messages />} />

          {/* Calendar */}  
          <Route path="calendar"     element={<CalendarPage />} />

          {/* Reports */} 
          <Route path="reports"      element={<Reports />} />

        </Route>

      </Routes>
    </div>
  );
}

export default App;