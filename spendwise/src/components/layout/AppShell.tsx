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
    <div className="min-h-screen bg-slate-50/60 flex">
      {/* Fixed Viewport Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Main Content Area (Offset by sidebar width md:pl-56) */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-56">
        <Header title={getTitle()} onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 px-6 py-6 lg:px-8 lg:py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
