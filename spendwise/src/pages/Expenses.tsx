import React, { useState, useMemo } from "react";
import { useFinance } from "../context/FinanceContext";
import { type Expense } from "../types/finance.types";
import { ExpenseTable } from "../components/expenses/ExpenseTable";
import { ExpenseForm } from "../components/expenses/ExpenseForm";
import { DeleteExpenseDialog } from "../components/expenses/DeleteExpenseDialog";
import { ExpenseFilters } from "../components/expenses/ExpenseFilters";
import { filterExpenses, sortExpenses } from "../utils/expenseUtils";
import { Modal } from "../components/common/Modal";
import { Button } from "../components/common/Button";
import { Plus } from "lucide-react";

export const Expenses: React.FC = () => {
  const { expenses, addExpense, updateExpense, deleteExpense } = useFinance();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | undefined>(undefined);
  
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
  
  const [filters, setFilters] = useState({ search: "", category: "All Categories", month: "" });
  
  const [sortBy, setSortBy] = useState<"date" | "amount" | "title">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const filteredAndSortedExpenses = useMemo(() => {
    const filtered = filterExpenses(expenses, filters);
    return sortExpenses(filtered, sortBy, sortDirection);
  }, [expenses, filters, sortBy, sortDirection]);

  const handleSort = (column: "date" | "amount" | "title") => {
    if (sortBy === column) {
      setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortDirection("desc");
    }
  };

  const handleFormSubmit = (data: Omit<Expense, "id"> | Expense) => {
    if ("id" in data) {
      updateExpense(data as Expense);
    } else {
      addExpense(data);
    }
    setIsFormOpen(false);
    setExpenseToEdit(undefined);
  };

  const handleDeleteConfirm = () => {
    if (expenseToDelete) {
      deleteExpense(expenseToDelete.id);
      setExpenseToDelete(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Manage Expenses</h2>
        <Button 
          onClick={() => {
            setExpenseToEdit(undefined);
            setIsFormOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </div>

      <ExpenseFilters onFilterChange={setFilters} />

      <ExpenseTable 
        expenses={filteredAndSortedExpenses}
        onEdit={(expense) => {
          setExpenseToEdit(expense);
          setIsFormOpen(true);
        }}
        onDelete={(expense) => setExpenseToDelete(expense)}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={handleSort}
      />

      <Modal 
        isOpen={isFormOpen} 
        onClose={() => {
          setIsFormOpen(false);
          setExpenseToEdit(undefined);
        }}
        title={expenseToEdit ? "Edit Expense" : "Add Expense"}
      >
        <ExpenseForm 
          initialData={expenseToEdit}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setExpenseToEdit(undefined);
          }}
        />
      </Modal>

      <DeleteExpenseDialog
        expense={expenseToDelete}
        isOpen={!!expenseToDelete}
        onClose={() => setExpenseToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};
