import Link from 'next/link';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Expense } from '@/types/expense';
import { Eye, Edit, Trash2 } from 'lucide-react';

interface RecentExpensesTableProps {
  expenses: Expense[];
  onDelete?: (id: number) => void;
}

export function RecentExpensesTable({ expenses, onDelete }: RecentExpensesTableProps) {
  return (
    <div className="rounded-lg bg-white shadow-sm">
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
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {expense.title}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {expense.category}
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
                      className="text-blue-600 hover:text-blue-800"
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
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/expenses/${expense.id}/edit`}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => onDelete?.(expense.id)}
                      className="text-red-600 hover:text-red-800"
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
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View all expenses →
        </Link>
      </div>
    </div>
  );
}