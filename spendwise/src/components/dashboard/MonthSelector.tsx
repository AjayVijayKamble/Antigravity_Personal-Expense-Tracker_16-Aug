import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Calendar } from "lucide-react";
import { formatMonthYear } from "../../utils/formatters";
import { cn } from "../common/Button";

interface MonthSelectorProps {
  options: string[];
  selectedMonth: string;
  onSelect: (month: string) => void;
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({ options, selectedMonth, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent, month: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(month);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className={cn(
          "inline-flex items-center justify-between w-full px-4 py-2.5 text-sm font-semibold text-gray-900 bg-white rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all",
          isOpen && "ring-blue-500 border-transparent bg-gray-50"
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-blue-600" />
          {formatMonthYear(selectedMonth) || "Select Month"}
        </span>
        <ChevronDown className={cn("h-4 w-4 text-gray-500 transition-transform duration-200 ml-2", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 z-50 w-full min-w-[200px] mt-2 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1 overflow-hidden"
          role="listbox"
        >
          {options.map((month) => (
            <div
              key={month}
              className={cn(
                "cursor-pointer select-none relative py-2.5 pl-4 pr-9 text-sm transition-colors",
                month === selectedMonth 
                  ? "text-blue-900 bg-blue-50 font-medium" 
                  : "text-gray-700 hover:bg-gray-100"
              )}
              role="option"
              aria-selected={month === selectedMonth}
              onClick={() => {
                onSelect(month);
                setIsOpen(false);
              }}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, month)}
            >
              <span className="block truncate">
                {formatMonthYear(month)}
              </span>
              {month === selectedMonth && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
