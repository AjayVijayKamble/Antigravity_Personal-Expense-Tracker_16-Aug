import React from "react";
import { FileText, TrendingUp, Tag } from "lucide-react";
import { formatCurrency } from "../../utils/formatters";

interface SupportingMetricsProps {
  transactionCount: number;
  averageExpense: number;
  categoryCount: number;
}

export const SupportingMetrics: React.FC<SupportingMetricsProps> = ({
  transactionCount,
  averageExpense,
  categoryCount,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x divide-gray-100">
        
        {/* Metric 1: Transactions */}
        <div className="flex items-center gap-4 md:px-6 first:pl-0 group">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 tracking-tight">{transactionCount}</div>
            <div className="text-xs font-semibold text-gray-400 tracking-wide mt-0.5">Transactions</div>
          </div>
        </div>

        {/* Metric 2: Average Expense */}
        <div className="flex items-center gap-4 md:px-6 group">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 tracking-tight">{formatCurrency(averageExpense)}</div>
            <div className="text-xs font-semibold text-gray-400 tracking-wide mt-0.5">Average Expense</div>
          </div>
        </div>

        {/* Metric 3: Categories */}
        <div className="flex items-center gap-4 md:px-6 last:pr-0 group">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
            <Tag className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 tracking-tight">{categoryCount}</div>
            <div className="text-xs font-semibold text-gray-400 tracking-wide mt-0.5">Categories</div>
          </div>
        </div>

      </div>
    </div>
  );
};
