import React from "react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { type Expense } from "../../types/finance.types";
import { formatCurrency } from "../../utils/formatters";

interface DeleteExpenseDialogProps {
  expense: Expense | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteExpenseDialog: React.FC<DeleteExpenseDialogProps> = ({
  expense,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!expense) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Expense?">
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          Are you sure you want to delete <span className="font-semibold text-gray-900">"{expense.title}"</span> for <span className="font-semibold text-gray-900">{formatCurrency(expense.amount)}</span>?
        </p>
        <p className="text-sm text-gray-500 mt-2">
          This action cannot be undone.
        </p>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
        <Button variant="danger" onClick={onConfirm} className="w-full sm:w-auto">
          Delete
        </Button>
        <Button variant="secondary" onClick={onClose} className="w-full sm:w-auto mt-3 sm:mt-0">
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
