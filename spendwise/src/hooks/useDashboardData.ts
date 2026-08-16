import { useMemo } from "react";
import { type Expense, type MonthlyBudget } from "../types/finance.types";
import { groupExpensesByCategory, groupExpensesByDate } from "../utils/expenseUtils";
import { generateLastNMonths } from "../utils/formatters";

export interface DashboardData {
  thisMonthExpenses: Expense[];
  totalSpending: number;
  transactionCount: number;
  averageExpense: number;
  categoryCount: number;
  
  budget: MonthlyBudget | null;
  remainingBudget: number;
  budgetPercentage: number;
  
  dailySpending: { date: string; amount: number; fullDate: string }[];
  weeklySpending: { label: string; amount: number; range: string }[];
  monthlyHistory: { month: string; label: string; amount: number; isSelected: boolean }[];
  
  categoryBreakdown: { name: string; value: number; percentage: string }[];
  
  previousMonth: string;
  previousTotal: number;
  spendingChange: { type: 'increase' | 'decrease' | 'same', percent: number, text: string } | null;
  
  largestCategory: { name: string; amount: number; percentage: number } | null;
  recentTransactions: Expense[];
}

export const useDashboardData = (
  expenses: Expense[], 
  getBudget: (month: string) => MonthlyBudget | null, 
  selectedMonth: string
): DashboardData => {
  return useMemo(() => {
    // Current month expenses
    const thisMonthExpenses = expenses.filter(e => e.date.startsWith(selectedMonth));
    const totalSpending = thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
    const transactionCount = thisMonthExpenses.length;
    const averageExpense = transactionCount > 0 ? totalSpending / transactionCount : 0;
    
    // Budget
    const budget = getBudget(selectedMonth);
    const budgetAmount = budget?.amount || 0;
    const remainingBudget = budgetAmount - totalSpending;
    const budgetPercentage = budgetAmount > 0 ? (totalSpending / budgetAmount) * 100 : 0;

    // Categories
    const groupedCategories = groupExpensesByCategory(thisMonthExpenses);
    const categoryCount = Object.keys(groupedCategories).filter(k => groupedCategories[k] > 0).length;
    
    const categoryBreakdown = Object.entries(groupedCategories)
      .filter(([_, value]) => value > 0)
      .map(([name, value]) => ({
        name,
        value,
        percentage: ((value / totalSpending) * 100).toFixed(0)
      }))
      .sort((a, b) => b.value - a.value);

    const largestCategory = categoryBreakdown.length > 0 ? {
      name: categoryBreakdown[0].name,
      amount: categoryBreakdown[0].value,
      percentage: parseInt(categoryBreakdown[0].percentage)
    } : null;

    // Daily Spending
    const [year, month] = selectedMonth.split("-").map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    const groupedDaily = groupExpensesByDate(thisMonthExpenses);
    
    const dailySpending = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${selectedMonth}-${String(day).padStart(2, '0')}`;
      dailySpending.push({
        date: String(day).padStart(2, '0'),
        amount: groupedDaily[dateStr] || 0,
        fullDate: dateStr
      });
    }

    // Weekly Spending Aggregation
    const weeklyBuckets = [
      { label: 'Week 1', amount: 0, range: 'Days 1-7' },
      { label: 'Week 2', amount: 0, range: 'Days 8-14' },
      { label: 'Week 3', amount: 0, range: 'Days 15-21' },
      { label: 'Week 4', amount: 0, range: 'Days 22-28' },
      { label: 'Week 5', amount: 0, range: `Days 29-${daysInMonth}` },
    ];

    thisMonthExpenses.forEach(e => {
      const day = parseInt(e.date.split('-')[2], 10);
      if (day <= 7) weeklyBuckets[0].amount += e.amount;
      else if (day <= 14) weeklyBuckets[1].amount += e.amount;
      else if (day <= 21) weeklyBuckets[2].amount += e.amount;
      else if (day <= 28) weeklyBuckets[3].amount += e.amount;
      else if (weeklyBuckets[4]) weeklyBuckets[4].amount += e.amount;
    });

    const weeklySpending = daysInMonth > 28 ? weeklyBuckets : weeklyBuckets.slice(0, 4);

    // 6-Month Historical Monthly Spending
    const monthOptions6 = generateLastNMonths(6, "2026-08").reverse();
    const monthlyHistory = monthOptions6.map(mStr => {
      const mExpenses = expenses.filter(e => e.date.startsWith(mStr));
      const total = mExpenses.reduce((sum, e) => sum + e.amount, 0);
      const monthName = new Date(`${mStr}-01`).toLocaleString('default', { month: 'short' });
      return {
        month: mStr,
        label: monthName,
        amount: total,
        isSelected: mStr === selectedMonth
      };
    });

    // Previous Month Comparison
    const prevDate = new Date(year, month - 2); 
    const previousMonth = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`;
    const previousMonthExpenses = expenses.filter(e => e.date.startsWith(previousMonth));
    const previousTotal = previousMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
    
    let spendingChange: { type: 'increase' | 'decrease' | 'same', percent: number, text: string } | null = null;
    if (previousTotal > 0) {
      const diff = totalSpending - previousTotal;
      const percentChange = Math.abs(Math.round((diff / previousTotal) * 100));
      if (diff > 0) {
        spendingChange = { type: 'increase' as const, percent: percentChange, text: `↑ ${percentChange}% vs previous month` };
      } else if (diff < 0) {
        spendingChange = { type: 'decrease' as const, percent: percentChange, text: `↓ ${percentChange}% vs previous month` };
      } else {
        spendingChange = { type: 'same' as const, percent: 0, text: `Same as previous month` };
      }
    } else if (previousMonthExpenses.length > 0 && totalSpending > 0) {
       spendingChange = { type: 'increase' as const, percent: 100, text: `↑ 100% vs previous month` };
    }

    // Recent Transactions
    const recentTransactions = [...thisMonthExpenses]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    return {
      thisMonthExpenses,
      totalSpending,
      transactionCount,
      averageExpense,
      categoryCount,
      budget,
      remainingBudget,
      budgetPercentage,
      dailySpending,
      weeklySpending,
      monthlyHistory,
      categoryBreakdown,
      previousMonth,
      previousTotal,
      spendingChange,
      largestCategory,
      recentTransactions
    };
  }, [expenses, getBudget, selectedMonth]);
};
