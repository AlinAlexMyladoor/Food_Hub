// App.tsx
import React, { useState, useEffect, createContext, useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import AnimatedBackground from "./components/AnimatedBackground";
import MenuPage from "./pages/MenuPage.tsx";
import OrderPage from "./pages/OrderPage.tsx";
import OrderStatusPage from "./pages/OrderStatusPage.tsx";
import WaiterDashboard from "./pages/WaiterDashboard.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import KitchenDashboard from "./pages/KitchenDashboard.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import RoleGuard from "./components/RoleGuard.tsx";
import OrderConfirmation from "./pages/OrderConfirmation.tsx";

export type Role = "customer" | "waiter" | "admin" | "kitchen";

type AuthContextType = {
  role: Role | null;
  setRole: (r: Role | null) => void;
  username: string | null;
  setUsername: (u: string | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  role: null,
  setRole: () => {},
  username: null,
  setUsername: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

const App: React.FC = () => {
  const [role, setRole] = useState<Role | null>(() => {
    return (localStorage.getItem("role") as Role) || null;
  });
  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem("username") || null;
  });

  const location = useLocation();
  const isAuth = !!role && !!username;

  const dashboardPath = role === "admin"
    ? "/admin"
    : role === "waiter"
    ? "/waiter"
    : role === "kitchen"
    ? "/kitchen"
    : "/";

  useEffect(() => {
    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");
  }, [role]);

  useEffect(() => {
    if (username) localStorage.setItem("username", username);
    else localStorage.removeItem("username");
  }, [username]);

  const logout = () => {
    // Clear auth
    setRole(null);
    setUsername(null);
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    // Clear app-specific data
    localStorage.removeItem("myapp_cart_v1");
    localStorage.removeItem("myapp_table_v1");
    localStorage.removeItem("myapp_orders_v1");

    // Optionally: Clear all localStorage if your app only uses it
    // localStorage.clear();
  };

  if (!isAuth && location.pathname !== "/login" && location.pathname !== "/register") {
    return <Navigate to="/login" replace />;
  }

  if (isAuth && (location.pathname === "/login" || location.pathname === "/register")) {
    return <Navigate to={dashboardPath} replace />;
  }

  return (
    <AuthContext.Provider value={{ role, setRole, username, setUsername, logout }}>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-slate-200 to-slate-100 text-gray-900 relative overflow-x-hidden">
        <AnimatedBackground />
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center transition-all duration-700 ease-in-out">
          <Routes>
            {/* Public / customer routes */}
            <Route path="/" element={<MenuPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/order/:id" element={<OrderStatusPage />} />
            <Route path="/confirm" element={<OrderConfirmation />} />
            <Route
              path="/thank-you"
              element={
                <div className="max-w-3xl mx-auto p-6">
                  <h2 className="text-2xl font-bold mb-2">Thank you!</h2>
                  <p className="text-gray-600">Your order has been received (mock).</p>
                </div>
              }
            />

            {/* Role-protected dashboards */}
            <Route
              path="/waiter"
              element={
                <RoleGuard role="waiter">
                  <WaiterDashboard />
                </RoleGuard>
              }
            />
            <Route path="/kitchen" element={<KitchenDashboard />} />

            <Route
              path="/admin"
              element={
                <RoleGuard role="admin">
                  <AdminDashboard />
                </RoleGuard>
              }
            />

            {/* Auth routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to={dashboardPath} replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
};

export default App;
