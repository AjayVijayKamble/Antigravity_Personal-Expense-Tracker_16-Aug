import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { formatCurrency } from "../../utils/formatters";
import { CATEGORY_COLORS } from "../../utils/constants";
import { type ExpenseCategory } from "../../types/finance.types";

interface CategoryBreakdownProps {
  categoryBreakdown: { name: string; value: number; percentage: string }[];
  totalSpending: number;
}

export const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ 
  categoryBreakdown, 
  totalSpending 
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between h-full">
      {/* Card Header */}
      <h3 className="text-base font-bold text-gray-900 tracking-tight mb-6">Where Your Money Goes</h3>

      {categoryBreakdown.length === 0 ? (
        <div className="h-[280px] flex items-center justify-center text-xs font-semibold text-gray-400">
          No expenses logged for this month
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-6 my-auto">
          {/* Donut Chart */}
          <div className="w-48 h-48 sm:w-52 sm:h-52 relative flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={82}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={CATEGORY_COLORS[entry.name as ExpenseCategory] || CATEGORY_COLORS.Other} 
                    />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value: any) => formatCurrency(Number(value))}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Donut Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg font-extrabold text-gray-900 tracking-tight leading-none">
                {formatCurrency(totalSpending)}
              </span>
              <span className="text-[10px] font-bold tracking-widest text-gray-400 mt-1">TOTAL</span>
            </div>
          </div>

          {/* HTML Legend List */}
          <div className="flex-1 w-full flex flex-col gap-2.5">
            {categoryBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs group">
                <div className="flex items-center gap-2.5">
                  <span 
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: CATEGORY_COLORS[item.name as ExpenseCategory] || CATEGORY_COLORS.Other }} 
                  />
                  <span className="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">{item.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-gray-900">{formatCurrency(item.value)}</span>
                  <span className="text-gray-400 font-medium w-7 text-right">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
