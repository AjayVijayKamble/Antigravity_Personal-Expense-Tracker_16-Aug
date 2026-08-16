import React, { useState, useEffect } from "react";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { Search } from "lucide-react";

interface FiltersProps {
  onFilterChange: (filters: { search: string; category: string; month: string }) => void;
}

const CATEGORY_OPTIONS = [
  { value: "All Categories", label: "All Categories" },
  { value: "Food", label: "Food" },
  { value: "Transport", label: "Transport" },
  { value: "Shopping", label: "Shopping" },
  { value: "Bills", label: "Bills" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Health", label: "Health" },
  { value: "Travel", label: "Travel" },
  { value: "Other", label: "Other" },
];

export const ExpenseFilters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [month, setMonth] = useState("");

  useEffect(() => {
    onFilterChange({ search, category, month });
  }, [search, category, month, onFilterChange]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <Input
          placeholder="Search expenses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="h-4 w-4" />}
        />
      </div>
      <div className="w-full sm:w-48">
        <Select
          options={CATEGORY_OPTIONS}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="w-full sm:w-48">
        <Input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>
    </div>
  );
};
