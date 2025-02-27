import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Certified from "./pages/OwnedCars"
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import AuthForm from "./components/AuthForm"; // Import the login/register component

function App() {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const location = useLocation();

  // Check if current route is admin-dashboard
  const isAdminDashboard = location.pathname === "/admin-dashboard";
  const isuserDashboard = location.pathname === "/user-dashboard";
  const isuserLogin = location.pathname === "/user-login";
  const isAuthPage = location.pathname === "/user-login" || location.pathname === "/register";

  return (
    <>
      {/* Hide Navbar only on Admin Dashboard */}
      {!isAdminDashboard && !isuserDashboard && !isuserLogin  && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/certified" element={<Certified />} />
        <Route path="/user-login" element={<AuthForm onClose={() => setShowAuthForm(false)} isRegister={false} />} />
        <Route path="/register" element={<AuthForm onClose={() => setShowAuthForm(false)} isRegister={true} />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Show AuthForm Modal if it's an authentication page */}
      {isAuthPage && <AuthForm onClose={() => setShowAuthForm(false)} isRegister={location.pathname === "/register"} />}
    </>
  );
}

export default App;
