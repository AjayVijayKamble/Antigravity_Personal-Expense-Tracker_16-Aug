import React, { useState, useMemo } from "react";
import { useFinance } from "../context/FinanceContext";
import { SpendingChart } from "../components/dashboard/SpendingChart";
import { CategoryBreakdown } from "../components/dashboard/CategoryBreakdown";
import { BudgetProgress } from "../components/dashboard/BudgetProgress";
import { SupportingMetrics } from "../components/dashboard/SupportingMetrics";
import { MonthSelector } from "../components/dashboard/MonthSelector";
import { SpendingInsight } from "../components/dashboard/SpendingInsight";
import { RecentTransactions } from "../components/dashboard/RecentTransactions";
import { useDashboardData } from "../hooks/useDashboardData";
import { formatCurrency, generateLastNMonths, formatMonthYear } from "../utils/formatters";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

export const Dashboard: React.FC = () => {
  const { expenses, getBudget, setBudget } = useFinance();
  
  // Options for the last 6 months starting from August 2026
  const monthOptions = useMemo(() => generateLastNMonths(6, "2026-08"), []);
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0]);
  
  const data = useDashboardData(expenses, getBudget, selectedMonth);

  return (
    <div className="max-w-[1500px] mx-auto space-y-5 pb-8">
      
      {/* Month Selector Controls Row (Top Right Header Alignment) */}
      <div className="flex items-center justify-between pb-1">
        <div className="md:hidden text-lg font-bold text-gray-900">Dashboard</div>
        <div className="ml-auto">
          <MonthSelector 
            options={monthOptions} 
            selectedMonth={selectedMonth} 
            onSelect={setSelectedMonth} 
          />
        </div>
      </div>

      {/* LEVEL 1 & 2: HERO SECTION (Overview Card with Sparkline + Budget Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left Column: Primary Financial Position with Data-Driven Sparkline */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between relative overflow-hidden group">
          
          {/* Subtle Data-Driven Sparkline Background Graph */}
          <div className="absolute right-0 bottom-0 w-80 h-36 opacity-20 pointer-events-none transition-opacity group-hover:opacity-30">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.dailySpending} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="heroSparklineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#3B82F6" 
                  strokeWidth={3} 
                  fill="url(#heroSparklineGrad)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Hero Content */}
          <div className="relative z-10">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 mb-1 block">
              OVERVIEW
            </span>
            <p className="text-xs font-semibold text-gray-400 mb-3">
              Your financial snapshot for {formatMonthYear(selectedMonth)}.
            </p>

            <div className="text-5xl font-extrabold text-gray-900 tracking-tight mb-2">
              {formatCurrency(data.totalSpending)}
            </div>

            <div className="text-xs font-semibold text-gray-700 mb-3">
              spent this month
            </div>

            {data.spendingChange && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-xs">
                {data.spendingChange.type === 'decrease' ? (
                  <ArrowDownRight className="h-3.5 w-3.5 text-emerald-600" />
                ) : data.spendingChange.type === 'increase' ? (
                  <ArrowUpRight className="h-3.5 w-3.5 text-rose-600" />
                ) : null}
                <span className={data.spendingChange.type === 'increase' ? "text-rose-600" : "text-emerald-600"}>
                  {data.spendingChange.text.replace('previous month', 'July')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Monthly Budget Card */}
        <div className="lg:col-span-5 min-h-[220px]">
          <BudgetProgress 
            budget={data.budget} 
            totalSpending={data.totalSpending}
            budgetPercentage={data.budgetPercentage}
            remainingBudget={data.remainingBudget}
            onSetBudget={(amt) => setBudget(amt, selectedMonth)} 
          />
        </div>
      </div>

      {/* LEVEL 3: SUPPORTING METRICS */}
      <div>
        <SupportingMetrics 
          transactionCount={data.transactionCount}
          averageExpense={data.averageExpense}
          categoryCount={data.categoryCount}
        />
      </div>

      {/* LEVEL 4: ANALYTICS ROW (Spending Chart + Category Breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-7 min-h-[360px]">
          <SpendingChart 
            dailySpending={data.dailySpending} 
            weeklySpending={data.weeklySpending}
            monthlyHistory={data.monthlyHistory}
            selectedMonth={selectedMonth} 
          />
        </div>
        <div className="lg:col-span-5 min-h-[360px]">
          <CategoryBreakdown 
            categoryBreakdown={data.categoryBreakdown} 
            totalSpending={data.totalSpending} 
          />
        </div>
      </div>

      {/* LEVEL 5: DETAILS ROW (Recent Transactions + Spending Insight) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-7 flex flex-col">
          <RecentTransactions transactions={data.recentTransactions} />
        </div>
        <div className="lg:col-span-5 flex flex-col">
          <SpendingInsight largestCategory={data.largestCategory} spendingChange={data.spendingChange} />
        </div>
      </div>

    </div>
  );
};
