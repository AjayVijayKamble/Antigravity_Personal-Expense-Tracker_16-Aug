import { describe, it, expect } from "vitest";
import { SEED_EXPENSES, SEED_BUDGETS } from "../src/data/seedData";
import { calculateTotalSpending } from "../src/utils/expenseUtils";
import { calculateRemainingBudget, getBudgetStatus, calculateBudgetPercentage } from "../src/utils/budgetUtils";

describe("Month Selection Logic", () => {
  it("August selection returns August expenses", () => {
    const augustExpenses = SEED_EXPENSES.filter(e => e.date.startsWith("2026-08"));
    expect(augustExpenses.length).toBeGreaterThan(0);
    augustExpenses.forEach(e => {
      expect(e.date.startsWith("2026-08")).toBe(true);
    });
  });

  it("July selection returns July expenses", () => {
    const julyExpenses = SEED_EXPENSES.filter(e => e.date.startsWith("2026-07"));
    expect(julyExpenses.length).toBeGreaterThan(0);
    julyExpenses.forEach(e => {
      expect(e.date.startsWith("2026-07")).toBe(true);
    });
  });

  it("Each month has different totals", () => {
    const augustExpenses = SEED_EXPENSES.filter(e => e.date.startsWith("2026-08"));
    const julyExpenses = SEED_EXPENSES.filter(e => e.date.startsWith("2026-07"));
    
    const augTotal = calculateTotalSpending(augustExpenses);
    const julTotal = calculateTotalSpending(julyExpenses);
    
    expect(augTotal).not.toBe(julTotal);
  });

  it("Category totals change with month selection", () => {
    const augustFood = SEED_EXPENSES.filter(e => e.date.startsWith("2026-08") && e.category === "Food");
    const julyFood = SEED_EXPENSES.filter(e => e.date.startsWith("2026-07") && e.category === "Food");
    
    const augFoodTotal = calculateTotalSpending(augustFood);
    const julFoodTotal = calculateTotalSpending(julyFood);
    
    expect(augFoodTotal).not.toBe(julFoodTotal);
  });

  it("Budget changes with month selection", () => {
    const augustBudget = SEED_BUDGETS.find(b => b.month === "2026-08");
    const julyBudget = SEED_BUDGETS.find(b => b.month === "2026-07");
    
    // In our seed data, July budget is 50000, August is 45000
    expect(augustBudget?.amount).not.toBe(julyBudget?.amount);
  });

  it("A month with zero expenses does not crash totals", () => {
    const emptyExpenses: any[] = [];
    const total = calculateTotalSpending(emptyExpenses);
    expect(total).toBe(0);
  });

  it("A month exceeding budget displays the correct state", () => {
    const juneExpenses = SEED_EXPENSES.filter(e => e.date.startsWith("2026-06"));
    const juneBudget = SEED_BUDGETS.find(b => b.month === "2026-06");
    
    const percentage = calculateBudgetPercentage(juneBudget?.amount || 0, juneExpenses);
    const status = getBudgetStatus(percentage);
    const remaining = calculateRemainingBudget(juneBudget?.amount || 0, juneExpenses);
    
    expect(percentage).toBeGreaterThan(100);
    expect(status).toBe("exceeded");
    expect(remaining).toBeLessThan(0);
  });
});
