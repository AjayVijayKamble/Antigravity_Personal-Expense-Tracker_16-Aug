import React, { useState, useRef, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { formatCurrency, formatMonthYear } from "../../utils/formatters";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "../common/Button";

type ChartViewMode = 'daily' | 'weekly' | 'monthly';

interface SpendingChartProps {
  dailySpending: { date: string; amount: number; fullDate: string }[];
  weeklySpending: { label: string; amount: number; range: string }[];
  monthlyHistory: { month: string; label: string; amount: number; isSelected: boolean }[];
  selectedMonth: string;
}

const CustomTooltip = ({ active, payload, mode }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    let title = "";
    let amount = payload[0].value;

    if (mode === 'daily') {
      const dateObj = new Date(data.fullDate);
      title = `${dateObj.getDate()} ${dateObj.toLocaleString('default', { month: 'short' })} ${dateObj.getFullYear()}`;
    } else if (mode === 'weekly') {
      title = `${data.label} (${data.range})`;
    } else if (mode === 'monthly') {
      title = formatMonthYear(data.month);
    }

    return (
      <div className="bg-slate-900 text-white text-xs py-2 px-3 rounded-xl shadow-xl border border-slate-800">
        <p className="font-semibold text-slate-300 mb-0.5">{title}</p>
        <p className="text-sm font-bold text-white">{formatCurrency(amount)}</p>
      </div>
    );
  }
  return null;
};

export const SpendingChart: React.FC<SpendingChartProps> = ({ 
  dailySpending, 
  weeklySpending, 
  monthlyHistory, 
  selectedMonth 
}) => {
  const [mode, setMode] = useState<ChartViewMode>('daily');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const monthName = new Date(`${selectedMonth}-01`).toLocaleString('default', { month: 'short' });
  const selectedMonthYear = formatMonthYear(selectedMonth);

  // Prepare active dataset and subtitle based on view mode
  const getChartConfig = () => {
    switch (mode) {
      case 'weekly':
        return {
          data: weeklySpending,
          xKey: 'label',
          subtitle: `Weekly spending · ${selectedMonthYear}`,
          maxBarSize: 32
        };
      case 'monthly':
        return {
          data: monthlyHistory,
          xKey: 'label',
          subtitle: `Monthly spending · March–August 2026`,
          maxBarSize: 32
        };
      case 'daily':
      default:
        return {
          data: dailySpending,
          xKey: 'date',
          subtitle: `Daily spending · ${selectedMonthYear}`,
          maxBarSize: 16
        };
    }
  };

  const chartConfig = getChartConfig();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between h-full">
      {/* Card Header & Dynamic Titles */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-900 tracking-tight">Spending Over Time</h3>
          <p className="text-xs font-semibold text-gray-400 mt-0.5">{chartConfig.subtitle}</p>
        </div>

        {/* Aggregation Control Dropdown */}
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={cn(
              "bg-gray-50 border border-gray-200/80 text-xs font-semibold text-gray-700 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer hover:bg-gray-100 transition-all select-none focus:outline-none focus:ring-2 focus:ring-blue-500/20",
              isDropdownOpen && "ring-2 ring-blue-500/20 border-blue-400 bg-blue-50/50"
            )}
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
          >
            <span className="capitalize">{mode}</span>
            <ChevronDown className={cn("h-3.5 w-3.5 text-gray-400 transition-transform duration-200", isDropdownOpen && "rotate-180")} />
          </button>

          {isDropdownOpen && (
            <div 
              className="absolute right-0 z-30 w-36 mt-1.5 origin-top-right bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
              role="listbox"
            >
              {[
                { id: 'daily', label: 'Daily' },
                { id: 'weekly', label: 'Weekly' },
                { id: 'monthly', label: 'Monthly' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setMode(opt.id as ChartViewMode);
                    setIsDropdownOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold cursor-pointer transition-colors text-left",
                    mode === opt.id ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                  )}
                  role="option"
                  aria-selected={mode === opt.id}
                >
                  <span>{opt.label}</span>
                  {mode === opt.id && <Check className="h-3.5 w-3.5 text-blue-600" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-[290px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartConfig.data as any[]}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis 
              dataKey={chartConfig.xKey} 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#94A3B8', fontWeight: 500 }}
              tickFormatter={(value, index) => {
                if (mode === 'daily') {
                  const num = parseInt(value, 10);
                  if (num === 1 || num % 5 === 0 || index === dailySpending.length - 1) return `${num} ${monthName}`;
                  return '';
                }
                return value;
              }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#94A3B8', fontWeight: 500 }}
              tickFormatter={(value) => `₹${value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`}
            />
            <Tooltip cursor={{ fill: '#F8FAFC' }} content={<CustomTooltip mode={mode} />} />
            <Bar 
              dataKey="amount" 
              fill="#3B82F6" 
              radius={[6, 6, 0, 0]} 
              maxBarSize={chartConfig.maxBarSize}
            >
              {mode === 'monthly' && chartConfig.data.map((entry: any, idx: number) => (
                <Cell 
                  key={`cell-${idx}`} 
                  fill={entry.isSelected ? "#2563EB" : "#94A3B8"} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
