import React from 'react';

const Footer: React.FC = () => (
  <footer className="w-full bg-white py-4 px-6 flex items-center justify-center border-t border-gray-200 animate-fade-in mt-8">
    <span className="text-xs text-gray-500">&copy; {new Date().getFullYear()} FoodHub. All rights reserved.</span>
  </footer>
);

export default Footer;
