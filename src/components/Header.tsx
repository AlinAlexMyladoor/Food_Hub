import React from 'react';
import { useAuth } from '../App';

const Header: React.FC = () => {
  const { username, role, logout } = useAuth();
  return (
    <header className="w-full bg-white shadow-md py-4 px-8 flex items-center justify-between border-b border-gray-200 animate-fade-in">
      <span className="font-extrabold text-2xl tracking-tight text-gray-900 flex items-center gap-2">
        {/* Modern restaurant icon (SVG) */}
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-500 mr-2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M10 14h4m-2 0v6" /></svg>
        FoodHub
      </span>
      <nav className="space-x-4 flex items-center">
        {username && (
          <span className="text-gray-700 font-semibold mr-4 animate-fade-in">{username} <span className="text-xs text-blue-400">({role})</span></span>
        )}
        {username && (
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold shadow hover:bg-blue-700 transition-all duration-300 scale-100 hover:scale-105 animate-fade-in"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
