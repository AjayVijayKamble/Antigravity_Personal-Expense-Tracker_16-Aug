import React from "react";
import { type Expense } from "../../types/finance.types";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { Pencil, Trash2 } from "lucide-react";

interface ExpenseRowProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

const CategoryBadge: React.FC<{ category: string }> = ({ category }) => {
  const colors: Record<string, string> = {
    Food: "bg-blue-100 text-blue-800",
    Transport: "bg-green-100 text-green-800",
    Shopping: "bg-yellow-100 text-yellow-800",
    Bills: "bg-red-100 text-red-800",
    Entertainment: "bg-purple-100 text-purple-800",
    Health: "bg-pink-100 text-pink-800",
    Travel: "bg-teal-100 text-teal-800",
    Other: "bg-gray-100 text-gray-800",
  };

  const defaultColor = "bg-gray-100 text-gray-800";
  const colorClass = colors[category] || defaultColor;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {category}
    </span>
  );
};

export const ExpenseRow: React.FC<ExpenseRowProps> = ({ expense, onEdit, onDelete }) => {
  return (
    <>
      <tr className="hidden sm:table-row hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDate(expense.date)}
        </td>
        <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-[200px] truncate">
          {expense.title}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <CategoryBadge category={expense.category} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {formatCurrency(expense.amount)}
        </td>
        <td className="px-6 py-4 text-sm text-gray-500 max-w-[200px] truncate">
          {expense.notes || "-"}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex justify-end gap-2">
            <button
              onClick={() => onEdit(expense)}
              className="text-blue-600 hover:text-blue-900 p-1"
              title="Edit"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(expense)}
              className="text-red-600 hover:text-red-900 p-1"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </td>
      </tr>

      <tr className="sm:hidden block border-b border-gray-200">
        <td className="block p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm font-medium text-gray-900">{expense.title}</p>
              <p className="text-xs text-gray-500">{formatDate(expense.date)}</p>
            </div>
            <p className="text-sm font-bold text-gray-900">{formatCurrency(expense.amount)}</p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <CategoryBadge category={expense.category} />
            <div className="flex gap-3">
              <button onClick={() => onEdit(expense)} className="text-blue-600">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => onDelete(expense)} className="text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          {expense.notes && (
            <p className="text-xs text-gray-500 mt-2 truncate">{expense.notes}</p>
          )}
        </td>
      </tr>
    </>
  );
};
