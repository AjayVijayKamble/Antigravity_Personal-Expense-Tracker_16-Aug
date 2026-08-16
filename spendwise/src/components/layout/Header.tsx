import React from "react";
import { Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, title, rightAction }) => {
  return (
    <header className="bg-white border-b border-slate-200/60 flex-shrink-0">
      <div className="px-6 lg:px-8 h-16 flex items-center justify-between">
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
        {rightAction && <div>{rightAction}</div>}
      </div>
    </header>
  );
};
