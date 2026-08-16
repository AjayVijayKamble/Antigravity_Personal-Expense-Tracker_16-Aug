import React from "react";
import { Menu } from "lucide-react";
import { useFinance } from "../../context/FinanceContext";
import { MonthSelector } from "../dashboard/MonthSelector";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, title }) => {
  const { selectedMonth, setSelectedMonth, monthOptions } = useFinance();
  const location = useLocation();
  const isDashboard = location.pathname === "/";

  return (
    <header className="fixed top-0 right-0 left-0 md:left-56 z-40 bg-white border-b border-slate-200/80 h-16 flex items-center justify-between px-6 lg:px-8 shadow-xs select-none">
      <div className="flex items-center">
        <button
          type="button"
          className="text-slate-500 hover:text-slate-700 md:hidden p-2 -ml-2 mr-2 cursor-pointer transition-colors"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h1>
      </div>

      {/* Month Selector in Fixed Header (Single Source of Truth) */}
      {isDashboard && (
        <div className="flex items-center">
          <MonthSelector 
            options={monthOptions} 
            selectedMonth={selectedMonth} 
            onSelect={setSelectedMonth} 
          />
        </div>
      )}
    </header>
  );
};
