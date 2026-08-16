import React, { useState, useEffect } from "react";
import { type Expense, type ExpenseCategory } from "../../types/finance.types";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { Button } from "../common/Button";

interface ExpenseFormProps {
  initialData?: Expense;
  onSubmit: (data: Omit<Expense, "id"> | Expense) => void;
  onCancel: () => void;
}

const CATEGORY_OPTIONS = [
  { value: "Food", label: "Food" },
  { value: "Transport", label: "Transport" },
  { value: "Shopping", label: "Shopping" },
  { value: "Bills", label: "Bills" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Health", label: "Health" },
  { value: "Travel", label: "Travel" },
  { value: "Other", label: "Other" },
];

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        amount: initialData.amount.toString(),
        category: initialData.category,
        date: initialData.date,
        notes: initialData.notes || "",
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 2) {
      newErrors.title = "Title must be at least 2 characters";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    const amountNum = parseFloat(formData.amount);
    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(amountNum)) {
      newErrors.amount = "Amount must be a number";
    } else if (amountNum <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    } else if (amountNum > 1000000) {
      newErrors.amount = "Amount cannot exceed 1,000,000";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    } else {
      const d = new Date(formData.date);
      if (isNaN(d.getTime())) {
        newErrors.date = "Must be a valid date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const submissionData = {
        title: formData.title.trim(),
        amount: parseFloat(formData.amount),
        category: formData.category as ExpenseCategory,
        date: formData.date,
        notes: formData.notes.trim() || undefined,
      };

      if (initialData) {
        onSubmit({ ...submissionData, id: initialData.id });
      } else {
        onSubmit(submissionData);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title *"
        placeholder="e.g. Dinner at restaurant"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        error={errors.title}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Amount (₹) *"
          type="number"
          step="0.01"
          placeholder="e.g. 1200"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          error={errors.amount}
          icon={<span className="text-gray-500">₹</span>}
        />
        
        <Select
          label="Category *"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          error={errors.category}
          options={CATEGORY_OPTIONS}
        />
      </div>

      <Input
        label="Date *"
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        error={errors.date}
      />

      <div className="w-full">
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          Notes (Optional)
        </label>
        <textarea
          id="notes"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border py-2 px-3"
          rows={3}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="e.g. Dinner with friends"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? "Save Changes" : "Add Expense"}
        </Button>
      </div>
    </form>
  );
};
