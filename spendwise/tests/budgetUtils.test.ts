import { describe, it, expect } from "vitest";
import { calculateRemainingBudget, calculateBudgetPercentage, getBudgetStatus } from "../src/utils/budgetUtils";
import { type Expense } from "../src/types/finance.types";

const mockExpenses: Expense[] = [
  { id: "1", title: "Item 1", amount: 500, category: "Other", date: "2026-08-10" },
  { id: "2", title: "Item 2", amount: 200, category: "Other", date: "2026-08-12" },
];

describe("budgetUtils", () => {
  it("calculates remaining budget", () => {
    expect(calculateRemainingBudget(1000, mockExpenses)).toBe(300);
    expect(calculateRemainingBudget(500, mockExpenses)).toBe(-200); // Exceeded
  });

  it("calculates budget percentage", () => {
    expect(calculateBudgetPercentage(1000, mockExpenses)).toBe(70);
    expect(calculateBudgetPercentage(700, mockExpenses)).toBe(100);
    expect(calculateBudgetPercentage(500, mockExpenses)).toBe(140);
    expect(calculateBudgetPercentage(0, mockExpenses)).toBe(0);
  });

  it("gets budget status", () => {
    expect(getBudgetStatus(50)).toBe("healthy");
    expect(getBudgetStatus(69.9)).toBe("healthy");
    expect(getBudgetStatus(70)).toBe("warning");
    expect(getBudgetStatus(100)).toBe("warning");
    expect(getBudgetStatus(101)).toBe("exceeded");
    expect(getBudgetStatus(200)).toBe("exceeded");
  });
});
