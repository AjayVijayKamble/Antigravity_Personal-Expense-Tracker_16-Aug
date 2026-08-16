import React from "react";
import { cn } from "../common/Button";

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, trend, className }) => {
  return (
    <div className={cn("bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow duration-200 group relative overflow-hidden", className)}>
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-sm font-medium text-gray-500 tracking-wide">{title}</h3>
        <div className="p-2 bg-blue-50/50 text-blue-600 rounded-lg group-hover:bg-blue-100/50 transition-colors">
          {icon}
        </div>
      </div>
      
      <div className="relative z-10">
        <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
        
        {trend && (
          <div className="mt-3 flex items-center">
            <span className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              trend.isPositive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
            )}>
              {trend.value}
            </span>
          </div>
        )}
      </div>

      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500 pointer-events-none" />
    </div>
  );
};
