import React, { createContext, useContext, useEffect, useState } from "react";
import { type Expense, type MonthlyBudget } from "../types/finance.types";
import { useLocalStorage } from "../hooks/useLocalStorage";

import { SEED_BUDGETS, SEED_EXPENSES } from "../data/seedData";
interface FinanceContextType {
  expenses: Expense[];
  budgets: MonthlyBudget[];
  getBudget: (month: string) => MonthlyBudget | null;
  addExpense: (expense: Omit<Expense, "id">) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  setBudget: (amount: number, month: string) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [expenses, setExpenses] = useLocalStorage<Expense[]>("spendwise_expenses", []);
  const [budgets, setBudgets] = useLocalStorage<MonthlyBudget[]>("spendwise_budgets", []);

  useEffect(() => {
    if (isFirstLoad && expenses.length === 0) {
      setExpenses(SEED_EXPENSES);
      if (budgets.length === 0) {
        setBudgets(SEED_BUDGETS);
      }
    }
    setIsFirstLoad(false);
  }, [isFirstLoad, expenses, setExpenses, budgets, setBudgets]);

  const addExpense = (expenseData: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...expenseData,
      id: crypto.randomUUID(),
    };
    setExpenses([...expenses, newExpense]);
  };

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses(expenses.map(e => (e.id === updatedExpense.id ? updatedExpense : e)));
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const setBudget = (amount: number, month: string) => {
    const existingIndex = budgets.findIndex(b => b.month === month);
    if (existingIndex >= 0) {
      const newBudgets = [...budgets];
      newBudgets[existingIndex] = { month, amount };
      setBudgets(newBudgets);
    } else {
      setBudgets([...budgets, { month, amount }]);
    }
  };

  const getBudget = (month: string) => budgets.find(b => b.month === month) || null;

  return (
    <FinanceContext.Provider
      value={{
        expenses,
        budgets,
        getBudget,
        addExpense,
        updateExpense,
        deleteExpense,
        setBudget,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
};
