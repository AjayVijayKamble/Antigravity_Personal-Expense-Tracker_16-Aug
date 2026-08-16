import { type Expense } from "../types/finance.types";
import { calculateTotalSpending } from "./expenseUtils";

export const calculateRemainingBudget = (budgetAmount: number, expenses: Expense[]): number => {
  const totalSpending = calculateTotalSpending(expenses);
  return budgetAmount - totalSpending;
};

export const calculateBudgetPercentage = (budgetAmount: number, expenses: Expense[]): number => {
  if (budgetAmount <= 0) return 0;
  const totalSpending = calculateTotalSpending(expenses);
  return (totalSpending / budgetAmount) * 100;
};

export const getBudgetStatus = (percentage: number): "healthy" | "warning" | "exceeded" => {
  if (percentage < 70) return "healthy";
  if (percentage <= 100) return "warning";
  return "exceeded";
};
