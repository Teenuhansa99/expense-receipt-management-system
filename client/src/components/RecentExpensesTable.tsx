import Link from 'next/link';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Expense } from '@/types/expense';
import { Eye, Edit, Trash2 } from 'lucide-react';

interface RecentExpensesTableProps {
  expenses: Expense[];
  onDelete?: (id: number) => void;
}

export function RecentExpensesTable({ expenses, onDelete }: RecentExpensesTableProps) {
  const getCategoryBadge = (category: string) => {
    const categoryStyles = {
      'Office': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'Food': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Travel': 'bg-amber-100 text-amber-800 border-amber-200',
      'Utilities': 'bg-violet-100 text-violet-800 border-violet-200',
      'Software': 'bg-blue-100 text-blue-800 border-blue-200',
      'Marketing': 'bg-pink-100 text-pink-800 border-pink-200',
      'Health': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'Education': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Other': 'bg-gray-100 text-gray-800 border-gray-200',
    };

    return categoryStyles[category as keyof typeof categoryStyles] || categoryStyles.Other;
  };

  return (
    <div className="rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-medium text-gray-900">Recent Expenses</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Receipt
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {expenses.slice(0, 5).map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {expense.title}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryBadge(expense.category)}`}>
                    {expense.category}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {formatDate(expense.expense_date)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {formatCurrency(expense.amount)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {expense.receipt_url ? (
                    <a
                      href={expense.receipt_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-600 hover:text-cyan-800 font-medium transition-colors duration-200"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-gray-400">No receipt</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <Link
                      href={`/expenses/${expense.id}`}
                      className="text-cyan-600 hover:text-cyan-800 transition-colors duration-200 hover:scale-110 transform"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/expenses/${expense.id}/edit`}
                      className="text-violet-600 hover:text-violet-800 transition-colors duration-200 hover:scale-110 transform"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => onDelete?.(expense.id)}
                      className="text-pink-600 hover:text-pink-800 transition-colors duration-200 hover:scale-110 transform"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-gray-200 px-6 py-4">
        <Link
          href="/expenses"
          className="text-cyan-600 hover:text-cyan-800 text-sm font-medium transition-colors duration-200"
        >
          View all expenses →
        </Link>
      </div>
    </div>
  );
}