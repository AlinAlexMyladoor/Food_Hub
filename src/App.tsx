
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import AnimatedBackground from './components/AnimatedBackground';
import MenuPage from './pages/MenuPage.tsx';
import OrderPage from './pages/OrderPage.tsx';
import OrderStatusPage from './pages/OrderStatusPage.tsx';
import WaiterDashboard from './pages/WaiterDashboard.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import RoleGuard from './components/RoleGuard.tsx';

type Role = 'customer' | 'waiter' | 'admin';
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
    return (localStorage.getItem('role') as Role) || null;
  });
  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem('username') || null;
  });
  useEffect(() => {
    if (role) localStorage.setItem('role', role);
    else localStorage.removeItem('role');
  }, [role]);
  useEffect(() => {
    if (username) localStorage.setItem('username', username);
    else localStorage.removeItem('username');
  }, [username]);
  const logout = () => {
    setRole(null);
    setUsername(null);
    localStorage.removeItem('role');
    localStorage.removeItem('username');
  };

  // Only allow access to login/register if not authenticated
  // Otherwise, redirect to dashboard for their role
  const location = useLocation();
  const isAuth = !!role && !!username;
  const dashboardPath =
    role === 'admin' ? '/admin' : role === 'waiter' ? '/waiter' : '/';

  // If not logged in, always show login page except for /register
  if (!isAuth && location.pathname !== '/login' && location.pathname !== '/register') {
    return <Navigate to="/login" replace />;
  }
  // If logged in and on login/register, redirect to dashboard
  if (isAuth && (location.pathname === '/login' || location.pathname === '/register')) {
    return <Navigate to={dashboardPath} replace />;
  }

  return (
    <AuthContext.Provider value={{ role, setRole, username, setUsername, logout }}>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-slate-200 to-slate-100 text-gray-900 relative overflow-x-hidden">
        {/* Modern animated background graphics */}
        <AnimatedBackground />
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center transition-all duration-700 ease-in-out">
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/order/:id" element={<OrderStatusPage />} />
            <Route path="/waiter" element={<RoleGuard role="waiter"><WaiterDashboard /></RoleGuard>} />
            <Route path="/admin" element={<RoleGuard role="admin"><AdminDashboard /></RoleGuard>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to={dashboardPath} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
};

export default App;
