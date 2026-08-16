import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Receipt, X, ChevronRight, TrendingUp } from "lucide-react";
import { cn } from "../common/Button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/expenses", icon: Receipt, label: "Expenses" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 md:hidden backdrop-blur-sm cursor-pointer"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Viewport Height Fixed */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-56 h-screen bg-[#0F172A] text-slate-300 transform transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col justify-between border-r border-slate-800/60 flex-shrink-0 select-none",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Top Header & Navigation */}
        <div className="flex flex-col flex-1 min-h-0">
          {/* Top Logo */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800/40 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30 text-white font-bold text-base">
                S
              </div>
              <span className="text-lg font-bold tracking-tight text-white">SpendWise</span>
            </div>
            <button
              className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer transition-colors"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-6 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => onClose()}
                className={({ isActive }) => cn(
                  "group flex items-center px-3.5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                )}
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={cn(
                      "mr-3 h-4 w-4 flex-shrink-0 transition-colors",
                      isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                    )} />
                    {item.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Section: Fixed Anchored Profile + Promo */}
        <div className="p-3.5 space-y-3 flex-shrink-0 border-t border-slate-800/40 bg-[#0F172A]">
          {/* Promo Box */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900 border border-slate-700/50 rounded-xl p-3 text-white relative overflow-hidden group">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">
              <TrendingUp className="h-4 w-4" />
            </div>
            <h4 className="text-xs font-bold tracking-tight text-white mb-0.5">Take control of finances</h4>
            <p className="text-[11px] text-slate-400">Track. Analyze. Save.</p>
          </div>

          {/* User Profile */}
          <div className="flex items-center justify-between pt-1 px-1 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-md">
                A
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">Ajay Kamble</p>
                <p className="text-[10px] text-slate-400">View profile</p>
              </div>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
          </div>
        </div>
      </aside>
    </>
  );
};
