import { type Expense } from "../types/finance.types";

export const calculateTotalSpending = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const calculateAverageExpense = (expenses: Expense[]): number => {
  if (expenses.length === 0) return 0;
  return calculateTotalSpending(expenses) / expenses.length;
};

export const groupExpensesByCategory = (expenses: Expense[]): Record<string, number> => {
  return expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);
};

export const groupExpensesByDate = (expenses: Expense[]): Record<string, number> => {
  return expenses.reduce((acc, expense) => {
    acc[expense.date] = (acc[expense.date] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);
};

export const filterExpenses = (
  expenses: Expense[],
  filters: { search?: string; category?: string; month?: string }
): Expense[] => {
  return expenses.filter((expense) => {
    let match = true;
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const titleMatch = expense.title.toLowerCase().includes(searchTerm);
      const notesMatch = expense.notes?.toLowerCase().includes(searchTerm) ?? false;
      match = match && (titleMatch || notesMatch);
    }
    
    if (filters.category && filters.category !== "All Categories") {
      match = match && expense.category === filters.category;
    }
    
    if (filters.month) {
      match = match && expense.date.startsWith(filters.month);
    }
    
    return match;
  });
};

export const sortExpenses = (
  expenses: Expense[],
  sortBy: "date" | "amount" | "title",
  direction: "asc" | "desc"
): Expense[] => {
  return [...expenses].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === "date") {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === "amount") {
      comparison = a.amount - b.amount;
    } else if (sortBy === "title") {
      comparison = a.title.localeCompare(b.title);
    }
    
    return direction === "asc" ? comparison : -comparison;
  });
};
