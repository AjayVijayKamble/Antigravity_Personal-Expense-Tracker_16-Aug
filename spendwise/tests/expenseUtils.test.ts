import { describe, it, expect } from "vitest";
import { calculateTotalSpending, calculateAverageExpense, groupExpensesByCategory, filterExpenses, sortExpenses } from "../src/utils/expenseUtils";
import { type Expense } from "../src/types/finance.types";

const mockExpenses: Expense[] = [
  { id: "1", title: "Groceries", amount: 100, category: "Food", date: "2026-08-10" },
  { id: "2", title: "Taxi", amount: 50, category: "Transport", date: "2026-08-12", notes: "To work" },
  { id: "3", title: "Lunch", amount: 150, category: "Food", date: "2026-08-14" },
];

describe("expenseUtils", () => {
  it("calculates total spending", () => {
    expect(calculateTotalSpending(mockExpenses)).toBe(300);
    expect(calculateTotalSpending([])).toBe(0);
  });

  it("calculates average expense", () => {
    expect(calculateAverageExpense(mockExpenses)).toBe(100);
    expect(calculateAverageExpense([])).toBe(0);
  });

  it("groups expenses by category", () => {
    const grouped = groupExpensesByCategory(mockExpenses);
    expect(grouped).toEqual({
      Food: 250,
      Transport: 50,
    });
  });

  it("filters expenses", () => {
    const filteredByCategory = filterExpenses(mockExpenses, { category: "Food" });
    expect(filteredByCategory).toHaveLength(2);

    const filteredBySearchTitle = filterExpenses(mockExpenses, { search: "groc" });
    expect(filteredBySearchTitle).toHaveLength(1);

    const filteredBySearchNotes = filterExpenses(mockExpenses, { search: "work" });
    expect(filteredBySearchNotes).toHaveLength(1);

    const filteredByMonth = filterExpenses(mockExpenses, { month: "2026-08" });
    expect(filteredByMonth).toHaveLength(3);

    const filteredByCombo = filterExpenses(mockExpenses, { search: "taxi", category: "Transport", month: "2026-08" });
    expect(filteredByCombo).toHaveLength(1);
  });

  it("sorts expenses", () => {
    const sortedByAmountDesc = sortExpenses(mockExpenses, "amount", "desc");
    expect(sortedByAmountDesc[0].amount).toBe(150);
    expect(sortedByAmountDesc[2].amount).toBe(50);

    const sortedByTitleAsc = sortExpenses(mockExpenses, "title", "asc");
    expect(sortedByTitleAsc[0].title).toBe("Groceries");
    expect(sortedByTitleAsc[2].title).toBe("Taxi");

    const sortedByDateAsc = sortExpenses(mockExpenses, "date", "asc");
    expect(sortedByDateAsc[0].date).toBe("2026-08-10");
  });
});
