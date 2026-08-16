import React from "react";
import { Link } from "react-router-dom";
import { type Expense } from "../../types/finance.types";
import { formatCurrency } from "../../utils/formatters";
import { ArrowRight, Utensils, Home, Car, Film, Heart, ShoppingBag, Plane, MoreHorizontal } from "lucide-react";

interface RecentTransactionsProps {
  transactions: Expense[];
}

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case "Travel": return <Plane className="h-3.5 w-3.5" />;
    case "Food": return <Utensils className="h-3.5 w-3.5" />;
    case "Bills": return <Home className="h-3.5 w-3.5" />;
    case "Transport": return <Car className="h-3.5 w-3.5" />;
    case "Entertainment": return <Film className="h-3.5 w-3.5" />;
    case "Health": return <Heart className="h-3.5 w-3.5" />;
    case "Shopping": return <ShoppingBag className="h-3.5 w-3.5" />;
    default: return <MoreHorizontal className="h-3.5 w-3.5" />;
  }
};

const getCategoryBadgeStyle = (category: string) => {
  switch (category) {
    case "Travel": return "bg-emerald-50 text-emerald-600 border border-emerald-100";
    case "Food": return "bg-blue-50 text-blue-600 border border-blue-100";
    case "Health": return "bg-rose-50 text-rose-600 border border-rose-100";
    case "Bills": return "bg-amber-50 text-amber-600 border border-amber-100";
    case "Entertainment": return "bg-purple-50 text-purple-600 border border-purple-100";
    case "Transport": return "bg-teal-50 text-teal-600 border border-teal-100";
    default: return "bg-gray-50 text-gray-600 border border-gray-100";
  }
};

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-bold text-gray-900 tracking-tight">Recent Transactions</h3>
        <Link 
          to="/expenses" 
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
        >
          View all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {transactions.length === 0 ? (
        <div className="text-xs font-semibold text-gray-400 py-12 text-center">
          No transactions logged for this month.
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-3">
                <th className="pb-3 font-bold">Date</th>
                <th className="pb-3 font-bold">Description</th>
                <th className="pb-3 font-bold">Category</th>
                <th className="pb-3 font-bold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((tx) => {
                const dateObj = new Date(tx.date);
                const dateFormatted = `${dateObj.getDate()} ${dateObj.toLocaleString('default', { month: 'short' })} ${dateObj.getFullYear()}`;
                
                return (
                  <tr key={tx.id} className="group hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 text-xs font-semibold text-gray-500 whitespace-nowrap">
                      {dateFormatted}
                    </td>
                    <td className="py-3.5 text-xs font-bold text-gray-900 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-gray-100/80 text-gray-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                          <CategoryIcon category={tx.category} />
                        </div>
                        <span>{tx.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-xs whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold ${getCategoryBadgeStyle(tx.category)}`}>
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-3.5 text-xs font-bold text-gray-900 text-right whitespace-nowrap">
                      {formatCurrency(tx.amount)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
