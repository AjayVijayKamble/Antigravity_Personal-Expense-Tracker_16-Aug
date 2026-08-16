import React from "react";
import { Lightbulb, ArrowDown, ArrowUp, Minus, BarChart3 } from "lucide-react";

interface SpendingInsightProps {
  largestCategory: { name: string; amount: number; percentage: number } | null;
  spendingChange: { type: 'increase' | 'decrease' | 'same', percent: number, text: string } | null;
}

export const SpendingInsight: React.FC<SpendingInsightProps> = ({ largestCategory, spendingChange }) => {
  return (
    <div className="bg-emerald-50/40 border border-emerald-100/80 rounded-2xl p-6 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Background Graphic Accent */}
      <div className="absolute -right-3 -bottom-3 opacity-15 text-emerald-600 pointer-events-none">
        <BarChart3 className="h-32 w-32" />
      </div>

      <div>
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-bold text-emerald-900 tracking-tight">Spending Insight</h3>
        </div>

        {/* Narrative Body */}
        {largestCategory ? (
          <p className="text-xs font-semibold text-gray-700 leading-relaxed mb-6">
            <span className="font-bold text-gray-900">{largestCategory.name}</span> is your largest expense category this month, accounting for <span className="font-bold text-gray-900">{largestCategory.percentage}%</span> of total spending.
          </p>
        ) : (
          <p className="text-xs font-semibold text-gray-500 leading-relaxed mb-6">
            Log your expenses to get personalized spending insights.
          </p>
        )}
      </div>

      {/* Comparison Footer */}
      {spendingChange && (
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 relative z-10">
          {spendingChange.type === 'decrease' ? (
            <ArrowDown className="h-3.5 w-3.5 text-emerald-600" />
          ) : spendingChange.type === 'increase' ? (
            <ArrowUp className="h-3.5 w-3.5 text-rose-600" />
          ) : (
            <Minus className="h-3.5 w-3.5 text-gray-500" />
          )}
          <span className={spendingChange.type === 'increase' ? "text-rose-700" : "text-emerald-700"}>
            {spendingChange.text.replace('previous month', 'July')}
          </span>
        </div>
      )}
    </div>
  );
};
