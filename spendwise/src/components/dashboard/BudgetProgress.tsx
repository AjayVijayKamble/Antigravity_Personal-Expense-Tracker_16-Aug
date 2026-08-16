import React, { useState } from "react";
import { type MonthlyBudget } from "../../types/finance.types";
import { formatCurrency } from "../../utils/formatters";
import { Wallet, Edit2 } from "lucide-react";

interface BudgetProgressProps {
  budget: MonthlyBudget | null;
  totalSpending: number;
  budgetPercentage: number;
  remainingBudget: number;
  onSetBudget: (amount: number) => void;
}

export const BudgetProgress: React.FC<BudgetProgressProps> = ({ 
  budget, 
  totalSpending,
  budgetPercentage,
  remainingBudget,
  onSetBudget 
}) => {
  const [isEditing, setIsEditing] = useState(!budget);
  const [inputValue, setInputValue] = useState(budget?.amount?.toString() || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(inputValue);
    if (!isNaN(val) && val > 0) {
      onSetBudget(val);
      setIsEditing(false);
    }
  };

  const isOverBudget = remainingBudget < 0;
  const clampedPercentage = Math.min(100, Math.max(0, budgetPercentage));
  
  // Semantic colors matching target design
  const progressColor = isOverBudget ? "bg-rose-500" : budgetPercentage > 85 ? "bg-amber-500" : "bg-emerald-500";
  const percentageTextColor = isOverBudget ? "text-rose-600" : budgetPercentage > 85 ? "text-amber-600" : "text-emerald-600";
  const iconBgColor = isOverBudget ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-gray-900 tracking-tight">Monthly Budget</h3>
        <div className="flex items-center gap-2">
          {budget && !isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-md"
              title="Edit Budget"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </button>
          )}
          <div className={`w-10 h-10 rounded-2xl ${iconBgColor} flex items-center justify-center flex-shrink-0`}>
            <Wallet className="h-5 w-5" />
          </div>
        </div>
      </div>

      {isEditing || !budget ? (
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Set Target Budget</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm">₹</span>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-semibold text-base"
                placeholder="e.g. 45000"
                min="1"
                step="100"
                autoFocus
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              type="submit"
              disabled={!inputValue || parseFloat(inputValue) <= 0}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              Save Budget
            </button>
            {budget && (
              <button 
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setInputValue(budget.amount.toString());
                }}
                className="px-3 py-2 text-gray-500 text-xs font-medium hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      ) : (
        <div>
          {/* Total Budget Amount */}
          <div className="mb-4">
            <div className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {formatCurrency(budget.amount)}
            </div>
            <div className="text-xs font-semibold text-gray-400 mt-0.5">budget</div>
          </div>

          {/* Stats Split: Spent vs Remaining */}
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-gray-700">
              {formatCurrency(totalSpending)} <span className="font-medium text-gray-400">spent</span>
            </span>
            <span className="font-semibold text-gray-500">
              {isOverBudget ? (
                <span className="text-rose-600 font-bold">{formatCurrency(Math.abs(remainingBudget))} over budget</span>
              ) : (
                <span>{formatCurrency(remainingBudget)} <span className="font-medium text-gray-400">remaining</span></span>
              )}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden mb-2.5">
            <div 
              className={`h-full ${progressColor} rounded-full transition-all duration-500 ease-out`}
              style={{ width: `${clampedPercentage}%` }}
            />
          </div>

          {/* Used percentage */}
          <div className={`text-xs font-bold ${percentageTextColor}`}>
            {budgetPercentage.toFixed(1)}% used
          </div>
        </div>
      )}
    </div>
  );
};
