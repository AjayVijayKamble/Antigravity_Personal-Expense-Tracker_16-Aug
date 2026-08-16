import React from "react";
import { type Expense } from "../../types/finance.types";
import { ExpenseRow } from "./ExpenseRow";
import { EmptyState } from "../common/EmptyState";
import { Receipt } from "lucide-react";
import { ArrowDown, ArrowUp } from "lucide-react";

interface ExpenseTableProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
  sortBy: "date" | "amount" | "title";
  sortDirection: "asc" | "desc";
  onSort: (by: "date" | "amount" | "title") => void;
  emptyStateMessage?: string;
}

export const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  onEdit,
  onDelete,
  sortBy,
  sortDirection,
  onSort,
  emptyStateMessage = "No expenses found",
}) => {
  if (expenses.length === 0) {
    return (
      <EmptyState
        title="No expenses"
        description={emptyStateMessage}
        icon={<Receipt className="h-6 w-6" />}
      />
    );
  }

  const SortIcon = ({ column }: { column: "date" | "amount" | "title" }) => {
    if (sortBy !== column) return null;
    return sortDirection === "asc" ? <ArrowUp className="h-3 w-3 inline ml-1" /> : <ArrowDown className="h-3 w-3 inline ml-1" />;
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 block sm:table">
        <thead className="bg-gray-50 hidden sm:table-header-group">
          <tr>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort("date")}
            >
              Date <SortIcon column="date" />
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort("title")}
            >
              Title <SortIcon column="title" />
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort("amount")}
            >
              Amount <SortIcon column="amount" />
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Notes
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 block sm:table-row-group">
          {expenses.map((expense) => (
            <ExpenseRow
              key={expense.id}
              expense={expense}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
