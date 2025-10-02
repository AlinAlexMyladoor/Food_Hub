import React from "react";

// Modern animated background with rotating squares and floating shapes
const AnimatedBackground: React.FC = () => (
  <div className="fixed inset-0 -z-20 pointer-events-none">
    {/* Rotating squares */}
    <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-lg animate-rotate-slow shadow-xl" />
    <div className="absolute bottom-20 right-20 w-24 h-24 bg-emerald-200/30 rounded-lg animate-rotate-reverse shadow-lg" />
    {/* Floating circles */}
    <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-indigo-200/40 rounded-full animate-float shadow-md" />
    <div className="absolute bottom-10 left-1/2 w-16 h-16 bg-pink-200/40 rounded-full animate-float-delay shadow-md" />
    {/* More subtle shapes can be added here */}
  </div>
);

export default AnimatedBackground;
