import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const AppShell: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/expenses":
        return "Expenses";
      default:
        return "SpendWise";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60">
      {/* Fixed Viewport Sidebar (z-50) */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Main Layout Area (Offset by sidebar width md:pl-56) */}
      <div className="md:pl-56 flex flex-col min-h-screen min-w-0">
        {/* Fixed Viewport Header (z-40) */}
        <Header title={getTitle()} onMenuClick={() => setIsSidebarOpen(true)} />
        
        {/* Scrollable Main Content (pt-20 clears the 64px fixed header) */}
        <main className="pt-20 px-6 pb-8 lg:px-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
