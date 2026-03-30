'use client';

import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { SummaryCards } from '@/components/SummaryCards';
import { CategoryChart } from '@/components/SpendingCharts';
import { expenseApi } from '@/services/api';
import { Expense, ExpenseSummary } from '@/types/expense';
import { formatCurrency, getCurrentMonthExpenses, getCategoryStats } from '@/utils/formatters';

export default function SummaryPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<ExpenseSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expensesData, summaryData] = await Promise.all([
          expenseApi.getAllExpenses(),
          expenseApi.getExpenseSummary(),
        ]);
        setExpenses(expensesData);
        setSummary(summaryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout title="Summary">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  const currentMonthExpenses = getCurrentMonthExpenses(expenses);
  const categoryStats = getCategoryStats(expenses);
  const thisMonthAmount = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const receiptsCount = expenses.filter(expense => expense.receipt_url).length;

  const highestExpense = Math.max(...expenses.map(e => e.amount), 0);
  const lowestExpense = Math.min(...expenses.map(e => e.amount), 0);
  const averageExpense = expenses.reduce((sum, e) => sum + e.amount, 0) / expenses.length || 0;

  return (
    <Layout title="Summary">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(summary?.totalAmount || 0)}
                </p>
              </div>
              <div className="rounded-full bg-blue-50 p-3">
                <span className="text-lg">💰</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-900">
                  {summary?.totalCount || 0}
                </p>
              </div>
              <div className="rounded-full bg-green-50 p-3">
                <span className="text-lg">📊</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Expense</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(averageExpense)}
                </p>
              </div>
              <div className="rounded-full bg-purple-50 p-3">
                <span className="text-lg">📈</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(thisMonthAmount)}
                </p>
              </div>
              <div className="rounded-full bg-orange-50 p-3">
                <span className="text-lg">📅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CategoryChart data={categoryStats} />

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-gray-900">Expense Insights</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Highest Expense:</span>
                <span className="font-medium">{formatCurrency(highestExpense)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lowest Expense:</span>
                <span className="font-medium">{formatCurrency(lowestExpense)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expenses with Receipts:</span>
                <span className="font-medium">{receiptsCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expenses without Receipts:</span>
                <span className="font-medium">{(summary?.totalCount || 0) - receiptsCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Most Used Category:</span>
                <span className="font-medium">
                  {categoryStats.length > 0 ? categoryStats[0].category : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown Table */}
        <div className="rounded-lg bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-medium text-gray-900">Category Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Number of Expenses
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {categoryStats.map((category) => {
                  const percentage = summary?.totalAmount
                    ? ((category.total / summary.totalAmount) * 100).toFixed(1)
                    : '0';
                  const expenseCount = expenses.filter(e => e.category === category.category).length;

                  return (
                    <tr key={category.category} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {category.category}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {expenseCount}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        {formatCurrency(category.total)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {percentage}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}