'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { expenseApi } from '@/services/api';
import { Expense, ExpenseFilters } from '@/types/expense';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Eye, Edit, Trash2, Search, Filter, X } from 'lucide-react';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ExpenseFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  const fetchExpenses = async () => {
    try {
      const data = await expenseApi.getAllExpenses(filters);
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpense = async (id: number) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseApi.deleteExpense(id);
        setExpenses(expenses.filter(expense => expense.id !== id));
      } catch (error) {
        console.error('Error deleting expense:', error);
        alert('Failed to delete expense');
      }
    }
  };

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, search: query || undefined }));
  };

  const handleFilterChange = (key: keyof ExpenseFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value || undefined }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  if (loading) {
    return (
      <Layout title="Expenses" showSearch showAddButton onSearch={handleSearch}>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Expenses" showSearch showAddButton onSearch={handleSearch}>
      <div className="space-y-6">
        {/* Filter Section */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Filters</h3>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <Filter className="h-4 w-4" />
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={filters.category || ''}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">All Categories</option>
                  <option value="Food">Food</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Health">Health</option>
                  <option value="Education">Education</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={filters.startDate || ''}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={filters.endDate || ''}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                >
                  <X className="h-4 w-4" />
                  <span>Clear</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Expenses Table */}
        <div className="rounded-lg bg-white shadow-sm overflow-hidden">
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
                {expenses.map((expense) => (
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
                          onClick={() => handleDeleteExpense(expense.id)}
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

          {expenses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No expenses found.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}